import { CheckCircle2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import SEO from '../../components/common/SEO.jsx'

export default function Renovation() {
  const highlights = [
    { en: 'Architectural Remodeling & Facade Upgrades', ar: 'تطوير وتحديث الواجهات والتصميم المعماري' },
    { en: 'Structural Reinforcement & Crack Repair', ar: 'تدعيم الهياكل الإنشائية ومعالجة التصدعات' },
    { en: 'Smart Interior Fit-outs & Space Optimization', ar: 'تشطيبات داخلية ذكية وإعادة استغلال المساحات' },
    { en: 'Energy Efficiency & Modern MEP Replacement', ar: 'رفع كفاءة استهلاك الطاقة وتحديث الأنظمة الميكانيكية' },
  ]

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="Renovation & Architectural Restoration | AL BENAA"
        description="Professional renovation, structural rehabilitation, and architectural remodeling services by AL BENAA AL RAHAB CONTRACTING EST. in Saudi Arabia."
        canonicalPath="/benaa/renovation"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="Renovation & Architectural Restoration"
          titleAr="أعمال التجديد، الترميم والتطوير المعماري"
          subtitle="Modernizing and restoring commercial properties and residential estates."
          subtitleAr="إعادة تأهيل وتطوير المباني السكنية والتجارية القائمة بأحدث التقنيات الهندسية."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-benaa mb-1">Revitalizing Existing Properties</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">تحديث وتطوير العقارات القائمة</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We specialize in complex structural rehabilitation, historic facade restorations, and commercial office transformations. Our engineering team modernizes aging buildings while minimizing business disruptions and ensuring strict structural safety.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نمتلك خبرة واسعة في أعمال الترميم المعماري وتجديد المقرات الإدارية والمباني السكنية ورفع قيمتها السوقية والجمالية مع الحفاظ على أعلى معايير السلامة الإنشائية.
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
                Request a Renovation Assessment / طلب معاينة واستشارة
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

