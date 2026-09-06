import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import ContactInfo from '../components/contact/ContactInfo.jsx'
import Map from '../components/contact/Map.jsx'
import SEO from '../components/common/SEO.jsx'

export default function Contact() {
  return (
    <div className="py-16 md:py-24 bg-gray-50/40">
      <SEO
        title="Contact Us | Headquarters & Inquiries"
        description="Contact AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT - Riyadh headquarters, phone, email, and project quotation requests."
        canonicalPath="/contact"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="Connect With Our Team"
          eyebrowAr="تواصل مع فريقنا المتخصص"
          title="Get In Touch / Request a Quotation"
          titleAr="تواصل معنا واطلب عرض سعر لمشروعك"
          subtitle="Our Riyadh headquarters and consulting teams are ready to discuss your contracting and trade requirements."
          subtitleAr="فريقنا الاستشاري ومقرنا بالرياض على أتم الاستعداد لمناقشة كافة متطلباتكم ومشاريعكم."
        />
        <div className="grid md:grid-cols-2 gap-12 mt-10">
          <ContactForm />
          <div className="space-y-8">
            <ContactInfo />
            <Map />
          </div>
        </div>
      </Container>
    </div>
  )
}

