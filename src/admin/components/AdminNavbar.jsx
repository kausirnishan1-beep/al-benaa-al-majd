import { Menu, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import { useMessages } from '../hooks/useMessages.js'

export default function AdminNavbar({ onToggleSidebar }) {
  const { user } = useAdminAuth()
  const { messages } = useMessages()

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-sm font-black text-benaa tracking-tight">
            Group Administration System
          </h1>
          <p className="text-[10px] text-gray-500 font-arabic">
            نظام إدارة المحتوى وقواعد البيانات - البناء والمجد
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/admin/messages"
          className="relative p-2.5 rounded-xl text-gray-500 hover:text-benaa hover:bg-gray-100 transition-colors"
          title="Inquiries"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
          )}
        </Link>

        <div className="h-6 w-[1px] bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800 leading-tight">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold">
              Online • Super Admin
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-benaa text-white font-bold text-xs flex items-center justify-center shadow-md">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}
