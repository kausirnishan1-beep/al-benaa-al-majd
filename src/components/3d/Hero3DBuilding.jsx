import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { THREE_COLORS } from '../../utils/three-colors.js'
import {
  THREE_TIMING,
  isReducedMotion,
  isMobileDevice,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'

/**
 * Helper to construct a rounded box/slab geometry with curved architectural corners
 */
function createRoundedSlabGeometry(width, height, depth, radius, smoothness = 8) {
  const shape = new THREE.Shape()
  const eps = 0.00001
  const halfW = width / 2 - radius
  const halfD = depth / 2 - radius

  shape.absarc(halfW, halfD, radius, 0, Math.PI / 2, false)
  shape.absarc(-halfW, halfD, radius, Math.PI / 2, Math.PI, false)
  shape.absarc(-halfW, -halfD, radius, Math.PI, Math.PI * 1.5, false)
  shape.absarc(halfW, -halfD, radius, Math.PI * 1.5, Math.PI * 2, false)

  const extrudeSettings = {
    steps: 1,
    depth: height - eps,
    bevelEnabled: true,
    bevelSegments: smoothness,
    bevelSize: Math.min(radius * 0.15, 0.05),
    bevelThickness: Math.min(radius * 0.15, 0.05),
    curveSegments: smoothness,
  }

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geometry.center()
  // Rotate so extrude height is along Y axis
  geometry.rotateX(Math.PI / 2)
  return geometry
}

export default function Hero3DBuilding() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    // ----------------------------------------------------------------
    // 1. Scene, Camera & Renderer
    // ----------------------------------------------------------------
    const scene = new THREE.Scene()

    // Low-angle perspective camera for powerful architectural presence
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    const defaultCameraZ = isMobile ? 13.5 : 11.2
    camera.position.set(2.8, 1.2, defaultCameraZ)
    camera.lookAt(0, 0.4, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Master Pivot Group
    const buildingMaster = new THREE.Group()
    scene.add(buildingMaster)

    // Center pivot slightly
    buildingMaster.position.set(0, -0.6, 0)

    // ----------------------------------------------------------------
    // 2. Realistic Architectural Materials
    // ----------------------------------------------------------------
    // High-specular reflective curved architectural glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2dd4bf,
      emissive: 0x06241b,
      emissiveIntensity: 0.25,
      metalness: 0.95,
      roughness: 0.04,
      transmission: 0.65,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.98,
    })

    // Matte dark ribbed metal louvers / architectural fascia band
    const darkMetalFasciaMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.32,
    })

    // Architectural reinforced concrete for pilotis/stilts
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      roughness: 0.82,
      metalness: 0.08,
    })

    // Warm interior ceiling slab with architectural lighting
    const interiorFloorMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0xd4a017,
      emissiveIntensity: 0.35,
      roughness: 0.4,
    })

    // Architectural window mullions (black aluminum)
    const mullionMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.9,
      roughness: 0.25,
    })

    // Ground paved courtyard slab
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.9,
      metalness: 0.1,
    })

    // ----------------------------------------------------------------
    // 3. Ground Paved Plaza & Shadow
    // ----------------------------------------------------------------
    const groundGeo = new THREE.PlaneGeometry(16, 16)
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1.65
    buildingMaster.add(ground)

    // Ground Pavement Grid Markings
    const plazaGrid = new THREE.GridHelper(14, 14, 0x374151, 0x111827)
    plazaGrid.position.y = -1.64
    buildingMaster.add(plazaGrid)

    // Soft Contact Shadow Plane under pilotis
    const shadowCanvas = document.createElement('canvas')
    shadowCanvas.width = 128
    shadowCanvas.height = 128
    const sCtx = shadowCanvas.getContext('2d')
    const gradient = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)')
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    sCtx.fillStyle = gradient
    sCtx.fillRect(0, 0, 128, 128)

    const shadowTex = new THREE.CanvasTexture(shadowCanvas)
    const shadowGeo = new THREE.PlaneGeometry(8.5, 6.5)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.set(0.4, -1.63, 0)
    buildingMaster.add(shadowMesh)

    // ----------------------------------------------------------------
    // 4. Concrete Pilotis (Stilts supporting the elevated pavilion)
    // ----------------------------------------------------------------
    const pilotisGroup = new THREE.Group()
    buildingMaster.add(pilotisGroup)

    const columnGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.45, 16)
    const columnPositions = [
      // Front row
      [-2.4, -0.92, 1.4],
      [-1.2, -0.92, 1.4],
      [0.0, -0.92, 1.4],
      [1.2, -0.92, 1.4],
      [2.4, -0.92, 1.4],
      // Middle row
      [-2.4, -0.92, 0.0],
      [-1.2, -0.92, 0.0],
      [0.0, -0.92, 0.0],
      [1.2, -0.92, 0.0],
      [2.4, -0.92, 0.0],
      // Back row
      [-2.4, -0.92, -1.4],
      [-1.2, -0.92, -1.4],
      [0.0, -0.92, -1.4],
      [1.2, -0.92, -1.4],
      [2.4, -0.92, -1.4],
    ]

    columnPositions.forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(columnGeo, concreteMat)
      col.position.set(cx, cy, cz)
      pilotisGroup.add(col)
    })

    // Ground Entrance Core / Utility Volume
    const coreGeo = new THREE.BoxGeometry(1.6, 1.45, 1.6)
    const coreMesh = new THREE.Mesh(coreGeo, concreteMat)
    coreMesh.position.set(-1.0, -0.92, -0.3)
    pilotisGroup.add(coreMesh)

    // ----------------------------------------------------------------
    // 5. Cantilevered Pavilion Architecture (Rounded Curved Glass Volumes)
    // ----------------------------------------------------------------
    const pavilionGroup = new THREE.Group()
    buildingMaster.add(pavilionGroup)

    // --- LEVEL 1 (Lower Floating Glass Pavilion) ---
    // Floor 1 Soffit / Base Slab with rounded corners
    const baseSlabGeo = createRoundedSlabGeometry(6.2, 0.22, 3.8, 0.9)
    const baseSlab = new THREE.Mesh(baseSlabGeo, darkMetalFasciaMat)
    baseSlab.position.set(0, -0.1, 0)
    pavilionGroup.add(baseSlab)

    // Level 1 Glass Enclosure
    const l1GlassGeo = createRoundedSlabGeometry(6.0, 1.35, 3.6, 0.85)
    const l1Glass = new THREE.Mesh(l1GlassGeo, glassMaterial)
    l1Glass.position.set(0, 0.65, 0)
    pavilionGroup.add(l1Glass)

    // Level 1 Interior Floor Plate
    const l1InteriorGeo = createRoundedSlabGeometry(5.6, 0.08, 3.2, 0.75)
    const l1Interior = new THREE.Mesh(l1InteriorGeo, interiorFloorMat)
    l1Interior.position.set(0, 0.05, 0)
    pavilionGroup.add(l1Interior)

    // Level 1 Vertical Structural Mullions
    for (let mx = -2.6; mx <= 2.6; mx += 0.86) {
      const mullionFrontGeo = new THREE.BoxGeometry(0.04, 1.35, 0.06)
      const mf = new THREE.Mesh(mullionFrontGeo, mullionMat)
      mf.position.set(mx, 0.65, 1.8)
      pavilionGroup.add(mf)

      const mb = new THREE.Mesh(mullionFrontGeo, mullionMat)
      mb.position.set(mx, 0.65, -1.8)
      pavilionGroup.add(mb)
    }

    // --- MID FASCIA LOUVERS (Iconic Black Ribbed Horizontal Band) ---
    const midFasciaGeo = createRoundedSlabGeometry(6.3, 0.35, 3.9, 0.95)
    const midFascia = new THREE.Mesh(midFasciaGeo, darkMetalFasciaMat)
    midFascia.position.set(0, 1.45, 0)
    pavilionGroup.add(midFascia)

    // Horizontal Accent Trim Ribs around mid fascia
    for (let ry = 1.35; ry <= 1.55; ry += 0.09) {
      const ribGeo = createRoundedSlabGeometry(6.34, 0.02, 3.94, 0.97)
      const rib = new THREE.Mesh(ribGeo, mullionMat)
      rib.position.set(0, ry, 0)
      pavilionGroup.add(rib)
    }

    // --- LEVEL 2 (Upper Stepped Glass Pavilion) ---
    const l2GlassGeo = createRoundedSlabGeometry(5.8, 1.35, 3.5, 0.85)
    const l2Glass = new THREE.Mesh(l2GlassGeo, glassMaterial)
    l2Glass.position.set(-0.1, 2.25, -0.05)
    pavilionGroup.add(l2Glass)

    // Level 2 Interior Floor Slab
    const l2InteriorGeo = createRoundedSlabGeometry(5.4, 0.08, 3.1, 0.75)
    const l2Interior = new THREE.Mesh(l2InteriorGeo, interiorFloorMat)
    l2Interior.position.set(-0.1, 1.65, -0.05)
    pavilionGroup.add(l2Interior)

    // Level 2 Mullions
    for (let mx = -2.4; mx <= 2.4; mx += 0.8) {
      const mullionGeo = new THREE.BoxGeometry(0.04, 1.35, 0.06)
      const mf2 = new THREE.Mesh(mullionGeo, mullionMat)
      mf2.position.set(mx - 0.1, 2.25, 1.7)
      pavilionGroup.add(mf2)
    }

    // --- ROOF SLAB & TOP FASCIA CAP ---
    const roofSlabGeo = createRoundedSlabGeometry(6.0, 0.28, 3.7, 0.9)
    const roofSlab = new THREE.Mesh(roofSlabGeo, darkMetalFasciaMat)
    roofSlab.position.set(-0.1, 3.02, -0.05)
    pavilionGroup.add(roofSlab)

    // Roof Ribbed Trim Accent
    for (let ry = 2.94; ry <= 3.1; ry += 0.08) {
      const roofRibGeo = createRoundedSlabGeometry(6.04, 0.02, 3.74, 0.92)
      const roofRib = new THREE.Mesh(roofRibGeo, mullionMat)
      roofRib.position.set(-0.1, ry, -0.05)
      pavilionGroup.add(roofRib)
    }

    // Subtle Brand Accent Beacon on Top Right
    const beaconGeo = new THREE.SphereGeometry(0.08, 12, 12)
    const beaconMat = new THREE.MeshBasicMaterial({ color: THREE_COLORS.MAJD.light })
    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.set(2.6, 3.25, 1.4)
    pavilionGroup.add(beacon)

    // ----------------------------------------------------------------
    // 6. Natural Outdoor HDRI & Directional Lighting
    // ----------------------------------------------------------------
    // Sky Ambient Light (Natural Daylight)
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.4)
    scene.add(hemiLight)

    // Directional Sun Light (High Angle)
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.4)
    sunLight.position.set(6, 10, 8)
    scene.add(sunLight)

    // Back Sun Rim Light (for glass edge sparkle)
    const rimLight = new THREE.DirectionalLight(0xa5f3fc, 1.8)
    rimLight.position.set(-8, 6, -6)
    scene.add(rimLight)

    // Brand Soft Ambient Bounce Lights
    const benaaBounce = new THREE.PointLight(0x0f4c3a, 2.0, 15)
    benaaBounce.position.set(-3, -0.5, 3)
    scene.add(benaaBounce)

    const majdBounce = new THREE.PointLight(0xd4a017, 1.6, 15)
    majdBounce.position.set(4, 2, 2)
    scene.add(majdBounce)

    // ----------------------------------------------------------------
    // 7. Interaction: Mouse Parallax, Scroll Zoom & Raycasting
    // ----------------------------------------------------------------
    let targetRotY = -0.35 // Initial angled view of the curved corner
    let targetRotX = 0.06
    let targetCameraZ = defaultCameraZ
    let isVisible = true

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      mouse.x = x
      mouse.y = y

      // Subtle rotation around building
      targetRotY = -0.35 + x * 0.42
      targetRotX = 0.06 - y * 0.18
    }

    const onScroll = () => {
      if (reducedMotion) return
      const scrollPercent = Math.min(window.scrollY / 600, 1)
      // Slight dolly zoom in on scroll down
      targetCameraZ = defaultCameraZ - scrollPercent * 1.5
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const viewportObserver = createViewportObserver(container, (visible) => {
      isVisible = visible
    })

    // ----------------------------------------------------------------
    // 8. Animation Render Loop (60 FPS Target)
    // ----------------------------------------------------------------
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        // Smooth rotational physics interpolation
        buildingMaster.rotation.y +=
          (targetRotY - buildingMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        buildingMaster.rotation.x +=
          (targetRotX - buildingMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Idle micro-float floating breath
        buildingMaster.position.y = -0.6 + Math.sin(t * 0.8) * 0.04

        // Camera dolly zoom smoothing
        camera.position.z += (targetCameraZ - camera.position.z) * 0.06

        // Beacon pulsing
        const pulse = (Math.sin(t * 3.0) + 1) / 2
        beaconMat.color.setRGB(0.83 + pulse * 0.17, 0.63 + pulse * 0.25, 0.09)

        // Raycasting for subtle glass glint response
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects([l1Glass, l2Glass])
        if (intersects.length > 0) {
          glassMaterial.emissiveIntensity = 0.45
        } else {
          glassMaterial.emissiveIntensity = 0.25
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 9. Resize Handling & Responsive Canvas
    // ----------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)

    // ----------------------------------------------------------------
    // 10. Complete Resource Cleanup on Unmount
    // ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      viewportObserver.disconnect()
      ro.disconnect()

      disposeObject3D(scene)
      renderer.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative w-full h-full min-h-[420px] lg:min-h-[500px] flex items-center justify-center select-none"
    >
      {/* 3D Ambient Depth Brand Glow (#0F4C3A, #D4A017, #2DD4BF) */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#0F4C3A]/25 via-[#2DD4BF]/10 to-[#D4A017]/15 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] bg-slate-950/80 backdrop-blur-[2px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Real Corporate Building Model"
      />
    </motion.div>
  )
}
