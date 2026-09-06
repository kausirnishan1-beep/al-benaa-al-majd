import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, Building2, PhoneCall } from 'lucide-react'
import { mainNav } from '../../data/navigation.js'
import Container from '../common/Container.jsx'
import { useScroll } from '../../hooks/useScroll.js'
import { useSettings } from '../../admin/hooks/useSettings.js'
import MobileMenu from './MobileMenu.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScroll()
  const { settings } = useSettings()
  const general = settings?.general || {}

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur'}`}>
      <Container className="flex items-center justify-between h-16 sm:h-20">
        <NavLink to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-benaa text-white flex items-center justify-center shadow-md flex-shrink-0">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-majd-light" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-benaa text-xs sm:text-base md:text-lg block leading-tight tracking-tight uppercase truncate">
              {general.siteNameEn || 'AL BENAA & AL MAJD'}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-majd block font-arabic leading-tight truncate">
              {general.siteNameAr || 'مؤسسة البناء الرحاب وخطوط المجد'}
            </span>
          </div>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-7">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-center transition-colors py-1 ${
                  isActive ? 'text-benaa font-bold border-b-2 border-benaa' : 'text-gray-600 hover:text-benaa'
                }`
              }
            >
              <span className="block text-sm font-bold leading-tight">{item.label}</span>
              <span className="block text-[11px] text-gray-500 font-arabic leading-tight">{item.labelAr}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2.5">
          <NavLink
            to="/admin"
            className="border border-benaa/30 text-benaa hover:bg-benaa hover:text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5"
            title="Admin Portal / لوحة الإدارة"
          >
            <span className="block leading-tight">Admin</span>
            <span className="block text-[10px] opacity-75 font-arabic">(الإدارة)</span>
          </NavLink>

          <NavLink
            to="/contact"
            className="bg-benaa text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-benaa-light transition-colors flex items-center gap-2 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-majd-light" />
            <div className="text-left">
              <span className="block leading-tight">Get in Touch</span>
              <span className="block text-[10px] opacity-80 font-arabic leading-tight">تواصل معنا</span>
            </div>
          </NavLink>
        </div>

        <button
          className="lg:hidden p-2.5 text-benaa hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}


