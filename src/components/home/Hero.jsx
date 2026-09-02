import { motion } from 'framer-motion'
import { Building2, Globe2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-benaa via-benaa-dark to-[#06241b] text-white overflow-hidden py-24 md:py-32">
      {/* Background geometric accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4a017_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-majd-light animate-pulse"></span>
            <span className="text-majd-light font-bold text-xs md:text-sm tracking-wider uppercase">
              AL BENAA AL RAHAB & AL MAJD LINES
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80 text-xs md:text-sm font-arabic">مؤسسة البناء الرحاب ومؤسسة خطوط المجد</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Building the Future, <br />
            <span className="text-majd-light">Connecting Global Markets</span>
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-white/90 mt-3 font-arabic leading-snug">
            نبني المستقبل، ونربط الأسواق العالمية
          </p>

          <p className="mt-6 text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">
            A premier Saudi commercial alliance uniting two market leaders: <strong className="text-white">AL BENAA AL RAHAB CONTRACTING EST.</strong> and <strong className="text-white">AL MAJD LINES FOR TRADE & IMPORT</strong>.
          </p>

          <p className="mt-2 text-white/60 text-sm md:text-base font-arabic leading-relaxed max-w-2xl">
            مؤسستان رائدتان: مؤسسة البناء الرحاب للمقاولات، ومؤسسة خطوط المجد للتجارة والاستيراد في المملكة العربية السعودية.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              to="/benaa"
              variant="primary"
              className="bg-white text-benaa hover:bg-gray-100 shadow-lg px-6 py-3.5"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-benaa" />
                <div className="text-left">
                  <span className="block font-bold text-sm leading-tight">AL BENAA AL RAHAB</span>
                  <span className="block text-[11px] text-benaa/80 font-arabic leading-tight">مؤسسة البناء الرحاب للمقاولات</span>
                </div>
              </div>
            </Button>

            <Button
              to="/majd"
              variant="secondary"
              className="bg-majd text-white hover:bg-majd-light shadow-lg px-6 py-3.5"
            >
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-white" />
                <div className="text-left">
                  <span className="block font-bold text-sm leading-tight">AL MAJD LINES</span>
                  <span className="block text-[11px] text-white/80 font-arabic leading-tight">مؤسسة خطوط المجد للتجارة</span>
                </div>
              </div>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

