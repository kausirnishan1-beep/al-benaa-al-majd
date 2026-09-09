import React from 'react'

export default function LoadingSkeleton({
  variant = 'card',
  count = 1,
  className = '',
}) {
  const renderItem = (index) => {
    switch (variant) {
      case 'text':
        return (
          <div key={index} className="space-y-2.5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
          </div>
        )
      case 'circle':
        return (
          <div key={index} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse shrink-0"></div>
        )
      case 'hero':
        return (
          <div key={index} className="w-full h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
        )
      case 'card':
      default:
        return (
          <div key={index} className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm animate-pulse space-y-4">
            <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded-md w-20"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </div>
  )
}
