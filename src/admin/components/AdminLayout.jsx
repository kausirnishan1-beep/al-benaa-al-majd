import { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import Sidebar from './Sidebar.jsx'
import AdminNavbar from './AdminNavbar.jsx'

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-benaa border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-gray-500">Loading Admin Portal...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <AdminNavbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="p-6 md:p-8 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
