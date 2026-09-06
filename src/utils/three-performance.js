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
 * 3-Tier Adaptive Quality Strategy:
 * - 'desktop' (width >= 1024px): High quality, 100% particles, high geo detail, 2048px shadow map
 * - 'tablet' (768px <= width < 1024px): Medium quality, 60% particles, balanced geo, 1024px shadow map
 * - 'mobile' (width < 768px): Optimized/Low tier, 30% particles, low geo segments, disabled shadows
 */
export const getDeviceTier = () => {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Returns calibrated performance parameters for each 3D scene based on the 3-tier device profile
 */
export const getAdaptiveConfig = () => {
  const tier = getDeviceTier()

  if (tier === 'mobile') {
    return {
      tier: 'mobile',
      particleCount: 25,
      globeSegments: 24,
      networkNodes: 16,
      networkArcs: 10,
      shadowMapSize: 0,
      enableShadows: false,
      enableAntialias: false,
      pixelRatioCap: 1.5,
      torusSegments: { radial: 12, tubular: 36 },
      gridDivisions: 12,
    }
  }

  if (tier === 'tablet') {
    return {
      tier: 'tablet',
      particleCount: 50,
      globeSegments: 32,
      networkNodes: 22,
      networkArcs: 16,
      shadowMapSize: 1024,
      enableShadows: true,
      enableAntialias: true,
      pixelRatioCap: 1.75,
      torusSegments: { radial: 16, tubular: 56 },
      gridDivisions: 14,
    }
  }

  // Desktop (High Quality)
  return {
    tier: 'desktop',
    particleCount: 100,
    globeSegments: 48,
    networkNodes: 28,
    networkArcs: 22,
    shadowMapSize: 2048,
    enableShadows: true,
    enableAntialias: true,
    pixelRatioCap: 2.0,
    torusSegments: { radial: 16, tubular: 80 },
    gridDivisions: 16,
  }
}

/**
 * Standardized Pixel Ratio calculation with adaptive device tier capping:
 * Mobile: <= 1.5
 * Tablet: <= 1.75
 * Desktop: <= 2.0
 */
export const getStandardPixelRatio = () => {
  if (typeof window === 'undefined') return 1
  const config = getAdaptiveConfig()
  return Math.min(window.devicePixelRatio || 1, config.pixelRatioCap)
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

/**
 * Standardized GLTF Loader with Google Draco Mesh Compression Support
 * Allows loading compressed .glb models with small wire-transfer sizes & fast unpack
 */
export const createStandardGLTFLoader = (GLTFLoaderClass, DRACOLoaderClass) => {
  const loader = new GLTFLoaderClass()
  if (DRACOLoaderClass) {
    const dracoLoader = new DRACOLoaderClass()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    loader.setDRACOLoader(dracoLoader)
  }
  return loader
}
