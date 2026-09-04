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
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    const defaultCameraZ = isMobile ? 13.5 : 11.0
    camera.position.set(2.6, 1.1, defaultCameraZ)
    camera.lookAt(0, 0.4, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Master Pivot Group
    const buildingMaster = new THREE.Group()
    scene.add(buildingMaster)
    buildingMaster.position.set(0, -0.6, 0)

    // ----------------------------------------------------------------
    // 2. Natural Sky & Environment Map for Photorealistic Glass Reflection
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    // Natural daylight sky gradient: Deep blue -> Sky blue -> Horizon haze -> Trees / Ground
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0.0, '#1e3a8a') // Zenith deep azure
    skyGrad.addColorStop(0.28, '#3b82f6') // Sky blue
    skyGrad.addColorStop(0.50, '#93c5fd') // Soft sky
    skyGrad.addColorStop(0.56, '#e0f2fe') // Horizon light
    skyGrad.addColorStop(0.59, '#2d5a27') // Natural green tree line
    skyGrad.addColorStop(0.70, '#475569') // Courtyard stone pavement
    skyGrad.addColorStop(1.0, '#1e293b') // Ground shadow
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    // Natural Sunlight Flare in reflection
    const sunGrad = ctx.createRadialGradient(360, 65, 0, 360, 65, 55)
    sunGrad.addColorStop(0, '#ffffff')
    sunGrad.addColorStop(0.2, '#fffbeb')
    sunGrad.addColorStop(0.7, 'rgba(254, 240, 138, 0.4)')
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(300, 10, 120, 110)

    // Subtle soft white cloud streaks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.beginPath()
    ctx.ellipse(160, 80, 90, 16, -0.05, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(340, 100, 120, 20, 0.04, 0, Math.PI * 2)
    ctx.fill()

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    // ----------------------------------------------------------------
    // 3. Realistic Natural Architectural Materials
    // ----------------------------------------------------------------
    // Natural Sky Blue Double-Glazed Architectural Glass (with clear reflection)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xcfe2f3,
      emissive: 0x0c2333,
      emissiveIntensity: 0.12,
      metalness: 0.92,
      roughness: 0.02,
      transmission: 0.55,
      thickness: 1.0,
      ior: 1.52,
      transparent: true,
      opacity: 0.92,
      reflectivity: 1.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.04,
    })

    // Natural Dark Charcoal / Anthracite Architectural Metal Cladding
    const darkMetalFasciaMat = new THREE.MeshStandardMaterial({
      color: 0x1f242b,
      metalness: 0.72,
      roughness: 0.38,
    })

    // Authentic Fair-Faced Reinforced Concrete for Pilotis / Columns
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xd8dbdf,
      roughness: 0.86,
      metalness: 0.04,
    })

    // Natural Warm Interior Ceiling & Floor Slabs (Warm 3000K Lighting)
    const interiorFloorMat = new THREE.MeshStandardMaterial({
      color: 0xfaf5ee,
      emissive: 0xd4a017,
      emissiveIntensity: 0.16,
      roughness: 0.45,
    })

    // Black Anodized Aluminum Mullions
    const mullionMat = new THREE.MeshStandardMaterial({
      color: 0x242930,
      metalness: 0.88,
      roughness: 0.3,
    })

    // Natural Slate Paved Courtyard
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x28303b,
      roughness: 0.88,
      metalness: 0.08,
    })

    // Natural Green Lawn / Landscaping Border
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2d4f29,
      roughness: 0.95,
      metalness: 0.0,
    })

    // ----------------------------------------------------------------
    // 4. Ground Plaza, Landscaping & Soft Shadow
    // ----------------------------------------------------------------
    const groundGeo = new THREE.PlaneGeometry(16, 16)
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1.65
    buildingMaster.add(ground)

    // Side Natural Grass Landscaping Mound (Like the reference photo)
    const grassGeo = new THREE.PlaneGeometry(5.5, 14)
    const grassMesh = new THREE.Mesh(grassGeo, grassMat)
    grassMesh.rotation.x = -Math.PI / 2
    grassMesh.position.set(-5.5, -1.64, 0)
    buildingMaster.add(grassMesh)

    // Ground Pavement Line Markings
    const plazaGrid = new THREE.GridHelper(14, 14, 0x475569, 0x1f2937)
    plazaGrid.position.y = -1.63
    buildingMaster.add(plazaGrid)

    // Soft Contact Shadow Plane under pilotis
    const shadowCanvas = document.createElement('canvas')
    shadowCanvas.width = 128
    shadowCanvas.height = 128
    const sCtx = shadowCanvas.getContext('2d')
    const gradient = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.75)')
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    sCtx.fillStyle = gradient
    sCtx.fillRect(0, 0, 128, 128)

    const shadowTex = new THREE.CanvasTexture(shadowCanvas)
    const shadowGeo = new THREE.PlaneGeometry(8.8, 6.6)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.set(0.4, -1.62, 0)
    buildingMaster.add(shadowMesh)

    // ----------------------------------------------------------------
    // 5. Concrete Pilotis (Stilts supporting the elevated pavilion)
    // ----------------------------------------------------------------
    const pilotisGroup = new THREE.Group()
    buildingMaster.add(pilotisGroup)

    const columnGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.45, 20)
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
    // 6. Cantilevered Pavilion Architecture (Rounded Curved Glass Volumes)
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

    // ----------------------------------------------------------------
    // 7. Natural Outdoor Sunlight & Atmosphere Lighting
    // ----------------------------------------------------------------
    // Sky Ambient Daylight
    const hemiLight = new THREE.HemisphereLight(0xbfdbfe, 0x334155, 1.5)
    scene.add(hemiLight)

    // Direct Warm Natural Sunlight
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.6)
    sunLight.position.set(7, 11, 8)
    scene.add(sunLight)

    // Natural Sky Fill Light
    const skyFillLight = new THREE.DirectionalLight(0x93c5fd, 1.4)
    skyFillLight.position.set(-6, 8, 6)
    scene.add(skyFillLight)

    // Back Glass Rim Sparkle
    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 1.6)
    rimLight.position.set(-8, 6, -7)
    scene.add(rimLight)

    // Subtle Brand Architectural Accent Lighting
    const benaaBounce = new THREE.PointLight(0x0f4c3a, 1.4, 14)
    benaaBounce.position.set(-3, -0.4, 3)
    scene.add(benaaBounce)

    const majdBounce = new THREE.PointLight(0xd4a017, 1.2, 14)
    majdBounce.position.set(4, 2, 2)
    scene.add(majdBounce)

    // ----------------------------------------------------------------
    // 8. Interaction: Mouse Parallax, Scroll Zoom & Raycasting
    // ----------------------------------------------------------------
    let targetRotY = -0.35 // Initial angled perspective view
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

      // Smooth multi-axis rotation
      targetRotY = -0.35 + x * 0.42
      targetRotX = 0.06 - y * 0.18
    }

    const onScroll = () => {
      if (reducedMotion) return
      const scrollPercent = Math.min(window.scrollY / 600, 1)
      targetCameraZ = defaultCameraZ - scrollPercent * 1.5
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const viewportObserver = createViewportObserver(container, (visible) => {
      isVisible = visible
    })

    // ----------------------------------------------------------------
    // 9. Animation Render Loop (60 FPS Target)
    // ----------------------------------------------------------------
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        // Smooth rotational physics
        buildingMaster.rotation.y +=
          (targetRotY - buildingMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        buildingMaster.rotation.x +=
          (targetRotX - buildingMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Idle organic floating motion
        buildingMaster.position.y = -0.6 + Math.sin(t * 0.8) * 0.035

        // Camera dolly zoom smoothing
        camera.position.z += (targetCameraZ - camera.position.z) * 0.06

        // Raycasting for subtle glass glint highlight
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects([l1Glass, l2Glass])
        if (intersects.length > 0) {
          glassMaterial.emissiveIntensity = 0.28
        } else {
          glassMaterial.emissiveIntensity = 0.12
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 10. Resize Handling & Responsive Canvas
    // ----------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)

    // ----------------------------------------------------------------
    // 11. Complete Resource Cleanup on Unmount
    // ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      viewportObserver.disconnect()
      ro.disconnect()

      pmremGenerator.dispose()
      envMapTarget.dispose()
      envTexture.dispose()
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
        className="w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] bg-slate-950/85 backdrop-blur-[2px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Real Corporate Building Model"
      />
    </motion.div>
  )
}
