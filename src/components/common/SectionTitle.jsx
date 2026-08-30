import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center mb-12' : 'mb-12'}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-majd">{eyebrow}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-benaa mt-2">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}
