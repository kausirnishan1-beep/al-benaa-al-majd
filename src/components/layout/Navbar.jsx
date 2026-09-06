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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur'}`}>
      <Container className="flex items-center justify-between h-16 sm:h-20">
        <NavLink to="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 mr-2 xl:mr-6 group">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-benaa text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-majd-light" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-benaa text-xs sm:text-sm md:text-base xl:text-lg block leading-tight tracking-tight uppercase whitespace-nowrap">
              AL BENAA & AL MAJD
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-majd block font-arabic leading-tight whitespace-nowrap mt-0.5">
              مؤسسة البناء الرحاب وخطوط المجد
            </span>
          </div>
        </NavLink>

        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-center transition-all px-3 py-1.5 rounded-xl group ${
                  isActive
                    ? 'text-benaa font-bold bg-benaa/10 shadow-xs'
                    : 'text-gray-600 hover:text-benaa hover:bg-gray-50'
                }`
              }
            >
              <span className="block text-xs 2xl:text-sm font-bold leading-tight">{item.label}</span>
              <span className="block text-[10px] 2xl:text-[11px] text-gray-400 group-hover:text-majd font-arabic leading-tight mt-0.5">{item.labelAr}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 xl:gap-3 flex-shrink-0">
          <NavLink
            to="/admin"
            className="border border-gray-200 hover:border-benaa/40 text-gray-700 hover:text-benaa text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 hover:bg-benaa/5"
            title="Admin Portal / لوحة الإدارة"
          >
            <span className="block leading-tight">Admin</span>
            <span className="block text-[10px] text-gray-400 font-arabic">(الإدارة)</span>
          </NavLink>

          <NavLink
            to="/contact"
            className="bg-benaa text-white text-xs font-bold px-3.5 xl:px-4 py-2 xl:py-2.5 rounded-xl hover:bg-benaa-light transition-all flex items-center gap-2 shadow-sm flex-shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-majd-light" />
            <div className="text-left">
              <span className="block leading-tight">Get in Touch</span>
              <span className="block text-[10px] text-white/80 font-arabic leading-tight">تواصل معنا</span>
            </div>
          </NavLink>
        </div>

        <button
          className="xl:hidden p-2.5 text-benaa hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 ml-2"
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


