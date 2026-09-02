import ProjectCard from './ProjectCard.jsx'

export default function ProjectGrid({ projects }) {
  if (!projects?.length) {
    return (
      <div className="py-16 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 my-8">
        <p className="text-gray-600 font-bold text-sm">No projects currently available.</p>
        <p className="text-gray-400 text-xs font-arabic mt-1">لا توجد مشاريع مضافة حالياً في هذا القسم.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
