import { CheckCircle2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'

export default function Maintenance() {
  const highlights = [
    { en: 'Preventive & Scheduled Facility Maintenance', ar: 'برامج الصيانة الوقائية والدورية المجدولة' },
    { en: '24/7 Rapid Emergency Response Teams', ar: 'فرق طوارئ واستجابة سريعة على مدار الساعة' },
    { en: 'HVAC, Electrical & Plumbing Systems (MEP)', ar: 'صيانة شبكات التكييف المركزي والكهرباء والسباكة' },
    { en: 'Building Envelope & Waterproofing Inspections', ar: 'فحص وصيانة عوازل الأسطح والواجهات الخارجية' },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="Facility Maintenance & Operations"
          titleAr="إدارة وصيانة وتشغيل المرافق والمنشآت"
          subtitle="Ensuring operational continuity, asset preservation, and safety for your properties."
          subtitleAr="ضمان استمرارية التشغيل والحفاظ على الأصول العقارية بأعلى معايير الأمان والكفاءة."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-benaa mb-1">Continuous Maintenance Excellence</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">خدمات الصيانة والتشغيل المتكاملة</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              Our specialized maintenance division offers tailored facility management contracts for corporate towers, residential compounds, and industrial complexes. We combine state-of-the-art diagnostic tools with seasoned technicians to prevent costly breakdowns.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نوفر عقود صيانة سنوية ودورية مصممة خصيصاً للمنشآت التجارية والسكنية والصناعية، مدعومة بفرق فنية متخصصة ومعدات كشف متطورة لضمان كفاءة كافة الأنظمة التشغيلية.
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
                Inquire About Maintenance Contracts / طلب عقد صيانة
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

