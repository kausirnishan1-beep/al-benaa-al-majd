import React from 'react'
import { CheckCircle2, Search } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function ProductSourcing() {
  const breadcrumbs = [
    { label: 'Al-Majd Lines', to: '/majd' },
    { label: 'Global Sourcing & Procurement' },
  ]

  const highlights = [
    {
      en: 'Direct Global Factory Vetting, Capacity & Ethical Auditing',
      ar: 'تدقيق واعتماد المصانع العالمية المباشرة وتقييم طاقتها الإنتاجية',
    },
    {
      en: 'Independent Pre-Shipment Quality Inspections (SGS/TUV/Intertek)',
      ar: 'فحص ومطابقة الجودة قبل الشحن عبر مختبرات وجهات فحص معتمدة',
    },
    {
      en: 'Bespoke Engineering Specs & Customized OEM Production',
      ar: 'تصنيع مخصص وفق المواصفات الهندسية الخاصة بمتطلبات العميل',
    },
    {
      en: 'Volume Price Negotiation & Total Landed Cost Optimization',
      ar: 'التفاوض المالي المباشر وضمان أقل كلفة إجمالية واصلة للمستودعات',
    },
  ]

  const sourcingWorkflow = [
    {
      step: '01',
      title: 'Technical Requirement Analysis',
      titleAr: 'دراسة المواصفات الهندسية والفنية',
      desc: 'Formulating precise BOM (Bill of Materials) and target certification requirements.',
    },
    {
      step: '02',
      title: 'Factory Shortlisting & Audit',
      titleAr: 'اختيار وتدقيق المصانع المؤهلة',
      desc: 'Reviewing factory ISO certifications, production machinery, and history.',
    },
    {
      step: '03',
      title: 'Sample Testing & Commercial Terms',
      titleAr: 'فحص العينات وتوقيع العقود',
      desc: 'Laboratory testing of physical samples, final price negotiation, and delivery milestones.',
    },
    {
      step: '04',
      title: 'Pre-Shipment QA & Export Clearance',
      titleAr: 'الفحص النهائي والتخليص والتصدير',
      desc: 'Batch sample QA testing, container loading supervision, and customs dispatch.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Global Product Sourcing & Procurement | AL MAJD"
        description="Strategic global product sourcing, factory audits, and international procurement services by AL MAJD LINES FOR TRADE & IMPORT."
        canonicalPath="/majd/product-sourcing"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="مؤسسة خطوط المجد للتجارة والاستيراد"
          title="Global Product Sourcing & Procurement"
          titleAr="توريد المنتجات والبحث عن الموردين العالميين"
          subtitle="Connecting clients with verified manufacturers to procure certified materials at competitive rates."
          subtitleAr="الوصول إلى أفضل المصانع العالمية المعتمدة لتوريد المنتجات والمواد بأفضل الأسعار التنافسية."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-majd/10 text-majd flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Strategic Worldwide Procurement</h3>
                <p className="text-xs font-bold text-majd font-arabic">خدمات البحث والتعاقد والتوريد الدولي</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We eliminate intermediaries by sourcing directly from verified manufacturing plants worldwide. We conduct stringent factory quality audits, lab certifications, and negotiate volume discounts on behalf of our clients in Saudi Arabia.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نوفر خدمة البحث عن المصانع وفحص عينات المنتجات والتأكد من مطابقتها للمواصفات السعودية والخليجية والتفاوض نيابة عنكم للحصول على أفضل شروط التوريد والأسعار دون وسطاء.
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

          {/* Workflow */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our 4-Step Sourcing Methodology</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">منهجية البحث والاعتماد والتوريد</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {sourcingWorkflow.map((sw) => (
                <div key={sw.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-majd/20 absolute top-3 right-4">{sw.step}</span>
                  <h5 className="font-bold text-sm text-gray-900 pr-8">{sw.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{sw.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{sw.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1a1202] via-[#2d2005] to-majd text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Source Direct From Top Global Manufacturers</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                تواصل مع مستشاري التوريد لاختيار وتأهيل أفضل المصانع العالمية لمشروعك
              </p>
            </div>
            <Button
              to="/contact?subject=Product%20Sourcing%20Inquiry"
              variant="white"
              size="md"
              className="shrink-0"
            >
              Request Sourcing / طلب استشارة توريد
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
