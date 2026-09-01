import { Globe, CheckCircle2, Ship, Plane } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'

export default function ImportExport() {
  const highlights = [
    { en: 'International Customs Clearance & Tariff Advisory', ar: 'التخليص الجمركي الشامل والاستشارات الجمركية' },
    { en: 'Direct Bulk Factory Procurement', ar: 'الاستيراد والتوريد المباشر من المصانع العالمية' },
    { en: 'Bilateral Trade Agreements & GCC Shipping', ar: 'تيسير التبادل التجاري والشحن لدول مجلس التعاون' },
    { en: 'SABER Platform & SASO Standards Compliance', ar: 'مطابقة منصة سابر والمواصفات السعودية (SASO)' },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="مؤسسة خطوط المجد للتجارة والاستيراد"
          title="International Import & Export"
          titleAr="الاستيراد والتصدير والتجارة الدولية"
          subtitle="Connecting certified global factories with the rapidly expanding Saudi infrastructure market."
          subtitleAr="ربط كبرى المصانع والشركات العالمية بمشاريع البنية التحتية المتسارعة في المملكة."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-majd-dark mb-1">Global Trade Gateway to Saudi Arabia</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">بوابة التجارة الدولية نحو المملكة</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We manage end-to-end import and export operations, handling international letters of credit (LCs), shipping freight logistics, port documentation, and SABER certification. We specialize in construction materials, machinery, and industrial supplies.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              ندير كافة العمليات اللوجستية والمصرفية للاستيراد والتصدير، بما في ذلك الاعتمادات المستندية، التخليص الجمركي وإصدار شهادات المطابقة عبر منصة سابر لمختلف المواد والمعدات.
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
                Submit an Import/Export Inquiry / طلب استيراد أو تصدير
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

