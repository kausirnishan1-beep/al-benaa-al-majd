import { Search, CheckCircle2, ShieldCheck, Factory } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'

export default function ProductSourcing() {
  const highlights = [
    { en: 'Direct Global Factory Vetting & Auditing', ar: 'تدقيق واعتماد المصانع العالمية المباشرة' },
    { en: 'Pre-Shipment Quality Inspections (SGS/TUV)', ar: 'فحص ومطابقة الجودة قبل الشحن عبر جهات فحص معتمدة' },
    { en: 'Bespoke Manufacturing & Private Labeling', ar: 'تصنيع مخصص وفق المواصفات الخاصة للعميل' },
    { en: 'Price Negotiation & Cost Optimization', ar: 'التفاوض المالي وضمان أقل كلفة مع أعلى جودة' },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Al-Majd Trading Division"
          eyebrowAr="شركة المجد للتجارة"
          title="Global Product Sourcing & Procurement"
          titleAr="توريد المنتجات والبحث عن الموردين العالميين"
          subtitle="Connecting you with verified manufacturers to procure certified materials at wholesale rates."
          subtitleAr="الوصول إلى أفضل المصانع العالمية المعتمدة لتوريد المنتجات والمواد بأفضل الأسعار التنافسية."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-majd-dark mb-1">Strategic Worldwide Procurement</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">خدمات البحث والتعاقد والتوريد الدولي</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We eliminate intermediaries by sourcing directly from verified manufacturing plants worldwide. We conduct stringent factory quality audits, lab certifications, and negotiate volume discounts on behalf of our clients in Saudi Arabia.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نوفر خدمة البحث عن المصانع وفحص عينات المنتجات والتأكد من مطابقتها للمواصفات السعودية والخليجية والتفاوض نيابة عنكم للحصول على أفضل شروط التوريد والأسعار.
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
                Request Sourcing Consultation / طلب استشارة توريد
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

