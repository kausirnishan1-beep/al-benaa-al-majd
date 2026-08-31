import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { mainNav } from '../../data/navigation.js'

export default function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
    >
      <nav className="flex flex-col p-4 divide-y divide-gray-100">
        {mainNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `py-3 px-2 flex items-center justify-between transition-colors ${
                isActive ? 'text-benaa font-bold bg-benaa/5 rounded-lg' : 'text-gray-700 hover:text-benaa'
              }`
            }
          >
            <div>
              <span className="block font-bold text-base">{item.label}</span>
              <span className="block text-xs text-gray-500 font-arabic">{item.labelAr}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </NavLink>
        ))}

        <NavLink
          to="/admin"
          onClick={onClose}
          className="py-3 px-2 flex items-center justify-between text-benaa font-bold hover:bg-benaa/5 rounded-lg transition-colors"
        >
          <div>
            <span className="block font-bold text-base">Admin Portal</span>
            <span className="block text-xs text-gray-500 font-arabic">لوحة التحكم والإدارة</span>
          </div>
          <ChevronRight className="w-5 h-5 text-benaa" />
        </NavLink>
      </nav>
    </motion.div>
  )
}

