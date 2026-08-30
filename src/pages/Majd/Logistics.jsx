import { Truck, CheckCircle2, Navigation, Warehouse } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'

export default function Logistics() {
  const highlights = [
    { en: 'Multimodal Ocean & Air Freight Forwarding', ar: 'خدمات الشحن البحري والجوي المتعدد الوسائط' },
    { en: 'Temperature-Controlled & Heavy Cargo Warehousing', ar: 'مستودعات مجهزة ومكيفة وتخزين الحمولات الثقيلة' },
    { en: 'Express Customs Clearance at Saudi Land & Sea Ports', ar: 'تخليص جمركي سريع في الموانئ والمنافذ السعودية' },
    { en: 'Last-Mile Inland Transportation & Tracking', ar: 'النقل البري الداخلي وتتبع الشحنات المباشر' },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Al-Majd Trading Division"
          eyebrowAr="شركة المجد للتجارة"
          title="Supply Chain & Logistics Services"
          titleAr="الخدمات اللوجستية وإدارة سلاسل الإمداد"
          subtitle="Delivering cargo safely, efficiently, and on schedule across the Kingdom and GCC."
          subtitleAr="إدارة عمليات الشحن والتخزين والنقل البري بكفاءة وأمان تام في جميع مناطق المملكة."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-majd-dark mb-1">Integrated Saudi Logistics Solutions</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">حلول لوجستية وسلاسل إمداد متكاملة</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We operate an extensive logistics network comprising bonded warehousing, customs brokers in Jeddah Islamic Port and King Abdulaziz Port in Dammam, and a modern fleet for last-mile delivery directly to your job site.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نوفر شبكة لوجستية شاملة تغطي كافة موانئ المملكة الرئيسية (ميناء جدة الإسلامي وميناء الملك عبدالعزيز بالدمام)، بالإضافة إلى مستودعات تخزين متطورة وأسطول نقل بري يضمن وصول البضائع إلى موقع العمل بأعلى سرعة.
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
                Inquire for Freight & Logistics / استفسار خدمات الشحن
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

