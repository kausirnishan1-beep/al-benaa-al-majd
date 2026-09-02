import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import WhatsAppButton from './components/common/WhatsAppButton.jsx'
import AppRoutes from './routes.jsx'
import { AdminAuthProvider } from './admin/context/AdminAuthContext.jsx'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <ScrollToTop />
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          <AppRoutes />
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
      </div>
    </AdminAuthProvider>
  )
}

export default App

