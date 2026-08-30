import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import BenaaCard from '../components/companies/BenaaCard.jsx'
import MajdCard from '../components/companies/MajdCard.jsx'
import { companies } from '../data/companies.js'

export default function CompaniesPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Our Group Structure"
          eyebrowAr="الهيكل المؤسسي للمجموعة"
          title="Explore Our Core Divisions"
          titleAr="تعرف على شركاتنا المتخصصة"
          subtitle="Specialized market leaders operating synchronously to provide complete contracting and global supply chain execution."
          subtitleAr="شركتان رائدتان تعملان بتكامل لتقديم حلول إنشائية وتجارية ولوجستية متكاملة."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <BenaaCard data={companies[0]} />
          <MajdCard data={companies[1]} />
        </div>
      </Container>
    </div>
  )
}

