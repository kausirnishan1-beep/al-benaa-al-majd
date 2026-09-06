import { useState, useMemo } from 'react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'
import ProjectFilter from '../components/projects/ProjectFilter.jsx'
import SEO from '../components/common/SEO.jsx'
import { useProjects } from '../admin/hooks/useProjects.js'

export default function Projects() {
  const { projects } = useProjects()
  const [active, setActive] = useState('all')
  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [projects])
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="Projects & Commercial Portfolio | AL BENAA & AL MAJD"
        description="Delivered construction projects, engineering works, and international commercial supply contracts across Saudi Arabia."
        canonicalPath="/projects"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="Our Work & Deliveries"
          eyebrowAr="سجل الإنجاز والمشاريع"
          title="All Projects & Supply Contracts"
          titleAr="كافة المشاريع وعقود التوريد"
          subtitle="Delivered construction engineering and commercial trade deliveries across Saudi Arabia."
          subtitleAr="استعراض للمشاريع الإنشائية وعقود التوريد التجاري المنجزة في المملكة."
        />
        <ProjectFilter categories={categories} active={active} onChange={setActive} />
        <ProjectGrid projects={filtered} />
      </Container>
    </div>
  )
}


