import SEO from '../components/common/SEO.jsx'
import Hero from '../components/home/Hero.jsx'
import Companies from '../components/home/Companies.jsx'
import SisterCompaniesConnectionSection from '../components/home/SisterCompaniesConnectionSection.jsx'
import ServicesOverview from '../components/home/ServicesOverview.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import BusinessOverview from '../components/home/BusinessOverview.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import CTA from '../components/home/CTA.jsx'

export default function Home() {
  return (
    <>
      <SEO
        title="AL BENAA AL RAHAB & AL MAJD LINES"
        description="AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT - General Construction, Civil Contracting, and Global Trade in Saudi Arabia."
        canonicalPath="/"
      />
      <Hero />
      <Companies />
      <SisterCompaniesConnectionSection />
      <ServicesOverview />
      <WhyChooseUs />
      <BusinessOverview />
      <FeaturedProjects />
      <CTA />
    </>
  )
}
