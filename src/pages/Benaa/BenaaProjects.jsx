import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ProjectGrid from '../../components/projects/ProjectGrid.jsx'
import SEO from '../../components/common/SEO.jsx'
import { useProjects } from '../../admin/hooks/useProjects.js'

export default function BenaaProjects() {
  const { projects } = useProjects()
  const benaaProjects = projects.filter((p) => p.company === 'benaa')

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="Civil & Architectural Projects | AL BENAA"
        description="Delivered residential compounds, commercial towers, and civil engineering projects by AL BENAA AL RAHAB CONTRACTING EST. across Saudi Arabia."
        canonicalPath="/benaa/projects"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="AL BENAA AL RAHAB CONTRACTING EST. Portfolio"
          eyebrowAr="سجل أعمال ومشاريع مؤسسة البناء الرحاب للمقاولات"
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


