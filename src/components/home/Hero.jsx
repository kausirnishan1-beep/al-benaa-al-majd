import { motion } from 'framer-motion'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-benaa to-benaa-dark text-white overflow-hidden">
      <Container className="py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="text-majd-light font-semibold">مجموعة البناء والمجد</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            نبني المستقبل، ونربط الأسواق
          </h1>
          <p className="mt-6 text-white/80 text-lg">
            شركتان متخصصتان تحت مظلة واحدة: الإنشاءات والمقاولات، والتجارة والاستيراد والتصدير.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/benaa" variant="primary" className="bg-white text-benaa hover:bg-white/90">شركة البناء</Button>
            <Button to="/majd" variant="secondary">شركة المجد</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
