import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import BenaaCard from '../components/companies/BenaaCard.jsx'
import MajdCard from '../components/companies/MajdCard.jsx'
import SEO from '../components/common/SEO.jsx'
import { useCompanies } from '../hooks/useCompanies.js'

export default function CompaniesPage() {
  const { companies, getCompany } = useCompanies()
  const benaa = getCompany('benaa') || companies[0]
  const majd = getCompany('majd') || companies[1]

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="Our Establishments & Divisions | AL BENAA & AL MAJD"
        description="Explore the core establishments of our corporate alliance: AL BENAA AL RAHAB CONTRACTING EST. and AL MAJD LINES FOR TRADE & IMPORT."
        canonicalPath="/companies"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="Our Group Structure"
          eyebrowAr="الهيكل المؤسسي للمجموعة"
          title="Explore Our Core Establishments"
          titleAr="تعرف على مؤسساتنا المتخصصة"
          subtitle="Operating synchronously to provide construction contracting and global supply chain execution."
          subtitleAr="مؤسستان تعملان بتكامل لتقديم حلول إنشائية وتجارية ولوجستية متكاملة."
        />
        {companies.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 mt-10">
            <p className="text-gray-600 font-bold text-sm">Company profiles are currently being updated.</p>
            <p className="text-gray-400 text-xs font-arabic mt-1">جاري تحديث ملفات الشركات حالياً.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {benaa && <BenaaCard data={benaa} />}
            {majd && <MajdCard data={majd} />}
          </div>
        )}
      </Container>
    </div>
  )
}

