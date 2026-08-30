import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, Building2 } from 'lucide-react'
import { mainNav } from '../../data/navigation.js'
import Container from '../common/Container.jsx'
import { useScroll } from '../../hooks/useScroll.js'
import MobileMenu from './MobileMenu.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScroll()

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur'}`}>
      <Container className="flex items-center justify-between h-20">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-benaa text-white flex items-center justify-center shadow-sm">
            <Building2 className="w-6 h-6 text-majd-light" />
          </div>
          <div>
            <span className="font-bold text-benaa text-lg block leading-tight">مجموعة البناء والمجد</span>
            <span className="text-xs text-gray-500 block">Al-Benaa & Al-Majd Group</span>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive ? 'text-benaa font-bold border-b-2 border-benaa pb-1' : 'text-gray-600 hover:text-benaa'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-benaa hover:bg-gray-100 rounded-lg transition-colors"
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

