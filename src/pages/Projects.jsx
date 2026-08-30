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
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="أعمالنا" title="جميع المشاريع" />
        <ProjectFilter categories={categories} active={active} onChange={setActive} />
        <ProjectGrid projects={filtered} />
      </Container>
    </section>
  )
}
