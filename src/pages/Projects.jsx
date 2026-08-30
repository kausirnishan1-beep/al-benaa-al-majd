import { useState, useMemo } from 'react'
import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'
import ProjectFilter from '../components/projects/ProjectFilter.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [active, setActive] = useState('all')
  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [])
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Our Work & Deliveries"
          eyebrowAr="سجل الإنجاز والمشاريع"
          title="All Projects & Supply Contracts"
          titleAr="كافة المشاريع وعقود التوريد"
          subtitle="A showcase of delivered construction excellence and international trade shipments across Saudi Arabia."
          subtitleAr="استعراض لأبرز المشاريع الإنشائية المنجزة وعقود التوريد التجاري المكتملة في المملكة."
        />
        <ProjectFilter categories={categories} active={active} onChange={setActive} />
        <ProjectGrid projects={filtered} />
      </Container>
    </div>
  )
}

