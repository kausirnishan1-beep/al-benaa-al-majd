import { FileText, ShieldCheck, Download, ExternalLink, Award } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'

const items = [
  {
    title: 'Comprehensive Corporate Profile & Qualifications',
    titleAr: 'الملف التعريفي الشامل وسابقة الأعمال للمجموعة',
    desc: 'Download our official company credentials, completed projects portfolio, and technical capabilities brochure.',
    descAr: 'تحميل البروفايل الرسمي الشامل وسجل المشاريع المنجزة والقدرات الفنية والتنفيذية.',
    file: '/documents/company-profile.pdf',
    tag: 'PDF Brochure',
  },
  {
    title: 'Saudi Commercial Registration (CR) & Licensing',
    titleAr: 'السجل التجاري والتراخيص النظامية بالمملكة',
    desc: 'Fully accredited and certified by the Saudi Ministry of Commerce for contracting, general trading, and import/export.',
    descAr: 'تراخيص معتمدة وسارية من وزارة التجارة والاستثمار للمقاولات العامة والتجارة والاستيراد.',
    file: '#',
    tag: 'Certified License',
  },
  {
    title: 'Saudi Contractors Authority (SCA) Membership',
    titleAr: 'عضوية الهيئة السعودية للمقاولين',
    desc: 'Classified commercial contractor complying with high industry classification and technical governance standards.',
    descAr: 'عضوية وتصنيف معتمد لدى الهيئة السعودية للمقاولين لمشاريع البناء والتشييد.',
    file: '#',
    tag: 'Accreditation',
  },
  {
    title: 'ZATCA Tax & VAT Compliance Certificate',
    titleAr: 'شهادة الالتزام الضريبي والزكاة (هيئة الزكاة والضريبة والجمارك)',
    desc: 'Full tax, customs, and electronic invoicing compliance certified by ZATCA.',
    descAr: 'شهادة تسجيل وضريبة القيمة المضافة والفوترة الإلكترونية المعتمدة.',
    file: '#',
    tag: 'Tax Compliance',
  },
]

export default function Compliance() {
  return (
    <div className="py-16 md:py-24 bg-gray-50/50">
      <Container>
        <SectionTitle
          eyebrow="Trust & Governance"
          eyebrowAr="الحوكمة والالتزام النظامي"
          title="Compliance, Licenses & Certifications"
          titleAr="الالتزام النظامي، الشهادات والتراخيص الرسمية"
          subtitle="Operating under full compliance with the laws, safety protocols, and commercial regulations of the Kingdom of Saudi Arabia."
          subtitleAr="نعمل وفق التزام تام بالقوانين والأنظمة المعمول بها ومعايير الجودة والسلامة في المملكة العربية السعودية."
        />

        <div className="max-w-3xl mx-auto space-y-5 mt-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0 group-hover:bg-benaa group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-majd/10 text-majd-dark text-[11px] font-bold mb-1.5">
                    {item.tag}
                  </div>
                  <h3 className="font-bold text-benaa text-lg leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-bold text-sm text-gray-700 font-arabic mt-0.5">
                    {item.titleAr}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="text-[11px] text-gray-500 font-arabic mt-1 leading-relaxed">
                    {item.descAr}
                  </p>
                </div>
              </div>

              <a
                href={item.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-benaa/5 hover:bg-benaa hover:text-white text-benaa font-bold text-xs transition-all flex-shrink-0 border border-benaa/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Document</span>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

