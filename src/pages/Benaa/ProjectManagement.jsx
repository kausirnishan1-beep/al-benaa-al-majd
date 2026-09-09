import React from 'react'
import { CheckCircle2, ClipboardCheck } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function ProjectManagement() {
  const breadcrumbs = [
    { label: 'Al-Benaa Contracting', to: '/benaa' },
    { label: 'Project Management & Supervision' },
  ]

  const highlights = [
    {
      en: 'Feasibility Studies & Value Engineering Optimization',
      ar: 'دراسات الجدوى والهندسة القيمة وضبط التكاليف',
    },
    {
      en: 'Rigorous Quality Control & Quality Assurance (QA/QC)',
      ar: 'مراقبة الجودة الصارمة ومطابقة المواصفات الفنية المعتمدة',
    },
    {
      en: 'Procurement Oversight & Milestone Scheduling (CPM/PERT)',
      ar: 'إدارة المشتريات وجدولة تدفق المواد والمعدات والمسار الحرج',
    },
    {
      en: 'Health, Safety & Environmental Governance (HSE)',
      ar: 'إدارة المخاطر وتطبيق أعلى معايير الصحة والسلامة المهنية',
    },
  ]

  const managementPhases = [
    {
      step: '01',
      title: 'Planning, Baseline & Scope Definition',
      titleAr: 'تحديد النطاق والجدول الزمني الأساسي',
      desc: 'Developing comprehensive work breakdown structures (WBS) and cost baselines.',
    },
    {
      step: '02',
      title: 'Contractor & Vendor Prequalification',
      titleAr: 'تأهيل المقاولين والموردين والتوريدات',
      desc: 'Transparent bidding analysis, contract administration, and technical evaluations.',
    },
    {
      step: '03',
      title: 'Site Supervision & Quality Audits',
      titleAr: 'الإشراف الهندسي الميداني وضبط الجودة',
      desc: 'Daily site inspections, milestone verification, and HSE safety compliance checks.',
    },
    {
      step: '04',
      title: 'Commissioning & Final Handover',
      titleAr: 'الاختبارات التشغيلية والتسليم النهائي',
      desc: 'Punch list sign-off, as-built documentation, and operational transition support.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Engineering Project Management | AL BENAA"
        description="Comprehensive construction project management, supervision, and value engineering by AL BENAA AL RAHAB CONTRACTING EST. in Saudi Arabia."
        canonicalPath="/benaa/project-management"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="Engineering Project Management"
          titleAr="إدارة المشاريع الهندسية والإشراف الفني"
          subtitle="Delivering construction programs on schedule, within budget, and to rigorous quality benchmarks."
          subtitleAr="إدارة وتنفيذ البرامج والمشاريع الإنشائية الكبرى وفق الجداول المحددة والميزانيات المعتمدة."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-benaa">Total Project Lifecycle Leadership</h3>
                <p className="text-xs font-bold text-majd font-arabic">قيادة وإدارة متكاملة لدورة حياة المشروع</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We act as trusted project managers and client representatives, orchestrating design coordination, contractor supervision, municipal permitting, and final commissioning. Our structured methodology protects your capital investment and guarantees peak engineering standard.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نعمل كجهة إشرافية وإدارية موثوقة تمثل المالك وتدير كافة مراحل التصميم والتراخيص والإشراف الميداني لضمان كفاءة الإنفاق الاستثماري والالتزام بالمواصفات القياسية.
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

          {/* Management Phases */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Governance & Oversight Framework</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">مراحل ومنهجية إدارة المشاريع والإشراف</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {managementPhases.map((mp) => (
                <div key={mp.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-benaa/20 absolute top-3 right-4">{mp.step}</span>
                  <h5 className="font-bold text-sm text-benaa pr-8">{mp.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{mp.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{mp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-benaa via-benaa-dark to-[#082b20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Consult with Our Project Management Team</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                تواصل مع خبرائنا لمناقشة إدارة وإشراف مشروعك القادم
              </p>
            </div>
            <Button
              to="/contact?subject=Project%20Management%20Inquiry"
              variant="white"
              size="md"
              className="shrink-0"
            >
              Discuss Project / استشارة مشروع
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
