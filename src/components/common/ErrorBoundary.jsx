import React from 'react'
import { AlertCircle, RefreshCw, Home as HomeIcon } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Something went wrong
            </h2>
            <p className="text-sm font-arabic font-semibold text-gray-600 mt-1">
              حدث خطأ غير متوقع أثناء التحميل
            </p>
            
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              We encountered an unexpected issue. Please reload the page to continue.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-benaa text-white text-xs font-bold shadow hover:bg-benaa-light transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page (إعادة التحميل)</span>
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Home</span>
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
