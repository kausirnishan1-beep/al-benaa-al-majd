import React from 'react'
import { CheckCircle2, Globe2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function ImportExport() {
  const breadcrumbs = [
    { label: 'Al-Majd Lines', to: '/majd' },
    { label: 'International Import & Export' },
  ]

  const highlights = [
    {
      en: 'Comprehensive Saudi Customs Clearance & Port Handling',
      ar: 'التخليص الجمركي الشامل والمناولة في الموانئ والمطارات',
    },
    {
      en: 'Direct Bulk Factory Procurement Across Asia, Europe & Americas',
      ar: 'الاستيراد والتوريد المباشر من المصانع العالمية في آسيا وأوروبا',
    },
    {
      en: 'Bilateral Trade Agreements & GCC Cross-Border Freight',
      ar: 'تيسير التبادل التجاري والشحن لدول مجلس التعاون الخليجي',
    },
    {
      en: 'Full SABER Platform Certification & SASO Standards Compliance',
      ar: 'مطابقة منصة سابر وإصدار شهادات ساسو والمواصفات السعودية القياسية',
    },
  ]

  const importPhases = [
    {
      step: '01',
      title: 'Global Sourcing & Product Verification',
      titleAr: 'تحديد المصانع والتحقق الفني',
      desc: 'Factory vetting, sample inspection, and SASO specification benchmarking.',
    },
    {
      step: '02',
      title: 'Commercial Contracting & Trade Finance',
      titleAr: 'التعاقد التجاري والاعتمادات المستندية',
      desc: 'Handling Letters of Credit (LC), proforma contracts, and escrow arrangements.',
    },
    {
      step: '03',
      title: 'Freight Forwarding & Shipping Logistics',
      titleAr: 'الشحن البحري والجوي والبري',
      desc: 'Optimized multi-modal container shipping with real-time bill of lading tracking.',
    },
    {
      step: '04',
      title: 'SABER Clearance & Kingdom Delivery',
      titleAr: 'التخليص الجمركي والتوصيل للمستودعات',
      desc: 'Issuing Saber CoC certificates, rapid customs clearance, and door-to-door delivery.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="International Import & Export | AL MAJD"
        description="Comprehensive international import and export services, SABER compliance, and cross-border trade operations by AL MAJD LINES FOR TRADE & IMPORT."
        canonicalPath="/majd/import-export"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="مؤسسة خطوط المجد للتجارة والاستيراد"
          title="International Import & Export"
          titleAr="الاستيراد والتصدير والتجارة الدولية"
          subtitle="Facilitating cross-border trade and industrial procurement for the Saudi market."
          subtitleAr="تيسير التجارة الدولية وتوريد المواد والمعدات الصناعية للسوق السعودي."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-majd/10 text-majd flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Global Trade Gateway to Saudi Arabia</h3>
                <p className="text-xs font-bold text-majd font-arabic">بوابة التجارة الدولية نحو المملكة</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We manage end-to-end import and export operations, handling international letters of credit (LCs), shipping freight logistics, port documentation, and SABER certification. We specialize in construction materials, machinery, finished architectural goods, and industrial supplies.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              ندير كافة العمليات اللوجستية والمصرفية للاستيراد والتصدير، بما في ذلك الاعتمادات المستندية، التخليص الجمركي وإصدار شهادات المطابقة عبر منصة سابر لمختلف المواد والمعدات وفق أعلى مستويات الشفافية.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-majd shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs md:text-sm text-gray-800">{h.en}</p>
                    <p className="text-[11px] text-gray-500 font-arabic mt-0.5">{h.ar}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Import Phases */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Trade & Import Pipeline</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">مراحل وخطوات التوريد والاستيراد الدولي</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {importPhases.map((ip) => (
                <div key={ip.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-majd/20 absolute top-3 right-4">{ip.step}</span>
                  <h5 className="font-bold text-sm text-gray-900 pr-8">{ip.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{ip.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{ip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1a1202] via-[#2d2005] to-majd text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Import or Export With Total Regulatory Assurance</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                تواصل مع فريق الاستيراد والتجارة الدولية لتسريع توريداتك
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                to="/contact?subject=Import%20Export%20Inquiry"
                variant="white"
                size="md"
              >
                Inquire / طلب استيراد
              </Button>
              <Button
                to="/majd/products"
                variant="outlineWhite"
                size="md"
              >
                Product Catalogue
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
