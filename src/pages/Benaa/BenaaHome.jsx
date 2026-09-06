import { lazy, Suspense } from 'react'
import { Building2, ChevronRight } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import SEO from '../../components/common/SEO.jsx'
import { usePublicServices } from '../../hooks/usePublicServices.js'
import { useCompanies } from '../../hooks/useCompanies.js'
import { Link } from 'react-router-dom'

const BenaaConstruction3D = lazy(() => import('../../components/3d/BenaaConstruction3D.jsx'))

export default function BenaaHome() {
  const { benaaServices } = usePublicServices()
  const { getCompany } = useCompanies()
  const company = getCompany('benaa')

  return (
    <>
      <SEO
        title="AL BENAA AL RAHAB CONTRACTING EST. | General Construction & Contracting"
        description="AL BENAA AL RAHAB CONTRACTING EST. - General contracting, civil construction, renovation, maintenance, and project management in Saudi Arabia."
        canonicalPath="/benaa"
      />
      <section className="relative bg-gradient-to-br from-benaa via-benaa-dark to-[#06241b] text-white py-20 md:py-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-majd-light uppercase tracking-wider mb-4 border border-white/10">
                <Building2 className="w-4 h-4" />
                <span>General Contracting Division</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {company?.name || 'AL BENAA AL RAHAB CONTRACTING EST.'}
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white/90 mt-2 font-arabic leading-snug">
                {company?.nameAr || 'مؤسسة البناء الرحاب للمقاولات'}
              </p>
              <p className="mt-6 text-white/80 text-base md:text-lg leading-relaxed">
                {company?.description || 'Specializing in premium residential compounds, commercial towers, structural rehabilitation, and full-lifecycle project management across Saudi Arabia.'}
              </p>
              <p className="mt-2 text-white/60 text-sm font-arabic leading-relaxed">
                {company?.descriptionAr || 'متخصصون في تنفيذ المشاريع السكنية والتجارية، أعمال التجديد والترميم، الصيانة الوقائية وإدارة المشاريع الهندسية المتكاملة.'}
              </p>
            </div>

            <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[460px] lg:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 backdrop-blur-[2px] shadow-2xl flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                    <span className="animate-pulse">Loading 3D Construction Scene...</span>
                  </div>
                }
              >
                <BenaaConstruction3D />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-container py-20 bg-gray-50/50">
        <Container>
          <SectionTitle
            eyebrow="Contracting Capabilities"
            eyebrowAr="خدمات البناء والمقاولات"
            title="Specialized Construction Solutions"
            titleAr="حلول المقاولات والإنشاءات المتخصصة"
            subtitle="Explore our comprehensive engineering disciplines delivering precision, safety, and longevity."
            subtitleAr="تعرف على نطاق خدماتنا الهندسية المتميزة بأعلى معايير الجودة والسلامة المهنية."
          />
          {benaaServices.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200 mt-10 shadow-sm">
              <p className="text-gray-600 font-bold text-sm">No contracting services currently listed.</p>
              <p className="text-gray-400 text-xs font-arabic mt-1">لا توجد خدمات مقاولات مضافة حالياً.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {benaaServices.map((s) => (
                <Link
                  key={s.id}
                  to={s.path}
                  className="block p-7 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center mb-5 group-hover:bg-benaa group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-benaa text-lg group-hover:text-majd transition-colors">
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
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-benaa group-hover:text-majd transition-colors">
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

