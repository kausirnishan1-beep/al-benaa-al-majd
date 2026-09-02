import { Target, Eye } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Corporate Profile"
          eyebrowAr="الملف التعريفي للمجموعة"
          title="About AL BENAA & AL MAJD"
          titleAr="نبذة عن مؤسسة البناء الرحاب ومؤسسة خطوط المجد"
          subtitle="Pioneering modern construction contracting and strategic international trade in Saudi Arabia."
          subtitleAr="رواد المقاولات والإنشاءات الحديثة والتجارة والاستيراد والتصدير في المملكة العربية السعودية."
        />

        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-extrabold text-benaa mb-1">Our Corporate Legacy</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">مسيرتنا ورؤيتنا المؤسسية</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Operating in the Kingdom of Saudi Arabia, our alliance comprises two fully certified commercial establishments: <strong>AL BENAA AL RAHAB CONTRACTING EST.</strong> (specializing in general construction, civil contracting, renovation, and project management) and <strong>AL MAJD LINES FOR TRADE & IMPORT</strong> (specializing in international product sourcing, commercial imports, building materials, and logistics). Together, we deliver turnkey integrated engineering solutions, premium building materials, and cross-border commercial execution.
            </p>
            <p className="text-sm text-gray-600 font-arabic leading-relaxed">
              كيان سعودي رائد يضم مؤسستين متخصصتين ومعتمدتين: مؤسسة البناء الرحاب للمقاولات (المتخصصة في المقاولات العامة والإنشاءات والترميم وإدارة المشاريع)، ومؤسسة خطوط المجد للتجارة والاستيراد (المتخصصة في الاستيراد والتجارة وتوريد المواد والحلول اللوجستية). نسعى لتقديم حلول شاملة بأعلى معايير الجودة والاحترافية والكفاءة التشغيلية.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-benaa">Our Vision</h3>
              <p className="text-xs font-bold text-majd font-arabic mb-3">رؤيتنا الاستراتيجية</p>
              <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                To be the foremost trusted partner in the Middle East for landmark construction projects and agile international trade chains, contributing actively to Saudi Vision 2030.
              </p>
              <p className="text-xs text-gray-500 font-arabic mt-3 leading-relaxed">
                أن نكون الشريك الأكثر موثوقية وتميزاً في الشرق الأوسط في تنفيذ المشاريع الإنشائية الكبرى وتيسير حركة التجارة الدولية بما يواكب مستهدفات رؤية المملكة 2030.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-majd/10 text-majd flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-benaa">Our Mission</h3>
              <p className="text-xs font-bold text-majd font-arabic mb-3">رسالتنا</p>
              <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                Delivering uncompromised engineering quality, sustainable construction practices, and reliable global procurement with full regulatory compliance and client satisfaction.
              </p>
              <p className="text-xs text-gray-500 font-arabic mt-3 leading-relaxed">
                تقديم خدمات إنشائية وتجارية فائقة الجودة وفق أعلى معايير الاستدامة والسلامة، وبناء شراكات راسخة ومستدامة تلبي تطلعات عملائنا وشركائنا.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

