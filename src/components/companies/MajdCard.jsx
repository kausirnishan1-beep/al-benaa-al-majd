import { motion } from 'framer-motion'
import Button from '../common/Button.jsx'

export default function MajdCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden shadow-lg border-t-4 border-majd"
    >
      <div className="p-8 bg-white">
        <h3 className="text-2xl font-bold text-majd">{data.name}</h3>
        <p className="text-gray-500 mt-2">{data.tagline}</p>
        <div className="mt-6">
          <Button to={data.path} variant="secondary">اكتشف المزيد</Button>
        </div>
      </div>
    </motion.div>
  )
}
