import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'

const Hero3DScene = lazy(() => import('../3d/Hero3DScene.jsx'))

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-benaa via-benaa-dark to-[#06241b] text-white overflow-hidden py-20 md:py-28">
      {/* Background geometric accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4a017_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Ambient 3D Glow Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-majd/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-benaa-light/20 rounded-full blur-3xl pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-majd-light animate-pulse"></span>
              <span className="text-majd-light font-bold text-xs md:text-sm tracking-wider uppercase">
                AL BENAA AL RAHAB & AL MAJD LINES
              </span>
              <span className="text-white/40">|</span>
              <span className="text-white/80 text-xs md:text-sm font-arabic">مؤسسة البناء ومؤسسة خطوط المجد</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Building the Future, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-majd-light via-amber-300 to-majd">
                Connecting Global Markets
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mt-3 font-arabic leading-snug">
              نبني المستقبل، ونربط الأسواق العالمية
            </p>

            <p className="mt-5 text-white/80 text-sm md:text-base leading-relaxed">
              A premier Saudi commercial alliance uniting two certified industry leaders: <strong className="text-white">AL BENAA AL RAHAB CONTRACTING EST.</strong> (General Construction & Engineering) and <strong className="text-white">AL MAJD LINES FOR TRADE & IMPORT</strong> (Global Supply Chain & Logistics).
            </p>

            <p className="mt-2 text-white/60 text-xs md:text-sm font-arabic leading-relaxed">
              تحالف تجاري سعودي رائد يجمع بين التميز الإنشائي والهندسي والتجارة وسلاسل الإمداد العالمية المعتمدة.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                to="/benaa"
                variant="primary"
                className="bg-white text-benaa hover:bg-gray-100 shadow-xl px-6 py-3.5 border border-white/20"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-benaa/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-benaa" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-xs md:text-sm leading-tight">AL BENAA AL RAHAB</span>
                    <span className="block text-[10px] text-benaa/80 font-arabic leading-tight">مؤسسة البناء الرحاب للمقاولات</span>
                  </div>
                </div>
              </Button>

              <Button
                to="/majd"
                variant="secondary"
                className="bg-gradient-to-r from-majd to-amber-600 text-white hover:brightness-110 shadow-xl px-6 py-3.5 border border-majd/30"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Globe2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-xs md:text-sm leading-tight">AL MAJD LINES</span>
                    <span className="block text-[10px] text-white/80 font-arabic leading-tight">مؤسسة خطوط المجد للتجارة</span>
                  </div>
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Right 3D Interactive Canvas Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative w-full h-[360px] sm:h-[420px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-[2px] pointer-events-none"></div>
            
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                  <span className="animate-pulse">Loading 3D Visuals...</span>
                </div>
              }
            >
              <Hero3DScene />
            </Suspense>

            {/* Interactive hint tag */}
            <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-white/70 pointer-events-none flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Interactive 3D • Move cursor</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

