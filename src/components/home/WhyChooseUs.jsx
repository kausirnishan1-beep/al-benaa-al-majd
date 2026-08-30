import { motion } from 'framer-motion'
import { Award, ShieldCheck, Globe, Users } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'

const points = [
  {
    icon: Award,
    title: 'خبرة موثوقة',
    desc: 'سنوات من الخبرة العريقة في مجال الإنشاءات والتجارة الدولية.',
  },
  {
    icon: ShieldCheck,
    title: 'جودة عالية',
    desc: 'التزام صارم بأعلى معايير الجودة والمواصفات العالمية القياسية.',
  },
  {
    icon: Globe,
    title: 'شبكة عالمية',
    desc: 'شراكات استراتيجية وموردون موثوقون في مختلف أنحاء العالم.',
  },
  {
    icon: Users,
    title: 'فريق محترف',
    desc: 'كوادر هندسية وإدارية مؤهلة تدير كافة المشاريع باحترافية وكفاءة.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="لماذا نحن" title="ما يميزنا" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-6 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center group-hover:bg-benaa group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-benaa mb-2 text-lg">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

