import { Target, Eye } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import SEO from '../components/common/SEO.jsx'
import { useSettings } from '../admin/hooks/useSettings.js'
import { useCompanies } from '../hooks/useCompanies.js'

export default function About() {
  const { settings } = useSettings()
  const { getCompany } = useCompanies()
  const general = settings?.general || {}
  const benaa = getCompany('benaa')
  const majd = getCompany('majd')

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="About Us | Corporate Profile"
        description="Learn about AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT - Corporate legacy, vision, and services in Saudi Arabia."
        canonicalPath="/about"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="Corporate Profile"
          eyebrowAr="الملف التعريفي للمجموعة"
          title={`About ${general.siteNameEn || 'AL BENAA & AL MAJD'}`}
          titleAr={`نبذة عن ${general.siteNameAr || 'مؤسسة البناء الرحاب ومؤسسة خطوط المجد'}`}
          subtitle={general.taglineEn || 'General construction contracting and international trade services in Saudi Arabia.'}
          subtitleAr={general.taglineAr || 'خدمات المقاولات والإنشاءات والتجارة والاستيراد في المملكة العربية السعودية.'}
        />

        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-extrabold text-benaa mb-1">Our Corporate Legacy</h3>
            <p className="text-sm font-bold text-majd font-arabic mb-4">مسيرتنا ورؤيتنا المؤسسية</p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Operating in the Kingdom of Saudi Arabia, our alliance comprises two fully certified commercial establishments: <strong>{benaa?.name || 'AL BENAA AL RAHAB CONTRACTING EST.'}</strong> ({benaa?.tagline || 'specializing in general construction, civil contracting, renovation, and project management'}) and <strong>{majd?.name || 'AL MAJD LINES FOR TRADE & IMPORT'}</strong> ({majd?.tagline || 'specializing in international product sourcing, commercial imports, building materials, and logistics'}). Together, we deliver turnkey integrated engineering solutions, premium building materials, and cross-border commercial execution.
            </p>
            <p className="text-sm text-gray-600 font-arabic leading-relaxed">
              كيان سعودي رائد يضم مؤسستين متخصصتين ومعتمدتين: <strong>{benaa?.nameAr || 'مؤسسة البناء الرحاب للمقاولات'}</strong> ({benaa?.taglineAr || 'المتخصصة في المقاولات العامة والإنشاءات والترميم وإدارة المشاريع'})، و<strong>{majd?.nameAr || 'مؤسسة خطوط المجد للتجارة والاستيراد'}</strong> ({majd?.taglineAr || 'المتخصصة في الاستيراد والتجارة وتوريد المواد والحلول اللوجستية'}). نسعى لتقديم حلول شاملة بأعلى معايير الجودة والاحترافية والكفاءة التشغيلية.
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

