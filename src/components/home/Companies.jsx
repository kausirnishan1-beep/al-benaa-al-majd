import { companies } from '../../data/companies.js'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import BenaaCard from '../companies/BenaaCard.jsx'
import MajdCard from '../companies/MajdCard.jsx'

export default function Companies() {
  return (
    <section className="section-container py-20">
      <Container>
        <SectionTitle
          eyebrow="Our Corporate Subsidiaries"
          eyebrowAr="شركات المجموعة"
          title="One Group, Two Industry Leaders"
          titleAr="مظلة واحدة، تخصصان رائدان"
          subtitle="Discover our specialized divisions delivering contracting engineering and global commerce excellence."
          subtitleAr="تعرف على شركاتنا المتخصصة في مجالات المقاولات الإنشائية والتجارة واللوجستيات الدولية."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <BenaaCard data={companies[0]} />
          <MajdCard data={companies[1]} />
        </div>
      </Container>
    </section>
  )
}

