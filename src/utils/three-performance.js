/**
 * =======================================================================
 * THREE.JS PERFORMANCE & ACCESSIBILITY HELPER UTILITIES
 * =======================================================================
 * Manages:
 * 1. prefers-reduced-motion detection
 * 2. Mobile/low-power capability checks
 * 3. Viewport IntersectionObserver (pause render loop when offscreen)
 * 4. Standardized animation speeds and damping factors
 * 5. Universal WebGL resource disposal
 */

export const THREE_TIMING = {
  ROTATION_SLOW: 0.002,
  ROTATION_NORMAL: 0.005,
  DAMPING_FACTOR: 0.04,
  FLOAT_SPEED: 0.015,
  PULSE_SPEED: 2.0,
}

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024)
}

/**
 * Standardized Pixel Ratio calculation:
 * Mobile cap: 1.5 (prevents GPU thermal throttling on high-DPI retina mobile)
 * Desktop cap: 2.0 (crisp retina rendering without wasted shader cycles on 3x/4x screens)
 */
export const getStandardPixelRatio = () => {
  if (typeof window === 'undefined') return 1
  const isMobile = isMobileDevice()
  return Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0)
}

/**
 * Creates an IntersectionObserver that pauses animation when canvas is not visible
 * and resumes when visible in viewport.
 */
export const createViewportObserver = (element, onVisibilityChange) => {
  if (typeof IntersectionObserver === 'undefined' || !element) {
    return { disconnect: () => {} }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        onVisibilityChange(entry.isIntersecting)
      })
    },
    { threshold: 0.05 }
  )

  observer.observe(element)
  return observer
}

/**
 * Universal safe disposal of Three.js object hierarchy
 */
export const disposeObject3D = (object) => {
  if (!object) return

  if (object.geometry) {
    object.geometry.dispose()
  }

  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach((mat) => {
        if (mat.map) mat.map.dispose()
        mat.dispose()
      })
    } else {
      if (object.material.map) object.material.map.dispose()
      object.material.dispose()
    }
  }

  if (object.children && object.children.length > 0) {
    object.children.forEach((child) => disposeObject3D(child))
  }
}
