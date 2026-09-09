import React from 'react'
import {
  CheckCircle2,
  Building2,
} from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function Construction() {
  const breadcrumbs = [
    { label: 'Al-Benaa Contracting', to: '/benaa' },
    { label: 'General Construction' },
  ]

  const highlights = [
    {
      en: 'Turnkey Residential & Commercial Compounds',
      ar: 'مجمعات سكنية وتجارية متكاملة بنظام تسليم المفتاح',
    },
    {
      en: 'Structural Engineering & Reinforced Concrete Frameworks',
      ar: 'أعمال الهياكل الإنشائية والخرسانة المسلحة المتطورة',
    },
    {
      en: 'Saudi Building Code (SBC) Certified Compliance',
      ar: 'مطابقة تامة لكود البناء السعودي وكافة المواصفات القياسية',
    },
    {
      en: 'Advanced Electromechanical (MEP) & Infrastructure Execution',
      ar: 'تنفيذ متقدم للأعمال الكهروميكانيكية وشبكات البنية التحتية',
    },
  ]

  const workflowSteps = [
    {
      step: '01',
      title: 'Engineering & Feasibility Study',
      titleAr: 'الدراسة الهندسية والتصميم التنفيذي',
      desc: 'Topographical surveying, structural engineering calculations, and budget estimation.',
    },
    {
      step: '02',
      title: 'Statutory Permitting & SBC Approvals',
      titleAr: 'استخراج التراخيص ومطابقة كود البناء',
      desc: 'Securing certified municipal permits and civil defense regulatory compliance.',
    },
    {
      step: '03',
      title: 'Site Mobilization & Precision Structural Execution',
      titleAr: 'تجهيز الموقع والصب والتنفيذ الإنشائي',
      desc: 'Excavation, foundation piling, reinforced concrete frame construction, and MEP integration.',
    },
    {
      step: '04',
      title: 'Quality Testing & Client Handover',
      titleAr: 'الفحص وضبط الجودة والتسليم النهائي',
      desc: 'Material lab testing, snagging resolution, and turnkey operational commissioning.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="General Construction & Civil Engineering | AL BENAA"
        description="Comprehensive general construction and civil engineering contracting services in Saudi Arabia by AL BENAA AL RAHAB CONTRACTING EST."
        canonicalPath="/benaa/construction"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="General Construction & Civil Engineering"
          titleAr="الإنشاءات والمقاولات العامة والهندسة المدنية"
          subtitle="Executing residential, commercial, and structural engineering projects across Saudi Arabia."
          subtitleAr="تنفيذ مشاريع معمارية وسكنية وتجارية متطورة وفق معايير الجودة والسلامة في المملكة."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          {/* Main Scope Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-benaa">Scope of Construction Services</h3>
                <p className="text-xs font-bold text-majd font-arabic">نطاق الأعمال الإنشائية</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We provide full-spectrum general contracting services ranging from site excavation,
              foundational piling, structural concrete framework, down to exterior curtain walls and
              luxury interior fit-outs. Our engineering team ensures rigorous timeline compliance,
              transparent milestone reporting, and uncompromised structural integrity.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نقدم خدمات مقاولات عامة شاملة تشمل الحفر ووضع الأساسات والهياكل الخرسانية المسلحة
              والتشطيبات المعمارية، مع الالتزام التام بالجداول الزمنية وتطبيق أعلى معايير السلامة
              المهنية المعتمدة في المملكة العربية السعودية.
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

          {/* Execution Workflow */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Structured Execution Workflow</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">مراحل تنفيذ وضبط المشاريع الإنشائية</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {workflowSteps.map((ws) => (
                <div key={ws.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-benaa/20 absolute top-3 right-4">{ws.step}</span>
                  <h5 className="font-bold text-sm text-benaa pr-8">{ws.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{ws.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{ws.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Quote Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-benaa via-benaa-dark to-[#082b20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Plan Your Construction Project With Us</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                تواصل مع مهندسينا لدراسة مشروعك وتقديم عرض فني ومالي مفصل
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                to="/contact?subject=Construction%20Proposal"
                variant="white"
                size="md"
              >
                Request Proposal / طلب عرض سعر
              </Button>
              <Button
                to="/benaa/projects"
                variant="outlineWhite"
                size="md"
              >
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
