import React from 'react'
import {
  Target,
  Eye,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Building2,
  Globe2,
  FileText,
  ArrowRight,
} from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import SEO from '../components/common/SEO.jsx'
import Breadcrumb from '../components/common/Breadcrumb.jsx'
import Button from '../components/common/Button.jsx'
import { useSettings } from '../admin/hooks/useSettings.js'
import { useCompanies } from '../hooks/useCompanies.js'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity & Compliance',
    titleAr: 'النزاهة والالتزام النظامي',
    desc: 'Strict adherence to Saudi statutory regulations, SBC engineering codes, and global trade standards.',
    descAr: 'التزام كامل بالأنظمة السعودية وكود البناء SBC ومعايير التجارة الدولية.',
  },
  {
    icon: Award,
    title: 'Engineering Excellence',
    titleAr: 'الجودة والتميز الهندسي',
    desc: 'Uncompromising standard of craftsmanship, certified materials, and verified safety protocols.',
    descAr: 'معايير جودة دقيقة واختيار مواد معتمدة وتطبيق صارم لبروتوكولات السلامة.',
  },
  {
    icon: Zap,
    title: 'Agile Execution',
    titleAr: 'الكفاءة والسرعة التشغيلية',
    desc: 'Disciplined project management, rapid supply chains, and transparent milestone tracking.',
    descAr: 'إدارة مشاريع منضبطة وسلاسل توريد سريعة ومتابعة شفافة لكل المراحل.',
  },
  {
    icon: Target,
    title: 'Vision 2030 Alignment',
    titleAr: 'مواكبة رؤية المملكة 2030',
    desc: 'Contributing proactively to sustainable infrastructure, localization, and economic growth in the Kingdom.',
    descAr: 'المساهمة الفاعلة في دعم البنية التحتية المستدامة وتوطين الخدمات والتنمية.',
  },
]

