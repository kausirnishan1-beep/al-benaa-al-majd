import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'
import { useSettings } from '../../admin/hooks/useSettings.js'
import { useCompanies } from '../../hooks/useCompanies.js'

const Hero3DBuilding = lazy(() => import('../3d/Hero3DBuilding.jsx'))

export default function Hero() {
  const { settings } = useSettings()
  const { getCompany } = useCompanies()
  const general = settings?.general || {}
  const benaaCompany = getCompany('benaa')
  const majdCompany = getCompany('majd')

  return (
    <section className="relative bg-gradient-to-br from-benaa via-benaa-dark to-[#06241b] text-white overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24">
      {/* Background geometric accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4a017_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Ambient 3D Glow Orbs */}
      <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-majd/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-60 sm:w-80 h-60 sm:h-80 bg-benaa-light/20 rounded-full blur-3xl pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 max-w-2xl"
          >
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-5 max-w-full">
              <span className="w-2 h-2 rounded-full bg-majd-light animate-pulse flex-shrink-0"></span>
              <span className="text-majd-light font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase">
                {general.siteNameEn || 'AL BENAA AL RAHAB & AL MAJD LINES'}
              </span>
              <span className="text-white/40 hidden xs:inline">|</span>
              <span className="text-white/80 text-[11px] sm:text-xs md:text-sm font-arabic">
                {general.siteNameAr || 'مؤسسة البناء ومؤسسة خطوط المجد'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {general.taglineEn || 'Building the Future, Connecting Global Markets'}
            </h1>

            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90 mt-2.5 sm:mt-3 font-arabic leading-snug">
              {general.taglineAr || 'نبني المستقبل، ونربط الأسواق العالمية'}
            </p>

            <p className="mt-4 sm:mt-5 text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              A premier Saudi commercial alliance uniting two certified industry leaders: <strong className="text-white">{benaaCompany?.name || 'AL BENAA AL RAHAB CONTRACTING EST.'}</strong> (General Construction & Engineering) and <strong className="text-white">{majdCompany?.name || 'AL MAJD LINES FOR TRADE & IMPORT'}</strong> (Global Supply Chain & Logistics).
            </p>

            <p className="mt-2 text-white/60 text-[11px] sm:text-xs md:text-sm font-arabic leading-relaxed">
              تحالف تجاري سعودي رائد يجمع بين التميز الإنشائي والهندسي والتجارة وسلاسل الإمداد العالمية المعتمدة.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              <Button
                to={benaaCompany?.path || '/benaa'}
                variant="primary"
                className="w-full sm:w-auto bg-white text-benaa hover:bg-gray-100 shadow-xl px-5 sm:px-6 py-3 sm:py-3.5 border border-white/20 active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-benaa/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-benaa" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-xs sm:text-sm leading-tight">
                      {benaaCompany?.name ? benaaCompany.name.split(' CONTRACTING')[0] : 'AL BENAA AL RAHAB'}
                    </span>
                    <span className="block text-[10px] text-benaa/80 font-arabic leading-tight">
                      {benaaCompany?.nameAr || 'مؤسسة البناء الرحاب للمقاولات'}
                    </span>
                  </div>
                </div>
              </Button>

              <Button
                to={majdCompany?.path || '/majd'}
                variant="secondary"
                className="w-full sm:w-auto bg-gradient-to-r from-majd to-amber-600 text-white hover:brightness-110 shadow-xl px-5 sm:px-6 py-3 sm:py-3.5 border border-majd/30 active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-xs sm:text-sm leading-tight">
                      {majdCompany?.name ? majdCompany.name.split(' FOR TRADE')[0] : 'AL MAJD LINES'}
                    </span>
                    <span className="block text-[10px] text-white/80 font-arabic leading-tight">
                      {majdCompany?.nameAr || 'مؤسسة خطوط المجد للتجارة'}
                    </span>
                  </div>
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Right 3D Interactive Canvas Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative w-full h-[340px] sm:h-[420px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-[2px] shadow-2xl flex items-center justify-center mt-8 lg:mt-0"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                  <span className="animate-pulse">Loading 3D Skyscraper...</span>
                </div>
              }
            >
              <Hero3DBuilding />
            </Suspense>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

