import React from 'react'
import { ShieldCheck, Download, FileCheck, ExternalLink, Calendar, Building } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import Breadcrumb from '../components/common/Breadcrumb.jsx'
import Badge from '../components/common/Badge.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import SEO from '../components/common/SEO.jsx'
import { useDocuments } from '../admin/hooks/useDocuments.js'

export default function Compliance() {
  const { documents } = useDocuments()
  const breadcrumbs = [{ label: 'Compliance & Governance' }]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Compliance, Licenses & Certifications | AL BENAA & AL MAJD"
        description="Official commercial registrations, compliance certificates, and governance documentation for AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT in Saudi Arabia."
        canonicalPath="/compliance"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

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
          <EmptyState
            icon={FileCheck}
            title="No Public Certificates Currently Published"
            description="Verified commercial registrations and regulatory licenses are provided during formal contract execution and client prequalification."
            className="max-w-3xl mx-auto my-12 bg-white"
          />
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 mt-10">
            {documents.map((item) => (
              <div
                key={item.id || item.title}
                className="p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4 flex-grow">
                  <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center shrink-0 group-hover:bg-benaa group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="benaa" size="sm">
                        {item.tag || 'Official Certificate'}
                      </Badge>
                      {item.issuingAuthority && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Building className="w-3 h-3 text-gray-400" />
                          {item.issuingAuthority}
                        </span>
                      )}
                      {item.issueDate && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {item.issueDate}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg leading-snug">
                      {item.title}
                    </h3>
                    {item.titleAr && (
                      <p className="font-bold text-xs sm:text-sm text-gray-600 font-arabic">
                        {item.titleAr}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.descriptionAr && (
                      <p className="text-[11px] text-gray-500 font-arabic mt-1 leading-relaxed">
                        {item.descriptionAr}
                      </p>
                    )}
                  </div>
                </div>

                {item.fileUrl && item.fileUrl !== '#' ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-benaa text-white hover:bg-benaa-light font-bold text-xs transition-all shrink-0 shadow-sm hover:shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Document</span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 shrink-0">
                    <FileCheck className="w-4 h-4 text-gray-400" />
                    <span>Verified On-File</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Corporate Legal Footer Note */}
        <div className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl bg-white border border-gray-100 text-xs text-gray-500 leading-relaxed text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-benaa shrink-0" />
            <span>
              All commercial activities are governed by the Ministry of Commerce & Saudi Contractor Authorities.
            </span>
          </div>
          <a
            href="https://mc.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-benaa hover:underline flex items-center gap-1 font-bold shrink-0"
          >
            Saudi Ministry of Commerce <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Container>
    </div>
  )
}
