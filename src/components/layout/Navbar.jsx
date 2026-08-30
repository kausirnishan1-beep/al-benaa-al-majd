import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, Building2, PhoneCall } from 'lucide-react'
import { mainNav } from '../../data/navigation.js'
import Container from '../common/Container.jsx'
import { useScroll } from '../../hooks/useScroll.js'
import MobileMenu from './MobileMenu.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScroll()

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur'}`}>
      <Container className="flex items-center justify-between h-20">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-benaa text-white flex items-center justify-center shadow-md">
            <Building2 className="w-6 h-6 text-majd-light" />
          </div>
          <div>
            <span className="font-extrabold text-benaa text-lg block leading-tight tracking-tight">
              Al-Benaa & Al-Majd
            </span>
            <span className="text-xs font-semibold text-majd block font-arabic leading-tight">
              مجموعة البناء والمجد
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

        <div className="hidden sm:flex items-center gap-3">
          <NavLink
            to="/contact"
            className="bg-benaa text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-benaa-light transition-colors flex items-center gap-2 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-majd-light" />
            <div className="text-left">
              <span className="block leading-tight">Get in Touch</span>
              <span className="block text-[10px] opacity-80 font-arabic leading-tight">تواصل معنا</span>
            </div>
          </NavLink>
        </div>

        <button
          className="lg:hidden p-2 text-benaa hover:bg-gray-100 rounded-lg transition-colors"
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


