import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import WhatsAppButton from './components/common/WhatsAppButton.jsx'
import AppRoutes from './routes.jsx'
import { AdminAuthProvider } from './admin/context/AdminAuthContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', isAdminRoute ? 'noindex, nofollow, noarchive' : 'index, follow')
  }, [isAdminRoute])

  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-benaa focus:shadow-xl"
          >
            Skip to main content
          </a>
          <ScrollToTop />
          {!isAdminRoute && <Navbar />}
          <main id="main-content" className="flex-grow">
            <AppRoutes />
          </main>
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <WhatsAppButton />}
        </div>
      </AdminAuthProvider>
    </LanguageProvider>
  )
}

export default App

