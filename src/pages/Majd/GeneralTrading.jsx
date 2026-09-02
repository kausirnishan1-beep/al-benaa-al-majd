import { CheckCircle2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'

export default function GeneralTrading() {
  const highlights = [
    { en: 'Multi-Sector Commercial Wholesale Distribution', ar: 'توزيع وتجارة جملة وتجزئة لمختلف القطاعات' },
    { en: 'Direct Supplier Network Across Europe, Asia & GCC', ar: 'شبكة موردين مباشرة من أوروبا، آسيا ودول الخليج' },
    { en: 'Strategic Stock Warehousing in Riyadh & Dammam', ar: 'مستودعات تخزين استراتيجية في الرياض والدمام' },
    { en: 'Competitive Pricing & Bulk Volume Contracts', ar: 'أسعار تنافسية وعقود توريد كميات كبرى' },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="مؤسسة خطوط المجد للتجارة والاستيراد"
          title="General Trading & Commercial Distribution"
          titleAr="التجارة العامة والتوزيع التجاري الشامل"
          subtitle="Distributing certified construction raw materials, industrial tools, and commercial commodities."
          subtitleAr="توفير وتوزيع أجود مواد البناء والمعدات والسلع التجارية المعتمدة في الأسواق السعودية."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-majd-dark mb-1">Reliable Commercial Supply Partner</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">شريكك الموثوق في التوريدات التجارية</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              AL MAJD LINES FOR TRADE & IMPORT acts as a central commercial pipeline supplying infrastructure developers, contractors, and local distributors with certified building consumables, safety gear, and industrial equipment with guaranteed stock availability.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              تقدم مؤسسة خطوط المجد للتجارة والاستيراد حلول توريد متكاملة للمقاولين والشركات الإنشائية والموزعين، موفرة مستلزمات البناء ومعدات السلامة والمواد الأولية بضمان الجودة ووفرة المخزون.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-majd-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs md:text-sm text-gray-800">{h.en}</p>
                    <p className="text-[11px] text-gray-500 font-arabic">{h.ar}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
              <Button to="/contact" variant="secondary" className="bg-majd text-white">
                Request a Wholesale Quote / طلب عرض سعر تجاري
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

