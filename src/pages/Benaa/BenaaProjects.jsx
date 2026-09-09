import React from 'react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ProjectGrid from '../../components/projects/ProjectGrid.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import SEO from '../../components/common/SEO.jsx'
import { useProjects } from '../../admin/hooks/useProjects.js'

export default function BenaaProjects() {
  const { projects } = useProjects()
  const benaaProjects = projects.filter((p) => p.company === 'benaa')

  const breadcrumbs = [
    { label: 'Al-Benaa Contracting', to: '/benaa' },
    { label: 'Civil & Architectural Projects' },
  ]

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Civil & Architectural Projects | AL BENAA"
        description="Delivered residential compounds, commercial towers, and civil engineering projects by AL BENAA AL RAHAB CONTRACTING EST. across Saudi Arabia."
        canonicalPath="/benaa/projects"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

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
