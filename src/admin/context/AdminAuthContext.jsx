import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active Supabase session & verify against public.admins
    const checkSupabaseAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          // Verify with public.admins
          const { data: adminRecord, error: adminErr } = await supabase
            .from('admins')
            .select('id, full_name, role, is_active')
            .eq('id', session.user.id)
            .single()

          if (!adminErr && adminRecord && adminRecord.is_active !== false) {
            const u = {
              id: session.user.id,
              email: session.user.email,
              name: adminRecord.full_name || session.user.user_metadata?.full_name || 'Admin',
              role: adminRecord.role || 'admin',
            }
            setUser(u)
            localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
          } else {
            // Fallback for primary auth user if admins table has not finished populating
            const u = {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
              role: 'admin',
            }
            setUser(u)
            localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
          }
        } else {
          setUser(null)
          localStorage.removeItem('albenaa_admin_user')
        }
      } catch (err) {
        console.warn('Supabase auth session check:', err)
      } finally {
        setLoading(false)
      }
    }

    checkSupabaseAuth()

    // Listen to Supabase Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: adminRecord } = await supabase
          .from('admins')
          .select('id, full_name, role, is_active')
          .eq('id', session.user.id)
          .single()

        const u = {
          id: session.user.id,
          email: session.user.email,
          name: adminRecord?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
          role: adminRecord?.role || 'admin',
        }
        setUser(u)
        localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
      } else {
        setUser(null)
        localStorage.removeItem('albenaa_admin_user')
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) {
        return {
          success: false,
          error: error.message || 'Invalid login credentials / بيانات الدخول غير صحيحة',
        }
      }

      if (data?.user) {
        // Query public.admins table
        const { data: adminRecord, error: adminErr } = await supabase
          .from('admins')
          .select('id, full_name, role, is_active')
          .eq('id', data.user.id)
          .single()

        if (adminRecord && adminRecord.is_active === false) {
          await supabase.auth.signOut()
          return {
            success: false,
            error: 'Account has been deactivated. Please contact support. / هذا الحساب معطل حالياً',
          }
        }

        const u = {
          id: data.user.id,
          email: data.user.email,
          name: adminRecord?.full_name || data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Admin',
          role: adminRecord?.role || 'admin',
        }
        setUser(u)
        localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
        return { success: true, user: u }
      }

      return {
        success: false,
        error: 'Authentication failed / فشل تسجيل الدخول',
      }
    } catch (err) {
      console.error('Supabase signIn error:', err)
      return {
        success: false,
        error: err.message || 'Connection error / خطأ في الاتصال بقاعدة البيانات',
      }
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.warn('SignOut error:', e)
    }
    localStorage.removeItem('albenaa_admin_user')
    setUser(null)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
