import { CheckCircle2 } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'

export default function ProjectManagement() {
  const highlights = [
    { en: 'Feasibility Studies & Value Engineering', ar: 'دراسات الجدوى والهندسة القيمة وضبط التكاليف' },
    { en: 'Strict Quality Control & Assurance (QA/QC)', ar: 'مراقبة الجودة الصارمة ومطابقة المواصفات الفنية' },
    { en: 'Procurement Oversight & Supply Chain Scheduling', ar: 'إدارة المشتريات وجدولة تدفق المواد والمعدات' },
    { en: 'Risk Mitigation & Safety Governance (HSE)', ar: 'إدارة المخاطر وتطبيق معايير الصحة والسلامة المهنية' },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST."
          eyebrowAr="مؤسسة البناء الرحاب للمقاولات"
          title="Engineering Project Management"
          titleAr="إدارة المشاريع الهندسية والإشراف الفني"
          subtitle="Delivering complex construction programs on time, within budget, and to the highest quality benchmarks."
          subtitleAr="إدارة وتنفيذ البرامج والمشاريع الإنشائية الكبرى وفق الجداول المحددة والميزانيات المعتمدة."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-benaa mb-1">Total Project Lifecycle Leadership</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">قيادة وإدارة متكاملة لدورة حياة المشروع</p>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
              We act as trusted project managers and owner representatives, orchestrating design coordination, contractor management, permitting, and commissioning. Our data-driven methodology protects your investments and guarantees peak execution standard.
            </p>
            <p className="text-gray-600 font-arabic text-xs md:text-sm leading-relaxed">
              نعمل كجهة إشرافية وإدارية موثوقة تمثل المالك وتدير كافة مراحل التصميم والتراخيص والإشراف الميداني لضمان كفاءة الإنفاق الاستثماري والالتزام بالمواصفات القياسية.
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
                Discuss Project Management / استشارة إدارة مشروع
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

