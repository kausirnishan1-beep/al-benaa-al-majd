import React, { useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import EmptyState from '../common/EmptyState.jsx'
import Modal from '../common/Modal.jsx'
import Button from '../common/Button.jsx'
import OptimizedImage from '../common/OptimizedImage.jsx'
import Badge from '../common/Badge.jsx'
import { MapPin, Calendar, CheckCircle2, MessageSquare } from 'lucide-react'

export default function ProjectGrid({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null)

  if (!projects?.length) {
    return (
      <EmptyState
        title="No projects currently found"
        description="There are no projects matching this category at the moment. Please select another filter or check back soon."
        className="my-8"
      />
    )
  }

  const isBenaa = selectedProject?.company === 'benaa'

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onSelect={setSelectedProject} />
        ))}
      </div>

      {/* Project Details Modal */}
      <Modal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        subtitle={selectedProject?.titleAr}
        maxWidth="max-w-2xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
              <OptimizedImage
                src={selectedProject.image}
                alt={selectedProject.title}
                aspectRatio="16/9"
                className="w-full h-full object-cover"
                fallbackText={selectedProject.title}
              />
              <div className="absolute top-3 right-3">
                <Badge variant={isBenaa ? 'benaa' : 'majd'} size="sm">
                  {selectedProject.badge || (isBenaa ? 'Al-Benaa' : 'Al-Majd')}
                </Badge>
              </div>
            </div>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="font-semibold text-gray-800 capitalize">
                Category: {selectedProject.category}
              </span>
              {selectedProject.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {selectedProject.location}
                </span>
              )}
              {selectedProject.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {selectedProject.year}
                </span>
              )}
              {selectedProject.status && (
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedProject.status}
                </span>
              )}
            </div>

            {/* Description Details */}
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>{selectedProject.description}</p>
              {selectedProject.descriptionAr && (
                <p className="font-arabic text-gray-600 text-xs sm:text-sm">
                  {selectedProject.descriptionAr}
                </p>
              )}
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-500">Interested in a similar project?</span>
              <Button
                to={`/contact?subject=Inquiry%20Regarding%20${encodeURIComponent(
                  selectedProject.title
                )}`}
                variant="primary"
                size="sm"
                icon={MessageSquare}
                className="w-full sm:w-auto"
                onClick={() => setSelectedProject(null)}
              >
                Inquire About Similar Project / طلب استشارة
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
