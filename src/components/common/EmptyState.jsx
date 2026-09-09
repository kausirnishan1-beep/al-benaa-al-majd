import React from 'react'
import { FolderOpen } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no items matching your criteria at the moment.',
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-gray-50/70 border border-gray-100 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-200/60 flex items-center justify-center text-gray-400 mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      {(actionLabel && (actionTo || onAction)) && (
        <Button
          to={actionTo}
          onClick={onAction}
          variant="primary"
          size="sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
