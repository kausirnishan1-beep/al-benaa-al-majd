import { lazy, Suspense } from 'react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'

const SisterCompanies3DConnection = lazy(() => import('../3d/SisterCompanies3DConnection.jsx'))

export default function SisterCompaniesConnectionSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-y border-gray-100">
      {/* Background subtle ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-benaa/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-majd/5 rounded-full blur-3xl pointer-events-none"></div>

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Synergistic Alliance"
          eyebrowAr="تحالف استراتيجي متكامل"
          title="Two Businesses. One Unified Vision."
          titleAr="مظلة استراتيجية واحدة، تخصصان رائدان"
          subtitle="Uniting world-class civil contracting precision with global supply chain power to build and equip modern Saudi infrastructure."
          subtitleAr="دمج الخبرة الهندسية والإنشائية المتخصصة مع قوة سلاسل الإمداد والاستيراد الدولي لخدمة رؤية المملكة."
        />

        {/* Framed Luxury 3D Canvas Showcase */}
        <div className="mt-6 relative rounded-3xl bg-gradient-to-br from-[#06241b] via-[#0a1814] to-[#14201c] border border-gray-800 shadow-2xl p-4 md:p-8 flex flex-col items-center overflow-hidden">
          {/* Internal Glow Accents */}
          <div className="absolute top-0 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* 3D Canvas */}
          <div className="w-full h-[360px] sm:h-[440px] md:h-[480px] relative flex items-center justify-center">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                  <span className="animate-pulse">Loading 3D Alliance Network...</span>
                </div>
              }
            >
              <SisterCompanies3DConnection />
            </Suspense>

            {/* Live Indicator Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-benaa-dark/90 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AL BENAA • Construction</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#402e03]/90 border border-amber-500/30 text-[11px] text-amber-300 font-mono shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>AL MAJD • Global Trade</span>
            </div>

            <div className="absolute bottom-4 px-3.5 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] text-white/80 font-mono backdrop-blur-md pointer-events-none shadow-md">
              Interactive 3D Alliance Core • Move cursor to interact
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
