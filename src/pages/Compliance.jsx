import { ShieldCheck, Download } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import SEO from '../components/common/SEO.jsx'
import { useDocuments } from '../admin/hooks/useDocuments.js'

export default function Compliance() {
  const { documents } = useDocuments()

  return (
    <div className="py-16 md:py-24 bg-gray-50/50">
      <SEO
        title="Compliance, Licenses & Certifications | AL BENAA & AL MAJD"
        description="Official commercial registrations, compliance certificates, and governance documentation for AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT in Saudi Arabia."
        canonicalPath="/compliance"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="Trust & Governance"
          eyebrowAr="الحوكمة والالتزام النظامي"
          title="Compliance, Licenses & Certifications"
          titleAr="الالتزام النظامي، الشهادات والتراخيص الرسمية"
          subtitle="Operating in compliance with the laws, safety protocols, and commercial regulations of Saudi Arabia."
          subtitleAr="نعمل وفق التزام تام بالقوانين والأنظمة المعمول بها ومعايير الجودة والسلامة في المملكة العربية السعودية."
        />

        {documents.length === 0 ? (
          <div className="max-w-3xl mx-auto py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 mt-10 shadow-sm">
            <p className="text-gray-600 font-bold text-sm">No compliance certificates or documents currently published.</p>
            <p className="text-gray-400 text-xs font-arabic mt-1">لا توجد مستندات أو شهادات منشورة حالياً.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5 mt-10">
          {documents.map((item) => (
            <div
              key={item.id || item.title}
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
                    {item.description}
                  </p>
                  <p className="text-[11px] text-gray-500 font-arabic mt-1 leading-relaxed">
                    {item.descriptionAr}
                  </p>
                </div>
              </div>

              <a
                href={item.fileUrl || '#'}
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
        )}
      </Container>
    </div>
  )
}


