import { useState } from 'react'

/**
 * OptimizedImage Component
 * Features:
 * - Native lazy loading (`loading="lazy"`) with decoding="async"
 * - Aspect ratio preservation to eliminate Cumulative Layout Shift (CLS)
 * - Smooth skeleton pulse while loading
 * - Graceful fallback on broken image URLs
 * - Support for responsive dimensions and priority images
 */
export default function OptimizedImage({
  src,
  alt = '',
  width,
  height,
  aspectRatio = '16/9',
  className = '',
  containerClassName = '',
  priority = false,
  fallbackText = 'Image not available',
  fallbackIcon = null,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(!src)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}
      style={{
        aspectRatio: aspectRatio || undefined,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      {/* Fallback Display */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-100 text-slate-400">
          {fallbackIcon ? (
            fallbackIcon
          ) : (
            <svg
              className="w-10 h-10 mb-2 stroke-current opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
          <span className="text-xs font-medium">{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  )
}
