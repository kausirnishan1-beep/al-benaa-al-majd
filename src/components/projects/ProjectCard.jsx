import { motion } from 'framer-motion'
import { Building, ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 flex flex-col group"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-benaa text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {project.badge || (project.company === 'benaa' ? 'شركة البناء' : 'شركة المجد')}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-benaa text-lg group-hover:text-majd transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize">{project.category}</span>
          <span className="text-benaa font-medium flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
            تفاصيل المشروع <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

