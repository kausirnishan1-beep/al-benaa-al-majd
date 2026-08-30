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
          {project.badge || (project.company === 'benaa' ? 'Al-Benaa' : 'Al-Majd')}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-benaa text-lg group-hover:text-majd transition-colors leading-snug">
          {project.title}
        </h3>
        {project.titleAr && (
          <p className="font-semibold text-sm text-gray-700 font-arabic mt-1">
            {project.titleAr}
          </p>
        )}
        <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>
        {project.descriptionAr && (
          <p className="text-[11px] text-gray-500 font-arabic mt-1 line-clamp-1 leading-relaxed">
            {project.descriptionAr}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize font-medium">{project.category}</span>
          <span className="text-benaa font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}


