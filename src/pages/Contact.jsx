import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import ContactInfo from '../components/contact/ContactInfo.jsx'
import Map from '../components/contact/Map.jsx'

export default function Contact() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="تواصل معنا" title="نحن هنا لمساعدتك" />
        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <div className="space-y-8">
            <ContactInfo />
            <Map />
          </div>
        </div>
      </Container>
    </section>
  )
}
