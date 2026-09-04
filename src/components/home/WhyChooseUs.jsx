import { motion } from 'framer-motion'
import { Award, ShieldCheck, Globe, Users } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'

const points = [
  {
    icon: Award,
    title: 'Proven Track Record',
    titleAr: 'خبرة موثوقة وعريقة',
    desc: 'Comprehensive expertise in Saudi commercial contracting and international trade operations.',
    descAr: 'خبرة متكاملة في الإنشاءات التجارية والتجارة الدولية بالمملكة.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromised Quality',
    titleAr: 'جودة واعتمادية هندسية',
    desc: 'Strict adherence to certified engineering specifications and the official Saudi Building Code (SBC).',
    descAr: 'التزام صارم بأعلى معايير المواصفات الهندسية المعتمدة وكود البناء السعودي.',
  },
  {
    icon: Globe,
    title: 'Global Supply Network',
    titleAr: 'شبكة توريد دولية',
    desc: 'Strategic partnerships with leading international manufacturers and logistics hubs.',
    descAr: 'شراكات وموردون معتمدون في مختلف أنحاء العالم وسلاسل توريد سريعة.',
  },
  {
    icon: Users,
    title: 'Expert Engineering Team',
    titleAr: 'فريق هندسي وإداري محترف',
    desc: 'Highly qualified engineers, project managers, and logistics consultants driving your success.',
    descAr: 'كوادر هندسية وإدارية مؤهلة تدير كافة المشاريع باحترافية وكفاءة.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-container py-20 bg-gray-50/70">
      <Container>
        <SectionTitle
          eyebrow="Why Partner With Us"
          eyebrowAr="لماذا تختار مجموعتنا"
          title="Our Core Strengths & Advantages"
          titleAr="ما يميزنا ويجعلنا خيارك الأفضل"
          subtitle="Combining localized market excellence with international standards and supply chains."
          subtitleAr="نجمع بين الخبرة المحلية العميقة والمعايير العالمية وسلاسل التوريد الموثوقة."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {points.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-6 border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center group-hover:bg-benaa group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-benaa text-lg leading-snug">{p.title}</h3>
                  <p className="font-bold text-xs text-gray-700 font-arabic mt-1">{p.titleAr}</p>
                  
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">{p.desc}</p>
                  <p className="text-[11px] text-gray-500 font-arabic mt-1.5 leading-relaxed">{p.descAr}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}


