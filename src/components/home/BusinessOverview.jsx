import Container from '../common/Container.jsx'
import { motion } from 'framer-motion'
import { useSettings } from '../../admin/hooks/useSettings.js'

export default function BusinessOverview() {
  const { settings } = useSettings()
  const sData = settings?.stats || {}

  const stats = [
    { value: sData.yearsExperience || '15+', label: 'Years of Experience', labelAr: 'سنوات خبرة عريقة' },
    { value: sData.completedProjects || '150+', label: 'Completed Projects', labelAr: 'مشروع منجز بنجاح' },
    { value: sData.tradePartners || '45+', label: 'Global Trade Partners', labelAr: 'شريك تجاري عالمي' },
    { value: sData.exportHubs || '12+', label: 'Import/Export Hubs', labelAr: 'دولة ووجهة تصدير' },
  ]

  return (
    <section className="bg-benaa-dark text-white border-y border-majd/20">
      <Container className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-4"
          >
            <div className="text-4xl md:text-5xl font-black text-majd-light tracking-tight">{s.value}</div>
            <div className="text-white font-bold text-sm md:text-base mt-2">{s.label}</div>
            <div className="text-white/60 text-xs font-arabic mt-0.5">{s.labelAr}</div>
          </motion.div>
        ))}
      </Container>
    </section>
  )
}


