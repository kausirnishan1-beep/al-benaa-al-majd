import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, Home } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function Login() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const res = await login(email, password)
    setIsLoading(false)

    if (res.success) {
      navigate(from, { replace: true })
    } else {
      setError(res.error || 'Invalid administrator email or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06241b] via-[#093528] to-[#041913] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-majd/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-benaa text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-benaa/30">
              <ShieldCheck className="w-9 h-9 text-majd-light" />
            </div>
            <h1 className="text-2xl font-black text-benaa tracking-tight">
              Admin Portal
            </h1>
            <p className="text-sm font-bold text-majd font-arabic mt-0.5">
              بوابة الإدارة والتحكم المركزية
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Sign in with your Supabase credentials to manage the platform
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Email / البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yourdomain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password / كلمة المرور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-benaa text-white font-bold text-xs shadow-lg hover:bg-benaa-light hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard (دخول)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Back to Public Website Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-benaa transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Homepage / العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
