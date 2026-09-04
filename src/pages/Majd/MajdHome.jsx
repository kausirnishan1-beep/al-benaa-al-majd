import { lazy, Suspense } from 'react'
import { Globe2, ChevronRight } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import { usePublicServices } from '../../hooks/usePublicServices.js'
import { useCompanies } from '../../hooks/useCompanies.js'
import { Link } from 'react-router-dom'

const Majd3DScene = lazy(() => import('../../components/3d/Majd3DScene.jsx'))

export default function MajdHome() {
  const { majdServices } = usePublicServices()
  const { getCompany } = useCompanies()
  const company = getCompany('majd')

  return (
    <>
      <section className="relative bg-gradient-to-br from-majd-dark via-[#684b06] to-[#402e03] text-white py-20 md:py-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-majd-light uppercase tracking-wider mb-4 border border-white/10">
                <Globe2 className="w-4 h-4" />
                <span>International Trading & Logistics Division</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {company?.name || 'AL MAJD LINES FOR TRADE & IMPORT'}
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white/90 mt-2 font-arabic leading-snug">
                {company?.nameAr || 'مؤسسة خطوط المجد للتجارة والاستيراد'}
              </p>
              <p className="mt-6 text-white/80 text-base md:text-lg leading-relaxed">
                {company?.description || 'Empowering Saudi and regional infrastructure through premium construction material procurement, industrial machinery imports, and reliable global freight operations.'}
              </p>
              <p className="mt-2 text-white/60 text-sm font-arabic leading-relaxed">
                {company?.descriptionAr || 'متخصصون في الاستيراد والتصدير الدولي، التجارة العامة، توريد مواد البناء والمعدات الصناعية، وإدارة سلاسل الإمداد والخدمات اللوجستية المتكاملة.'}
              </p>
            </div>

            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-[2px] pointer-events-none"></div>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                    <span className="animate-pulse">Loading 3D Logistics Globe...</span>
                  </div>
                }
              >
                <Majd3DScene />
              </Suspense>
              <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-amber-300 pointer-events-none font-mono">
                3D Global Trade Matrix
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-container py-20 bg-gray-50/50">
        <Container>
          <SectionTitle
            eyebrow="Commercial Solutions"
            eyebrowAr="خدمات التجارة والاستيراد"
            title="Trading & Supply Chain Capabilities"
            titleAr="خدمات التجارة وسلاسل الإمداد العالمية"
            subtitle="Connecting international production powerhouses directly to your projects in Saudi Arabia."
            subtitleAr="نربط كبرى المصانع والشركات العالمية بمشاريعكم ومستودعاتكم في المملكة العربية السعودية."
          />
          {majdServices.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200 mt-10 shadow-sm">
              <p className="text-gray-600 font-bold text-sm">No trading or logistics services currently listed.</p>
              <p className="text-gray-400 text-xs font-arabic mt-1">لا توجد خدمات تجارة أو لوجستيات مضافة حالياً.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {majdServices.map((s) => (
                <Link
                  key={s.id}
                  to={s.path}
                  className="block p-7 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-majd/10 text-majd-dark flex items-center justify-center mb-5 group-hover:bg-majd group-hover:text-white transition-colors">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-majd-dark text-lg group-hover:text-benaa transition-colors">
                    {s.title}
                  </h3>
                  <p className="font-bold text-sm text-gray-700 font-arabic mt-0.5">
                    {s.titleAr}
                  </p>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {s.description}
                  </p>
                  <p className="text-[11px] text-gray-500 font-arabic mt-1 leading-relaxed">
                    {s.descriptionAr}
                  </p>
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-majd-dark group-hover:text-benaa transition-colors">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

