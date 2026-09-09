import React from 'react'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Building2,
  Hammer,
  Wrench,
  ClipboardCheck,
  Globe2,
  TrendingUp,
  Search,
  Truck,
  Layers,
} from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import { usePublicServices } from '../../hooks/usePublicServices.js'
import { Link } from 'react-router-dom'

const ICON_MAP = {
  Building2,
  Hammer,
  Wrench,
  ClipboardCheck,
  Globe2,
  TrendingUp,
  Search,
  Truck,
}

export default function ServicesOverview() {
  const { services } = usePublicServices()

  if (!services || services.length === 0) return null

  return (
    <section className="section-container bg-gray-50/80 py-20">
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
          {services.map((s, i) => {
            const IconComponent = ICON_MAP[s.icon] || Layers
            const isBenaa = s.companyId === 'benaa'

            return (
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
                  className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between border border-gray-100/80 hover:border-gray-200 group"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                        isBenaa
                          ? 'bg-benaa/10 text-benaa group-hover:bg-benaa group-hover:text-white'
                          : 'bg-majd/10 text-majd group-hover:bg-majd group-hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3
                      className={`font-extrabold text-lg transition-colors ${
                        isBenaa
                          ? 'text-gray-900 group-hover:text-benaa'
                          : 'text-gray-900 group-hover:text-majd'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="font-bold text-xs text-gray-600 font-arabic mt-0.5">
                      {s.titleAr}
                    </p>
                    <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                      {s.description}
                    </p>
                    <p className="text-[11px] text-gray-500 font-arabic mt-1.5 leading-relaxed">
                      {s.descriptionAr}
                    </p>
                  </div>

                  <div
                    className={`mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold transition-colors ${
                      isBenaa
                        ? 'text-benaa group-hover:text-benaa-light'
                        : 'text-majd group-hover:text-majd-light'
                    }`}
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
