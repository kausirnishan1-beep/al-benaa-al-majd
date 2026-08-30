import { Building2, ChevronRight, CheckCircle2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import { benaaServices } from '../../data/services.js'
import { Link } from 'react-router-dom'

export default function BenaaHome() {
  return (
    <>
      <section className="bg-gradient-to-br from-benaa via-benaa-dark to-[#06241b] text-white py-24">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-majd-light uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4" />
              <span>General Contracting Division</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Al-Benaa Construction
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white/90 mt-2 font-arabic leading-snug">
              شركة البناء للمقاولات العامة
            </p>
            <p className="mt-6 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              Specializing in premium residential compounds, commercial towers, structural rehabilitation, and full-lifecycle project management across Saudi Arabia.
            </p>
            <p className="mt-2 text-white/60 text-sm font-arabic max-w-2xl leading-relaxed">
              متخصصون في تنفيذ المشاريع السكنية والتجارية، أعمال التجديد والترميم، الصيانة الوقائية وإدارة المشاريع الهندسية المتكاملة.
            </p>
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
        </Container>
      </section>
    </>
  )
}

