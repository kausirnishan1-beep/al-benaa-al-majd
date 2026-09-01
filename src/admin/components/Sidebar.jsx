import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Layers,
  ShoppingBag,
  Mail,
  FileText,
  Settings,
  Globe,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import { useMessages } from '../hooks/useMessages.js'

const navItems = [
  {
    to: '/admin',
    end: true,
    label: 'Dashboard',
    labelAr: 'لوحة التحكم',
    icon: LayoutDashboard,
  },
  {
    to: '/admin/companies',
    label: 'Companies',
    labelAr: 'بيانات الشركتين',
    icon: Building2,
  },
  {
    to: '/admin/services',
    label: 'Services',
    labelAr: 'الخدمات والأنشطة',
    icon: Briefcase,
  },
  {
    to: '/admin/projects',
    label: 'Projects',
    labelAr: 'إدارة المشاريع',
    icon: Layers,
  },
  {
    to: '/admin/products',
    label: 'Products',
    labelAr: 'المنتجات والتوريد',
    icon: ShoppingBag,
  },
  {
    to: '/admin/messages',
    label: 'Messages',
    labelAr: 'رسائل التواصل',
    icon: Mail,
    hasBadge: true,
  },
  {
    to: '/admin/documents',
    label: 'Documents',
    labelAr: 'المستندات والشهادات',
    icon: FileText,
  },
  {
    to: '/admin/settings',
    label: 'Site Settings',
    labelAr: 'إعدادات الموقع',
    icon: Settings,
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const { logout, user } = useAdminAuth()
  const { messages } = useMessages()
  const navigate = useNavigate()

  const unreadCount = messages.filter((m) => !m.is_read).length

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#06241b] text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-white/10 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-10 h-10 rounded-2xl bg-majd flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-xs tracking-tight text-white leading-tight">
                AL BENAA & AL MAJD
              </h2>
              <p className="text-[9px] font-bold text-majd-light font-arabic">
                البناء الرحاب وخطوط المجد
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 my-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-benaa-light text-white font-bold text-xs flex items-center justify-center uppercase shadow-inner">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="min-w-0 flex-grow">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] text-white/60 truncate">{user?.email || 'admin@albenaa-almajd.com'}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-majd text-white shadow-lg font-extrabold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <span>{item.label}</span>
                    <span className="block text-[10px] font-arabic opacity-75 font-normal">
                      {item.labelAr}
                    </span>
                  </div>
                </div>

                {item.hasBadge && unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-majd-light hover:text-white hover:bg-white/5 transition-colors border border-majd/20"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4" />
              <span>View Public Website</span>
            </div>
            <span className="text-[10px] font-arabic opacity-80">(الموقع)</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4" />
              <span>Logout / خروج</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}
