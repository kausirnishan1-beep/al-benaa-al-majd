import { companies } from '../../data/companies.js'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import BenaaCard from '../companies/BenaaCard.jsx'
import MajdCard from '../companies/MajdCard.jsx'

export default function Companies() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="شركاتنا" title="مظلة واحدة، تخصصان" />
        <div className="grid md:grid-cols-2 gap-8">
          <BenaaCard data={companies[0]} />
          <MajdCard data={companies[1]} />
        </div>
      </Container>
    </section>
  )
}
