import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ProjectGrid from '../../components/projects/ProjectGrid.jsx'
import { projects } from '../../data/projects.js'

export default function BenaaProjects() {
  const benaaProjects = projects.filter((p) => p.company === 'benaa')

  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="شركة البناء" title="مشاريعنا" />
        <ProjectGrid projects={benaaProjects} />
      </Container>
    </section>
  )
}
