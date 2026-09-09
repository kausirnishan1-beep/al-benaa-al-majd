import React from 'react'
import Container from '../common/Container.jsx'
import { motion } from 'framer-motion'
import { useSettings } from '../../admin/hooks/useSettings.js'
import CountUpStats from '../common/CountUpStats.jsx'

export default function BusinessOverview() {
  const { settings } = useSettings()
  const sData = settings?.stats || {}

  const stats = [
    { value: sData.yearsExperience || '15+', label: 'Years of Experience', labelAr: 'سنوات خبرة عريقة' },
    { value: sData.completedProjects || '250+', label: 'Completed Projects', labelAr: 'مشروع منجز بنجاح' },
    { value: sData.tradePartners || '45+', label: 'Global Trade Partners', labelAr: 'شريك تجاري عالمي' },
    { value: sData.exportHubs || '12+', label: 'Import/Export Hubs', labelAr: 'دولة ووجهة تصدير' },
  ].filter((s) => s.value && String(s.value).trim() !== '')

  if (stats.length === 0) return null

  const parseStat = (val) => {
    const str = String(val).trim()
    const match = str.match(/^([^\d]*)([\d,.]+)([^\d]*)$/)
    if (match) {
      const num = parseFloat(match[2].replace(/,/g, ''))
      return {
        prefix: match[1],
        num: isNaN(num) ? 0 : num,
        suffix: match[3],
        isNumeric: !isNaN(num),
      }
    }
    return { prefix: '', num: 0, suffix: str, isNumeric: false }
  }

  return (
    <section className="bg-gradient-to-r from-benaa-dark via-[#082b20] to-[#1a1202] text-white border-y border-majd/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4a017_1px,transparent_1px)] [background-size:20px_20px]" />
      <Container className="py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center divide-x divide-white/5 rtl:divide-x-reverse">
          {stats.map((s, i) => {
            const parsed = parseStat(s.value)
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-3 sm:p-4 flex flex-col justify-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-black text-majd-light tracking-tight flex items-center justify-center">
                  {parsed.isNumeric ? (
                    <CountUpStats
                      end={parsed.num}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      duration={2200}
                    />
                  ) : (
                    <span>{s.value}</span>
                  )}
                </div>
                <div className="text-white font-bold text-xs sm:text-sm md:text-base mt-2 leading-tight">
                  {s.label}
                </div>
                <div className="text-white/60 text-[11px] sm:text-xs font-arabic mt-1 leading-tight">
                  {s.labelAr}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
