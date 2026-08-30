import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ProjectGrid from '../../components/projects/ProjectGrid.jsx'
import { projects } from '../../data/projects.js'

export default function BenaaProjects() {
  const benaaProjects = projects.filter((p) => p.company === 'benaa')

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Al-Benaa Construction Portfolio"
          eyebrowAr="سجل أعمال ومشاريع شركة البناء"
          title="Civil & Architectural Projects"
          titleAr="المشاريع الإنشائية والمعمارية المنفذة"
          subtitle="Discover our track record of residential developments, commercial centers, and engineering milestones."
          subtitleAr="استعرض مشاريعنا السكنية والتجارية والإنشائية المنفذة بأعلى معايير الجودة في المملكة."
        />
        <div className="mt-10">
          <ProjectGrid projects={benaaProjects} />
        </div>
      </Container>
    </div>
  )
}

