import React from 'react'
import { CheckCircle2, TrendingUp } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function GeneralTrading() {
  const breadcrumbs = [
    { label: 'Al-Majd Lines', to: '/majd' },
    { label: 'General Trading & Distribution' },
  ]

  const highlights = [
    {
      en: 'Multi-Sector Commercial Wholesale & B2B Supply Contracts',
      ar: 'عقود توريد وتوزيع بالجملة وتجارة B2B لمختلف القطاعات',
    },
    {
      en: 'Direct Tier-1 Supplier Network Across Europe, Asia & GCC',
      ar: 'شبكة موردين ومصنعين مباشرة من الدرجة الأولى في أوروبا وآسيا والخليج',
    },
    {
      en: 'Strategic Warehousing & Buffer Stock Logistics in Saudi Arabia',
      ar: 'مستودعات تخزين استراتيجية وإدارة مخزون احترافي في المملكة',
    },
    {
      en: 'High-Volume Price Competitiveness & Standardized Quality',
      ar: 'أسعار تنافسية للكميات الكبرى ومطابقة دقيقة لمعايير الجودة القياسية',
    },
  ]

  const tradingCategories = [
    {
      step: '01',
      title: 'Certified Building Materials',
      titleAr: 'مواد البناء والإنشاء المعتمدة',
      desc: 'Structural steel, cementitious products, architectural insulation, and specialized tiles.',
    },
    {
      step: '02',
      title: 'Industrial & Safety Hardware',
      titleAr: 'المعدات الصناعية وأدوات السلامة',
      desc: 'Certified PPE, electrical consumables, power tools, and heavy hardware supplies.',
    },
    {
      step: '03',
      title: 'Commercial Commodities',
      titleAr: 'السلع والبضائع التجارية المتنوعة',
      desc: 'Bulk sourcing of commercial consumables for retail, enterprise, and institutional procurement.',
    },
    {
      step: '04',
      title: 'Custom Contract Bulk Supply',
      titleAr: 'عقود التوريد المخصصة للمشاريع الكبرى',
      desc: 'Tailored scheduled deliveries matched directly to project construction timelines.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="General Trading & Commercial Distribution | AL MAJD"
        description="Reliable general trading, building material distribution, and commercial wholesale supplies across Saudi Arabia by AL MAJD LINES FOR TRADE & IMPORT."
        canonicalPath="/majd/general-trading"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="مؤسسة خطوط المجد للتجارة والاستيراد"
          title="General Trading & Commercial Distribution"
          titleAr="التجارة العامة والتوزيع التجاري الشامل"
          subtitle="Supplying certified construction materials, tools, and commercial commodities."
          subtitleAr="توفير وتوزيع أجود مواد البناء والمعدات والسلع التجارية المعتمدة في الأسواق السعودية."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-majd/10 text-majd flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Reliable Commercial Supply Partner</h3>
                <p className="text-xs font-bold text-majd font-arabic">شريكك الموثوق في التوريدات التجارية</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              AL MAJD LINES FOR TRADE & IMPORT acts as a central commercial pipeline supplying infrastructure developers, contracting firms, and local distributors with certified building consumables, safety equipment, and industrial products with guaranteed stock availability.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              تقدم مؤسسة خطوط المجد للتجارة والاستيراد حلول توريد متكاملة للمقاولين والشركات الإنشائية والموزعين، موفرة مستلزمات البناء ومعدات السلامة والمواد الأولية بضمان الجودة ووفرة المخزون وسرعة التوصيل.
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

          {/* Trading Categories */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Product & Commodity Sectors</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">قطاعات التوريد والتجارة الرئيسية</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {tradingCategories.map((tc) => (
                <div key={tc.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-majd/20 absolute top-3 right-4">{tc.step}</span>
                  <h5 className="font-bold text-sm text-gray-900 pr-8">{tc.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{tc.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{tc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1a1202] via-[#2d2005] to-majd text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Request a Wholesale Pricing Proposal</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                احصل على تسعير فوري ومنافس لعقود التوريد والكميات التجارية
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                to="/contact?subject=Wholesale%20Trading%20Quote"
                variant="white"
                size="md"
              >
                Request Quote / طلب تسعير
              </Button>
              <Button
                to="/majd/products"
                variant="outlineWhite"
                size="md"
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
