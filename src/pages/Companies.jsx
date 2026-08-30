import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import BenaaCard from '../components/companies/BenaaCard.jsx'
import MajdCard from '../components/companies/MajdCard.jsx'
import { companies } from '../data/companies.js'

export default function CompaniesPage() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="شركاتنا" title="تعرف على شركتينا" />
        <div className="grid md:grid-cols-2 gap-8">
          <BenaaCard data={companies[0]} />
          <MajdCard data={companies[1]} />
        </div>
      </Container>
    </section>
  )
}
