import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mainNav } from '../../data/navigation.js'

export default function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-white border-t overflow-hidden"
    >
      <nav className="flex flex-col p-4 gap-4">
        {mainNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="font-medium text-gray-700 hover:text-benaa"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </motion.div>
  )
}
