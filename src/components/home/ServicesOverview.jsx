import { motion } from 'framer-motion'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import { benaaServices, majdServices } from '../../data/services.js'
import { Link } from 'react-router-dom'

const services = [...benaaServices, ...majdServices]

export default function ServicesOverview() {
  return (
    <section className="section-container bg-gray-50">
      <Container>
        <SectionTitle eyebrow="خدماتنا" title="نطاق أعمالنا" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={s.path} className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow h-full">
                <h3 className="font-bold text-benaa mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
