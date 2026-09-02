import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import { usePublicServices } from '../../hooks/usePublicServices.js'
import { Link } from 'react-router-dom'

export default function ServicesOverview() {
  const { services } = usePublicServices()

  if (!services || services.length === 0) return null

  return (
    <section className="section-container bg-gray-50 py-20">
      <Container>
        <SectionTitle
          eyebrow="Integrated Capabilities"
          eyebrowAr="خدماتنا وقدراتنا المتكاملة"
          title="Comprehensive Scope of Services"
          titleAr="نطاق أعمالنا وخدماتنا المتخصصة"
          subtitle="Delivering end-to-end excellence from civil construction to global trade logistics."
          subtitleAr="نقدم حلولاً متكاملة تشمل الإنشاءات المدنية والتجارة وسلاسل الإمداد العالمية."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="h-full"
            >
              <Link
                to={s.path}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 group"
              >
                <div>
                  <h3 className="font-extrabold text-benaa text-lg group-hover:text-majd transition-colors">
                    {s.title}
                  </h3>
                  <p className="font-bold text-sm text-gray-700 font-arabic mt-0.5">
                    {s.titleAr}
                  </p>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {s.description}
                  </p>
                  <p className="text-[11px] text-gray-500 font-arabic mt-1.5 leading-relaxed">
                    {s.descriptionAr}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-benaa group-hover:text-majd transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

