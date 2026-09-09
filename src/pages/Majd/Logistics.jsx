import React from 'react'
import { CheckCircle2, Truck } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function Logistics() {
  const breadcrumbs = [
    { label: 'Al-Majd Lines', to: '/majd' },
    { label: 'Supply Chain & Logistics' },
  ]

  const highlights = [
    {
      en: 'Multimodal Ocean & Air Freight Forwarding with Global Carriers',
      ar: 'خدمات الشحن البحري والجوي المتعدد الوسائط بالتعاون مع كبرى خطوط الملاحة',
    },
    {
      en: 'Temperature-Controlled & Heavy Project Cargo Warehousing',
      ar: 'مستودعات مجهزة ومكيفة وتخزين الحمولات والمعدات الثقيلة بأمان',
    },
    {
      en: 'Express Customs Clearance at Saudi Land, Sea & Air Ports',
      ar: 'تخليص جمركي فوري في الموانئ والمطارات والمنافذ البرية السعودية',
    },
    {
      en: 'Last-Mile Inland Fleet Transportation & Real-Time Tracking',
      ar: 'أسطول نقل بري داخلي مباشر إلى مواقع المشاريع وتتبع الشحنات الحي',
    },
  ]

  const logisticsNetwork = [
    {
      step: '01',
      title: 'Ocean & Air Freight Management',
      titleAr: 'إدارة الشحن البحري والجوي',
      desc: 'FCL, LCL consolidation, charter flight handling, and marine insurance protection.',
    },
    {
      step: '02',
      title: 'Saudi Port Customs Brokerage',
      titleAr: 'التخليص الجمركي بموانئ المملكة',
      desc: 'Licensed brokerage teams at Jeddah Islamic Port, King Abdulaziz Port Dammam, and Riyadh Dry Port.',
    },
    {
      step: '03',
      title: 'Warehousing & Cross-Docking',
      titleAr: 'التخزين والمستودعات والفرز',
      desc: 'Secure bonded facilities, palletizing, inventory tracking, and climate-controlled storage.',
    },
    {
      step: '04',
      title: 'Direct Jobsite Fleet Delivery',
      titleAr: 'النقل البري المباشر لمواقع العمل',
      desc: 'Heavy flatbeds, low-loaders, and curtain trailers delivering straight to construction sites.',
    },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Supply Chain & Logistics Services | AL MAJD"
        description="Reliable freight forwarding, customs clearance, warehousing, and inland transport across Saudi Arabia by AL MAJD LINES FOR TRADE & IMPORT."
        canonicalPath="/majd/logistics"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="مؤسسة خطوط المجد للتجارة والاستيراد"
          title="Supply Chain & Logistics Services"
          titleAr="الخدمات اللوجستية وإدارة سلاسل الإمداد"
          subtitle="Delivering cargo safely, efficiently, and on schedule across the Kingdom and GCC."
          subtitleAr="إدارة عمليات الشحن والتخزين والنقل البري بكفاءة وأمان تام في جميع مناطق المملكة."
        />

        <div className="max-w-4xl mx-auto space-y-10 mt-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-majd/10 text-majd flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Integrated Saudi Logistics Solutions</h3>
                <p className="text-xs font-bold text-majd font-arabic">حلول لوجستية وسلاسل إمداد متكاملة</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We operate an extensive logistics network comprising secure warehousing, customs brokers in Jeddah Islamic Port and King Abdulaziz Port in Dammam, and a modern transport fleet for last-mile delivery directly to your project location.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نوفر شبكة لوجستية شاملة تغطي كافة موانئ المملكة الرئيسية (ميناء جدة الإسلامي وميناء الملك عبدالعزيز بالدمام)، بالإضافة إلى مستودعات تخزين متطورة وأسطول نقل بري يضمن وصول البضائع إلى موقع العمل بأعلى سرعة وأمان.
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

          {/* Logistics Network */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Our Integrated Logistics Grid</h4>
            <p className="text-xs font-bold text-majd font-arabic mb-6">شبكة وخدمات سلاسل الإمداد المتكاملة</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {logisticsNetwork.map((ln) => (
                <div key={ln.step} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 relative">
                  <span className="text-2xl font-black text-majd/20 absolute top-3 right-4">{ln.step}</span>
                  <h5 className="font-bold text-sm text-gray-900 pr-8">{ln.title}</h5>
                  <p className="text-[11px] font-bold text-gray-500 font-arabic mt-0.5">{ln.titleAr}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{ln.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1a1202] via-[#2d2005] to-majd text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold">Schedule Your Freight or Logistics Consultation</h4>
              <p className="text-xs sm:text-sm text-white/80 font-arabic">
                تواصل مع مستشاري الخدمات اللوجستية لجدولة شحناتك وتخفيض تكاليف النقل
              </p>
            </div>
            <Button
              to="/contact?subject=Logistics%20Freight%20Inquiry"
              variant="white"
              size="md"
              className="shrink-0"
            >
              Inquire Freight / استفسار الشحن
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
