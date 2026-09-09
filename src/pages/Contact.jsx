import React from 'react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import Breadcrumb from '../components/common/Breadcrumb.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import ContactInfo from '../components/contact/ContactInfo.jsx'
import Map from '../components/contact/Map.jsx'
import SEO from '../components/common/SEO.jsx'

export default function Contact() {
  const breadcrumbs = [{ label: 'Contact & Quotation' }]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Contact Us | Headquarters & Inquiries"
        description="Contact AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT - Riyadh headquarters, phone, email, and project quotation requests."
        canonicalPath="/contact"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="Connect With Our Team"
          eyebrowAr="تواصل مع فريقنا المتخصص"
          title="Get In Touch / Request a Quotation"
          titleAr="تواصل معنا واطلب عرض سعر لمشروعك"
          subtitle="Our Riyadh headquarters and consulting teams are ready to discuss your contracting and trade requirements."
          subtitleAr="فريقنا الاستشاري ومقرنا بالرياض على أتم الاستعداد لمناقشة كافة متطلباتكم ومشاريعكم."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <ContactInfo />
            <Map />
          </div>
        </div>
      </Container>
    </div>
  )
}
