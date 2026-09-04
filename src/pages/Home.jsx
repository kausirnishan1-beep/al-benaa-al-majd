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
