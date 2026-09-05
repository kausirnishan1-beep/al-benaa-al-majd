import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, PhoneCall, ShieldCheck } from 'lucide-react'
import { mainNav } from '../../data/navigation.js'

export default function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="lg:hidden bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
    >
      <nav className="flex flex-col p-4 divide-y divide-gray-100">
        {mainNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `min-h-[48px] py-3 px-3 flex items-center justify-between transition-colors ${
                isActive ? 'text-benaa font-bold bg-benaa/5 rounded-xl' : 'text-gray-700 hover:text-benaa'
              }`
            }
          >
            <div>
              <span className="block font-bold text-sm sm:text-base leading-tight">{item.label}</span>
              <span className="block text-[11px] sm:text-xs text-gray-500 font-arabic leading-tight">{item.labelAr}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </NavLink>
        ))}

        <div className="pt-3 flex flex-col gap-2">
          <NavLink
            to="/contact"
            onClick={onClose}
            className="min-h-[48px] py-3 px-4 rounded-xl bg-benaa text-white font-bold text-sm flex items-center justify-between shadow-md active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-majd-light" />
              <div>
                <span className="block leading-tight">Get in Touch / Request Quote</span>
                <span className="block text-[10px] text-white/80 font-arabic leading-tight">تواصل معنا واطلب عرض سعر</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/70" />
          </NavLink>

          <NavLink
            to="/admin"
            onClick={onClose}
            className="min-h-[44px] py-2.5 px-3 flex items-center justify-between text-benaa font-bold text-xs hover:bg-benaa/5 rounded-xl transition-colors border border-benaa/15"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-benaa" />
              <div>
                <span className="block leading-tight">Admin Portal</span>
                <span className="block text-[10px] text-gray-500 font-arabic leading-tight">لوحة التحكم والإدارة</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-benaa" />
          </NavLink>
        </div>
      </nav>
    </motion.div>
  )
}

