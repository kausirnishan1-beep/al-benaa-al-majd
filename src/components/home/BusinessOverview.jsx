import Container from '../common/Container.jsx'
import { motion } from 'framer-motion'

const stats = [
  { value: '+15', label: 'سنة خبرة' },
  { value: '+120', label: 'مشروع منجز' },
  { value: '+40', label: 'شريك تجاري' },
  { value: '+10', label: 'دولة تصدير' },
]

export default function BusinessOverview() {
  return (
    <section className="bg-benaa text-white">
      <Container className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="text-4xl font-bold text-majd-light">{s.value}</div>
            <div className="text-white/70 mt-2">{s.label}</div>
          </motion.div>
        ))}
      </Container>
    </section>
  )
}
