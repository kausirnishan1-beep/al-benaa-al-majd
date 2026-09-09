import React from 'react'
import { CheckCircle2, Wrench } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function Maintenance() {
  const breadcrumbs = [
    { label: 'Al-Benaa Contracting', to: '/benaa' },
    { label: 'Facility Maintenance & Operations' },
  ]

  const highlights = [
    {
      en: 'Preventive & Scheduled Facility Maintenance Contracts',
      ar: 'برامج الصيانة الوقائية والدورية المجدولة للمنشآت',
    },
    {
      en: '24/7 Rapid Emergency Response Teams across Saudi Arabia',
      ar: 'فرق طوارئ واستجابة فنية سريعة على مدار الساعة',
    },
    {
      en: 'HVAC, Central Air Conditioning, Electrical & Plumbing (MEP)',
      ar: 'صيانة شبكات التكييف المركزي والكهرباء وأنظمة السباكة',
    },
    {
      en: 'Building Envelope, Thermal & Waterproofing Inspections',
      ar: 'فحص وصيانة عوازل الأسطح والواجهات ومنع التسربات',
    },
  ]

  const maintenancePillars = [
    {
      step: '01',
      title: 'Site Survey & Asset Register',
      titleAr: 'المعاينة الميدانية وحصر الأصول',
      desc: 'Cataloging all mechanical, electrical, and structural assets with operational logs.',
    },
    {
      step: '02',
      title: 'Preventive SLA Calendar Setup',
      titleAr: 'إعداد جدول اتفاقيات مستوى الخدمة (SLA)',
      desc: 'Defining routine maintenance cycles and response time guarantees for all systems.',
    },
    {
      step: '03',
      title: 'Dedicated Engineering & Tech Dispatch',
      titleAr: 'توزيع الفرق الهندسية والفنية المعتمدة',
      desc: 'Certified technicians performing scheduled tune-ups, filter changes, and safety audits.',
    },
    {
      step: '04',
      title: 'Real-Time Logging & Reporting',
      titleAr: 'التوثيق الرقمي والتقارير الدورية',
      desc: 'Comprehensive monthly health reports, energy audits, and immediate ticket resolution.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Facility Maintenance & Operations | AL BENAA"
        description="Comprehensive facility maintenance, MEP operations, and preventive care services by AL BENAA AL RAHAB CONTRACTING EST. in Saudi Arabia."
        canonicalPath="/benaa/maintenance"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="Facility Maintenance & Operations"
          titleAr="إدارة وصيانة وتشغيل المرافق والمنشآت"
          subtitle="Ensuring operational continuity, asset preservation, and safety for your properties."
          subtitleAr="ضمان استمرارية التشغيل والحفاظ على الأصول العقارية بأعلى معايير الأمان والكفاءة."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-benaa">Continuous Maintenance Excellence</h3>
                <p className="text-xs font-bold text-majd font-arabic">خدمات الصيانة والتشغيل المتكاملة</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              Our specialized maintenance division offers tailored facility management contracts for corporate towers, residential compounds, and commercial centers. We combine advanced diagnostic tools with seasoned technicians to prevent costly breakdowns and extend equipment lifecycle.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نوفر عقود صيانة سنوية ودورية مصممة خصيصاً للمنشآت التجارية والسكنية، مدعومة بفرق فنية متخصصة ومعدات كشف متطورة لضمان كفاءة كافة الأنظمة التشغيلية واستدامتها.
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

          {/* Pillars */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Operation & Maintenance Protocol</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">آلية إدارة العقود وجودة الخدمة</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {maintenancePillars.map((mp) => (
                <div key={mp.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-benaa/20 absolute top-3 right-4">{mp.step}</span>
                  <h5 className="font-bold text-sm text-benaa pr-8">{mp.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{mp.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{mp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-benaa via-benaa-dark to-[#082b20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Request a Maintenance Service Contract</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                تواصل معنا للحصول على عقد صيانة وقائية مخصص لمنشأتك
              </p>
            </div>
            <Button
              to="/contact?subject=Maintenance%20Contract"
              variant="white"
              size="md"
              className="shrink-0"
            >
              Request Contract / طلب عقد صيانة
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