export default function About() {
  const { settings } = useSettings()
  const { getCompany } = useCompanies()
  const general = settings?.general || {}
  const benaa = getCompany('benaa')
  const majd = getCompany('majd')

  const breadcrumbs = [{ label: 'About Us' }]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="About Us | Corporate Profile"
        description="Learn about AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT - Corporate legacy, vision, and services in Saudi Arabia."
        canonicalPath="/about"
      />

      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="Corporate Profile"
          eyebrowAr="الملف التعريفي للمجموعة"
          title={`About ${general.siteNameEn || 'AL BENAA & AL MAJD'}`}
          titleAr={`نبذة عن ${general.siteNameAr || 'مؤسسة البناء الرحاب ومؤسسة خطوط المجد'}`}
          subtitle={
            general.taglineEn ||
            'General construction contracting and international trade services in Saudi Arabia.'
          }
          subtitleAr={
            general.taglineAr ||
            'خدمات المقاولات والإنشاءات والتجارة والاستيراد في المملكة العربية السعودية.'
          }
        />

        <div className="max-w-5xl mx-auto space-y-12 text-gray-700 leading-relaxed mt-10">
          {/* Main Story & Legacy Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-benaa/10 to-majd/10 rounded-bl-full pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-benaa mb-1">
                Our Corporate Legacy & Identity
              </h3>
              <p className="text-sm sm:text-base font-bold text-majd font-arabic mb-6">
                مسيرتنا ورؤيتنا المؤسسية في المملكة العربية السعودية
              </p>

              <div className="space-y-4 text-sm sm:text-base text-gray-700">
                <p>
                  Operating in the Kingdom of Saudi Arabia, our corporate group unites two distinct,
                  highly specialized commercial establishments:{' '}
                  <strong className="text-gray-900">
                    {benaa?.name || 'AL BENAA AL RAHAB CONTRACTING EST.'}
                  </strong>{' '}
                  and{' '}
                  <strong className="text-gray-900">
                    {majd?.name || 'AL MAJD LINES FOR TRADE & IMPORT'}
                  </strong>
                  . Together, we combine engineering rigor, structural capability, and an extensive
                  cross-border supply chain network.
                </p>

                <p className="text-gray-600 font-arabic text-sm sm:text-base leading-relaxed">
                  مجموعة سعودية رائدة تجمع تحت مظلتها مؤسستين تجاريتين مستقلتين ومتكاملتين:{' '}
                  <strong>{benaa?.nameAr || 'مؤسسة البناء الرحاب للمقاولات العامة'}</strong> و
                  <strong>{majd?.nameAr || 'مؤسسة خطوط المجد للتجارة والاستيراد'}</strong>. نجمع بين
                  الخبرة الهندسية الميدانية في المشاريع الإنشائية والتنفيذية، والقدرة الاستيرادية
                  واللوجستية المباشرة من أبرز المصانع والشركاء العالميين.
                </p>
              </div>
            </div>
          </div>

          {/* Two Entities Showcase */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benaa Box */}
            <div className="bg-white p-8 rounded-3xl border-t-4 border-t-benaa border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-benaa">
                  {benaa?.name || 'AL BENAA AL RAHAB CONTRACTING EST.'}
                </h4>
                <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
                  {benaa?.nameAr || 'مؤسسة البناء الرحاب للمقاولات'}
                </p>

                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  Focused on turnkey residential developments, commercial facilities, architectural
                  renovation, and electromechanical maintenance under certified Saudi Building Code
                  standards.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-benaa shrink-0" />
                    <span>General & Turnkey Construction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-benaa shrink-0" />
                    <span>Commercial & Residential Renovation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-benaa shrink-0" />
                    <span>Preventive Maintenance & Engineering</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button to="/benaa" variant="outlineBenaa" size="sm" className="w-full">
                  Explore Al-Benaa Services <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>

            {/* Majd Box */}
            <div className="bg-white p-8 rounded-3xl border-t-4 border-t-majd border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-majd/10 text-majd flex items-center justify-center mb-5">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">
                  {majd?.name || 'AL MAJD LINES FOR TRADE & IMPORT'}
                </h4>
                <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
                  {majd?.nameAr || 'مؤسسة خطوط المجد للتجارة'}
                </p>

                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  Specializing in international trade, high-grade construction materials, commercial
                  procurement, factory sourcing, and multi-modal logistics with SABER compliance.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-majd shrink-0" />
                    <span>Global Factory Direct Sourcing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-majd shrink-0" />
                    <span>Building Materials & Commercial Supplies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-majd shrink-0" />
                    <span>Customs Clearance & SABER Certification</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button to="/majd" variant="outlineMajd" size="sm" className="w-full">
                  Explore Al-Majd Services <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-benaa">Our Vision</h3>
              <p className="text-xs font-bold text-majd font-arabic mb-3">رؤيتنا الاستراتيجية</p>
              <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                To be recognized across the Kingdom of Saudi Arabia as an exemplary model of
                integrated contracting capability and reliable international trade facilitation,
                powering infrastructure in line with Saudi Vision 2030.
              </p>
              <p className="text-xs text-gray-500 font-arabic mt-3 leading-relaxed">
                أن نكون نموذجاً يحتذى به في المملكة العربية السعودية في تقديم الحلول الإنشائية
                المتكاملة وتيسير خطوط التجارة الدولية، مساهمين بفاعلية في تحقيق مستهدفات رؤية 2030.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-majd/10 text-majd flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-benaa">Our Mission</h3>
              <p className="text-xs font-bold text-majd font-arabic mb-3">رسالتنا</p>
              <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                Delivering high-standard contracting execution, ethical procurement, certified
                materials, and end-to-end logistics with strict compliance to Saudi regulatory
                frameworks and total customer satisfaction.
              </p>
              <p className="text-xs text-gray-500 font-arabic mt-3 leading-relaxed">
                تقديم خدمات المقاولات والإنشاءات والتجارة بأعلى مستويات الجودة والمصداقية، وتوفير
                سلاسل توريد موثوقة تلبي متطلبات المشاريع وفق أعلى معايير السلامة والأنظمة المعتمدة.
              </p>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Our Core Pillars & Values
            </h3>
            <p className="text-sm text-gray-500 text-center mb-10 font-arabic">
              قيمنا وركائز العمل المؤسسي
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v) => {
                const IconComponent = v.icon
                return (
                  <div
                    key={v.title}
                    className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-benaa mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h5 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h5>
                      <p className="text-[11px] font-bold text-majd font-arabic mb-2">
                        {v.titleAr}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Compliance & Verification Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-benaa via-benaa-dark to-[#082b20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h4 className="text-xl font-bold">Verified Corporate Credentials</h4>
              <p className="text-sm text-white/80 font-arabic mt-1">
                الوثائق والشهادات النظامية والتراخيص الرسمية المعتمدة
              </p>
              <p className="text-xs text-white/70 mt-2 max-w-xl">
                Review our official commercial registrations, licenses, and quality compliance
                certificates.
              </p>
            </div>
            <Button
              to="/compliance"
              variant="white"
              icon={FileText}
              size="md"
              className="shrink-0"
            >
              View Compliance & Licenses
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
