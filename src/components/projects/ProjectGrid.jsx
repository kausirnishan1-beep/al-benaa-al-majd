import ProjectCard from './ProjectCard.jsx'

export default function ProjectGrid({ projects }) {
  if (!projects?.length) {
    return <p className="text-center text-gray-500">لا توجد مشاريع حالياً.</p>
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
