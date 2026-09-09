import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import OptimizedImage from '../common/OptimizedImage.jsx'
import Badge from '../common/Badge.jsx'

export default function ProjectCard({ project, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotX = -((y - centerY) / centerY) * 6
    const rotY = ((x - centerX) / centerX) * 6
    setTilt({ x: rotX, y: rotY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const isBenaa = project.company === 'benaa'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(project)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl bg-white border border-gray-100 flex flex-col group relative will-change-transform cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          aspectRatio="16/9"
          className="group-hover:scale-105 transition-transform duration-500 w-full h-full object-cover"
          fallbackText={project.title}
        />
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant={isBenaa ? 'benaa' : 'majd'}
            size="sm"
            className="bg-white/95 backdrop-blur-sm shadow-sm"
          >
            {project.badge || (isBenaa ? 'Al-Benaa' : 'Al-Majd')}
          </Badge>
        </div>

        {project.status && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-black/70 text-white backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {project.status}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-benaa transition-colors leading-snug">
          {project.title}
        </h3>
        {project.titleAr && (
          <p className="font-semibold text-xs sm:text-sm text-gray-600 font-arabic mt-1">
            {project.titleAr}
          </p>
        )}

        <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>

        {(project.location || project.year) && (
          <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-500">
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                {project.location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                {project.year}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize font-medium text-gray-600">{project.category}</span>
          <span className="text-benaa font-semibold flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
