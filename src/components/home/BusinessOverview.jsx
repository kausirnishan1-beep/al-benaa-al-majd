import Container from '../common/Container.jsx'
import { motion } from 'framer-motion'
import { useSettings } from '../../admin/hooks/useSettings.js'

export default function BusinessOverview() {
  const { settings } = useSettings()
  const sData = settings?.stats || {}

  const stats = [
    { value: sData.yearsExperience, label: 'Years of Experience', labelAr: 'سنوات خبرة عريقة' },
    { value: sData.completedProjects, label: 'Completed Projects', labelAr: 'مشروع منجز بنجاح' },
    { value: sData.tradePartners, label: 'Global Trade Partners', labelAr: 'شريك تجاري عالمي' },
    { value: sData.exportHubs, label: 'Import/Export Hubs', labelAr: 'دولة ووجهة تصدير' },
  ].filter((s) => s.value && s.value.trim() !== '')

  if (stats.length === 0) return null

  return (
    <section className="bg-benaa-dark text-white border-y border-majd/20">
      <Container className="py-10 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-2 sm:p-4 flex flex-col justify-center"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-black text-majd-light tracking-tight">{s.value}</div>
            <div className="text-white font-bold text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2 leading-tight">{s.label}</div>
            <div className="text-white/60 text-[11px] sm:text-xs font-arabic mt-0.5 leading-tight">{s.labelAr}</div>
          </motion.div>
        ))}
      </Container>
    </section>
  )
}


