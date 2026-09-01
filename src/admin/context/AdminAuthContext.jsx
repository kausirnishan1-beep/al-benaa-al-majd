import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Restore cached admin user if available
    const savedUser = localStorage.getItem('albenaa_admin_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Error parsing admin user:', e)
      }
    }

    // 2. Check active Supabase session
    const checkSupabaseAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
            role: 'Super Admin',
          }
          setUser(u)
          localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
        } else if (!savedUser) {
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

    // 3. Listen to Supabase Auth state changes (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
          role: 'Super Admin',
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
        const u = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Admin',
          role: 'Super Admin',
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
