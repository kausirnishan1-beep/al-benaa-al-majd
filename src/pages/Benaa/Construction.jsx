import { CheckCircle2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function Construction() {
  const highlights = [
    { en: 'Turnkey Residential & Commercial Compounds', ar: 'مجمعات سكنية وتجارية متكاملة بنظام تسليم المفتاح' },
    { en: 'Structural Engineering & Reinforced Concrete', ar: 'أعمال الهياكل الإنشائية والخرسانة المسلحة' },
    { en: 'Saudi Building Code (SBC) Full Compliance', ar: 'مطابقة تامة لكود البناء السعودي والمواصفات القياسية' },
    { en: 'Advanced Electromechanical (MEP) Execution', ar: 'تنفيذ متقدم للأعمال الكهروميكانيكية وشبكات البنية التحتية' },
  ]

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="General Construction & Civil Engineering | AL BENAA"
        description="Comprehensive general construction and civil engineering contracting services in Saudi Arabia by AL BENAA AL RAHAB CONTRACTING EST."
        canonicalPath="/benaa/construction"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="General Construction & Civil Engineering"
          titleAr="الإنشاءات والمقاولات العامة والهندسة المدنية"
          subtitle="Executing residential, commercial, and structural engineering projects across Saudi Arabia."
          subtitleAr="تنفيذ مشاريع معمارية وسكنية وتجارية متطورة وفق معايير الجودة والسلامة في المملكة."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-benaa mb-1">Scope of Construction Services</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">نطاق الأعمال الإنشائية</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We provide full-spectrum general contracting services ranging from site excavation, foundational piling, structural concrete framework, down to exterior curtain walls and luxury interior fit-outs. Our team ensures rigorous timeline compliance and uncompromised structural integrity.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نقدم خدمات مقاولات عامة شاملة تشمل الحفر ووضع الأساسات والهياكل الخرسانية المسلحة والتشطيبات المعمارية الفاخرة، مع الالتزام التام بالجداول الزمنية وأعلى معايير السلامة المهنية.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-benaa flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs md:text-sm text-gray-800">{h.en}</p>
                    <p className="text-[11px] text-gray-500 font-arabic">{h.ar}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
              <Button to="/contact" variant="primary" className="bg-benaa text-white">
                Request a Project Proposal / طلب عرض سعر
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

