import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check local session storage first
    const savedUser = localStorage.getItem('albenaa_admin_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Error parsing admin user:', e)
      }
    }

    // 2. Check Supabase auth session if available
    const checkSupabaseAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || 'Admin User',
            role: 'Super Admin',
          }
          setUser(u)
          localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
        }
      } catch (err) {
        console.warn('Supabase auth session check skipped:', err)
      } finally {
        setLoading(false)
      }
    }

    checkSupabaseAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || 'Admin User',
          role: 'Super Admin',
        }
        setUser(u)
        localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    // 1. Attempt Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data?.user) {
        const u = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || 'Admin User',
          role: 'Super Admin',
        }
        setUser(u)
        localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
        return { success: true, user: u }
      }
    } catch (err) {
      console.warn('Supabase signIn error, checking fallback admin:', err)
    }

    // 2. Fallback default administrative credentials for rapid setup
    const validEmails = ['admin@albenaa-almajd.com', 'admin@benaa.sa', 'admin@majd.sa', 'admin@gmail.com', 'admin@albenaa.com']
    if (validEmails.includes(email.toLowerCase()) && (password === 'admin123' || password === 'admin123456' || password === 'admin')) {
      const u = {
        id: 'master-admin-id',
        email: email.toLowerCase(),
        name: 'Master Admin',
        role: 'Super Admin',
      }
      setUser(u)
      localStorage.setItem('albenaa_admin_user', JSON.stringify(u))
      return { success: true, user: u }
    }

    return { success: false, error: 'Invalid email or password / البريد الإلكتروني أو كلمة المرور غير صحيحة' }
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
