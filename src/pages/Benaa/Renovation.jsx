import React from 'react'
import { CheckCircle2, Hammer } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function Renovation() {
  const breadcrumbs = [
    { label: 'Al-Benaa Contracting', to: '/benaa' },
    { label: 'Renovation & Restoration' },
  ]

  const highlights = [
    {
      en: 'Architectural Remodeling & Facade Modernization',
      ar: 'تطوير وتحديث الواجهات والتصميم المعماري الحديث',
    },
    {
      en: 'Structural Reinforcement & Core Crack Repair',
      ar: 'تدعيم الهياكل الإنشائية ومعالجة التصدعات الهندسية',
    },
    {
      en: 'Smart Interior Fit-outs & Space Optimization',
      ar: 'تشطيبات داخلية ذكية وإعادة هندسة المساحات واستغلالها',
    },
    {
      en: 'Energy Efficiency & Modern MEP Upgrades',
      ar: 'رفع كفاءة استهلاك الطاقة وتحديث أنظمة السباكة والكهرباء',
    },
  ]

  const renovationSteps = [
    {
      step: '01',
      title: 'Structural Condition Assessment',
      titleAr: 'المعاينة والتقييم الإنشائي الميداني',
      desc: 'In-depth diagnostics of concrete health, load-bearing walls, and existing mechanical utilities.',
    },
    {
      step: '02',
      title: 'Architectural Redesign & Budgeting',
      titleAr: 'التصميم المعماري وتحديد الميزانية',
      desc: 'Formulating value-engineered designs that maximize property aesthetic and functional market value.',
    },
    {
      step: '03',
      title: 'Controlled Demolition & Structural Reinforcement',
      titleAr: 'الإزالة المحكومة والتدعيم الإنشائي',
      desc: 'Precise dismantling of aged elements followed by carbon-fiber or steel structural reinforcement.',
    },
    {
      step: '04',
      title: 'Fit-out, MEP Upgrades & Handover',
      titleAr: 'التشطيبات وتحديث الشبكات والتسليم',
      desc: 'Premium finishing materials, energy-efficient lighting, and zero-defect commissioning.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Renovation & Architectural Restoration | AL BENAA"
        description="Professional renovation, structural rehabilitation, and architectural remodeling services by AL BENAA AL RAHAB CONTRACTING EST. in Saudi Arabia."
        canonicalPath="/benaa/renovation"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="Renovation & Architectural Restoration"
          titleAr="أعمال التجديد، الترميم والتطوير المعماري"
          subtitle="Modernizing and restoring commercial properties and residential estates across Saudi Arabia."
          subtitleAr="إعادة تأهيل وتطوير المباني السكنية والتجارية القائمة بأحدث التقنيات والمعايير الهندسية."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-benaa">Revitalizing Existing Properties</h3>
                <p className="text-xs font-bold text-majd font-arabic">تحديث وتطوير العقارات القائمة</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We specialize in complex structural rehabilitation, historic facade restorations, and commercial office transformations. Our engineering team modernizes aging buildings while minimizing business disruptions and ensuring strict structural safety.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نمتلك خبرة واسعة في أعمال الترميم المعماري وتجديد المقرات الإدارية والمباني السكنية ورفع قيمتها السوقية والجمالية مع الحفاظ على أعلى معايير السلامة الإنشائية المعتمدة.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-benaa shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs md:text-sm text-gray-800">{h.en}</p>
                    <p className="text-[11px] text-gray-500 font-arabic mt-0.5">{h.ar}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Renovation Lifecycle</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">مراحل وخطوات التقييم والتنفيذ</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {renovationSteps.map((rs) => (
                <div key={rs.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-benaa/20 absolute top-3 right-4">{rs.step}</span>
                  <h5 className="font-bold text-sm text-benaa pr-8">{rs.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{rs.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{rs.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-benaa via-benaa-dark to-[#082b20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Request an On-Site Renovation Assessment</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                احصل على استشارة هندسية ومعاينة ميدانية لتقييم وتجديد عقارك
              </p>
            </div>
            <Button
              to="/contact?subject=Renovation%20Assessment"
              variant="white"
              size="md"
              className="shrink-0"
            >
              Request Assessment / طلب معاينة
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
