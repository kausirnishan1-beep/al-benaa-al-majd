import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { gsap } from '../../utils/gsap-utils.js'
import {
  BRAND_COLORS,
  MATERIAL_COLORS,
  ENVIRONMENT_COLORS,
} from '../../utils/three-colors.js'
import {
  THREE_TIMING,
  isReducedMotion,
  isMobileDevice,
  getStandardPixelRatio,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'

const STAGES = [
  { id: 0, titleEn: 'Foundation', titleAr: 'الأساس', desc: 'Footings & Rebar Grid' },
  { id: 1, titleEn: 'Structure', titleAr: 'الهيكل', desc: 'Concrete Core & Steel Frames' },
  { id: 2, titleEn: 'Construction', titleAr: 'البناء', desc: 'Active Crane & Formwork' },
  { id: 3, titleEn: 'Finished', titleAr: 'المكتمل', desc: 'Glass Curtain & Crown Spire' },
]

export default function BenaaConstruction3D() {
  const containerRef = useRef(null)
  const [activeStage, setActiveStage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const stageGroupsRef = useRef({
    foundation: null,
    structure: null,
    construction: null,
    finished: null,
  })

  // ----------------------------------------------------------------
  // Stage Transition Logic using GSAP
  // ----------------------------------------------------------------
  const applyStageTransition = useCallback((stageIndex) => {
    const { foundation, structure, construction, finished } = stageGroupsRef.current
    if (!foundation || !structure || !construction || !finished) return

    const duration = 0.8
    const ease = 'power2.out'

    // Foundation is always base
    foundation.visible = true

    if (stageIndex === 0) {
      // Stage 0: Foundation only
      gsap.to(structure.scale, { y: 0.001, duration, ease, onComplete: () => { structure.visible = false } })
      gsap.to(construction.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.5, ease, onComplete: () => { construction.visible = false } })
      gsap.to(finished.scale, { y: 0.001, duration: 0.5, ease, onComplete: () => { finished.visible = false } })
    } else if (stageIndex === 1) {
      // Stage 1: Structure (Core + Columns rise)
      structure.visible = true
      gsap.to(structure.scale, { y: 1, duration, ease })
      gsap.to(construction.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.5, ease, onComplete: () => { construction.visible = false } })
      gsap.to(finished.scale, { y: 0.001, duration: 0.5, ease, onComplete: () => { finished.visible = false } })
    } else if (stageIndex === 2) {
      // Stage 2: Active Construction (Structure + Tower Crane + Formwork)
      structure.visible = true
      construction.visible = true
      gsap.to(structure.scale, { y: 1, duration: 0.5, ease })
      gsap.to(construction.scale, { x: 1, y: 1, z: 1, duration, ease })
      gsap.to(finished.scale, { y: 0.001, duration: 0.5, ease, onComplete: () => { finished.visible = false } })
    } else if (stageIndex === 3) {
      // Stage 3: Finished Architectural Marvel (Glass Facade + Spire)
      structure.visible = true
      finished.visible = true
      gsap.to(structure.scale, { y: 1, duration: 0.5, ease })
      gsap.to(construction.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.5, ease, onComplete: () => { construction.visible = false } })
      gsap.to(finished.scale, { y: 1, duration, ease })
    }
  }, [])

  // Auto-progression cycle
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        const next = (prev + 1) % STAGES.length
        applyStageTransition(next)
        return next
      })
    }, 5500)
    return () => clearInterval(interval)
  }, [isPaused, applyStageTransition])

  const handleManualStageSelect = (stageId) => {
    setActiveStage(stageId)
    applyStageTransition(stageId)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    // ----------------------------------------------------------------
    // 1. Scene, Camera & Renderer
    // ----------------------------------------------------------------
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(3.4, 2.8, 12.2)
    camera.lookAt(0, 0.4, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(getStandardPixelRatio())
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // ----------------------------------------------------------------
    // 2. HDRI Environment Map (PMREM) with Clean Physical Sky
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0, ENVIRONMENT_COLORS.sky.zenithGreen)
    skyGrad.addColorStop(0.3, ENVIRONMENT_COLORS.sky.slateAtmosphere)
    skyGrad.addColorStop(0.6, ENVIRONMENT_COLORS.sky.distantSkyline)
    skyGrad.addColorStop(1, ENVIRONMENT_COLORS.sky.deepFoundation)
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    const sunGrad = ctx.createRadialGradient(380, 70, 0, 380, 70, 80)
    sunGrad.addColorStop(0, ENVIRONMENT_COLORS.sun.glintWhite)
    sunGrad.addColorStop(0.25, ENVIRONMENT_COLORS.sun.glintWarm)
    sunGrad.addColorStop(0.6, ENVIRONMENT_COLORS.sun.glintHalo)
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(315, 10, 130, 130)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    // Master site group
    const siteMaster = new THREE.Group()
    siteMaster.scale.set(0.60, 0.60, 0.60)
    siteMaster.position.set(0, -0.6, 0)
    scene.add(siteMaster)

    // ----------------------------------------------------------------
    // 3. Materials
    // ----------------------------------------------------------------
    // Fair-faced concrete
    const concreteMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.concrete.podium,
      roughness: 0.82,
      metalness: 0.05,
    })

    // Structural steel (Dark titanium)
    const steelMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.steel.darkTitanium,
      metalness: 0.88,
      roughness: 0.24,
    })

    // Green Laser Rebar & Alignment wireframe
    const emeraldWireMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.BENAA.light,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })

    // Rebar rods
    const rebarMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.steel.rebar,
      metalness: 0.92,
      roughness: 0.2,
    })

    // Double-glazed reflective architectural glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: MATERIAL_COLORS.glass.tint,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.72,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    })

    // Illuminated warm interior floor plates
    const interiorFloorMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.interior.warmIlluminatedFloor,
      emissive: BRAND_COLORS.MAJD.light,
      emissiveIntensity: 0.35,
      roughness: 0.35,
    })

    // Gold / Champagne Spire Accent
    const goldMat = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.MAJD.light,
      metalness: 0.9,
      roughness: 0.2,
    })

    // ----------------------------------------------------------------
    // 4. STAGE 1: Foundation Group (Excavation, Footings, Rebar)
    // ----------------------------------------------------------------
    const foundationGroup = new THREE.Group()
    siteMaster.add(foundationGroup)
    stageGroupsRef.current.foundation = foundationGroup

    // Ground Excavation Base Slab
    const fBaseGeo = new THREE.BoxGeometry(6.6, 0.4, 6.6)
    const fBase = new THREE.Mesh(fBaseGeo, concreteMat)
    fBase.position.y = -2.2
    foundationGroup.add(fBase)

    // Foundation Grid
    const grid = new THREE.GridHelper(7.2, 16, 0x1a6b52, 0x1e293b)
    grid.position.y = -2.398
    foundationGroup.add(grid)

    // Reinforced Footing Pads
    const footingGeo = new THREE.BoxGeometry(1.2, 0.3, 1.2)
    const footingCoords = [
      [-1.8, -1.8], [0, -1.8], [1.8, -1.8],
      [-1.8, 0], [1.8, 0],
      [-1.8, 1.8], [0, 1.8], [1.8, 1.8]
    ]
    footingCoords.forEach(([fx, fz]) => {
      const footing = new THREE.Mesh(footingGeo, concreteMat)
      footing.position.set(fx, -1.85, fz)
      foundationGroup.add(footing)

      // Rebar starter mesh on footings
      const rMeshGeo = new THREE.BoxGeometry(0.8, 0.2, 0.8)
      const rMesh = new THREE.Mesh(rMeshGeo, emeraldWireMat)
      rMesh.position.set(fx, -1.75, fz)
      foundationGroup.add(rMesh)
    })

    // Perimeter Safety Rails (Emerald glowing strips)
    const railMat = new THREE.MeshBasicMaterial({ color: 0x1a6b52 })
    const railGeo = new THREE.BoxGeometry(6.64, 0.04, 0.04)
    const railFront = new THREE.Mesh(railGeo, railMat)
    railFront.position.set(0, -1.98, 3.3)
    foundationGroup.add(railFront)

    const railBack = new THREE.Mesh(railGeo, railMat)
    railBack.position.set(0, -1.98, -3.3)
    foundationGroup.add(railBack)

    // ----------------------------------------------------------------
    // 5. STAGE 2: Structure Group (Concrete Core & Steel Frames)
    // ----------------------------------------------------------------
    const structureGroup = new THREE.Group()
    structureGroup.position.y = -2.0
    structureGroup.scale.y = 0.001
    structureGroup.visible = false
    siteMaster.add(structureGroup)
    stageGroupsRef.current.structure = structureGroup

    // Reinforced Concrete Central Core
    const coreHeight = 5.2
    const coreGeo = new THREE.BoxGeometry(1.6, coreHeight, 1.6)
    const coreMesh = new THREE.Mesh(coreGeo, concreteMat)
    coreMesh.position.set(0, coreHeight / 2, 0)
    structureGroup.add(coreMesh)

    // Structural Steel H-Columns rising around the core
    const colCoords = [
      [-1.8, -1.8], [0, -1.8], [1.8, -1.8],
      [-1.8, 0], [1.8, 0],
      [-1.8, 1.8], [0, 1.8], [1.8, 1.8]
    ]
    const colGeo = new THREE.BoxGeometry(0.12, coreHeight, 0.12)
    colCoords.forEach(([cx, cz]) => {
      const col = new THREE.Mesh(colGeo, steelMat)
      col.position.set(cx, coreHeight / 2, cz)
      structureGroup.add(col)
    })

    // Horizontal Steel Floor Slabs
    for (let h = 0.5; h <= coreHeight; h += 0.8) {
      const floorSlabGeo = new THREE.BoxGeometry(3.8, 0.05, 3.8)
      const floorSlab = new THREE.Mesh(floorSlabGeo, steelMat)
      floorSlab.position.set(0, h, 0)
      structureGroup.add(floorSlab)

      const slabWire = new THREE.Mesh(floorSlabGeo, emeraldWireMat)
      slabWire.position.set(0, h, 0)
      structureGroup.add(slabWire)
    }

    // Exposed Starter Rebar on top
    for (let rx = -1.6; rx <= 1.6; rx += 0.8) {
      for (let rz = -1.6; rz <= 1.6; rz += 0.8) {
        const rebarGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.7, 6)
        const rebar = new THREE.Mesh(rebarGeo, rebarMat)
        rebar.position.set(rx, coreHeight + 0.35, rz)
        structureGroup.add(rebar)
      }
    }

    // ----------------------------------------------------------------
    // 6. STAGE 3: Construction Group (Heavy-Duty Tower Crane & Scaffolding)
    // ----------------------------------------------------------------
    const constructionGroup = new THREE.Group()
    constructionGroup.position.set(-2.2, -1.98, -1.8)
    constructionGroup.scale.set(0.001, 0.001, 0.001)
    constructionGroup.visible = false
    siteMaster.add(constructionGroup)
    stageGroupsRef.current.construction = constructionGroup

    const craneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
    })

    // Crane Mast (Lattice Tower)
    const mastHeight = 6.2
    const mastGeo = new THREE.BoxGeometry(0.35, mastHeight, 0.35)
    const mast = new THREE.Mesh(mastGeo, craneGoldMat)
    mast.position.y = mastHeight / 2
    constructionGroup.add(mast)

    const mastWireGeo = new THREE.BoxGeometry(0.38, mastHeight, 0.38)
    const mastWire = new THREE.Mesh(mastWireGeo, emeraldWireMat)
    mastWire.position.y = mastHeight / 2
    constructionGroup.add(mastWire)

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(0.5, 0.45, 0.45)
    const cabin = new THREE.Mesh(cabinGeo, steelMat)
    cabin.position.set(0.15, mastHeight + 0.2, 0.15)
    constructionGroup.add(cabin)

    // Jib Group
    const jibGroup = new THREE.Group()
    jibGroup.position.y = mastHeight + 0.25
    constructionGroup.add(jibGroup)

    const jibGeo = new THREE.BoxGeometry(4.4, 0.14, 0.14)
    const jib = new THREE.Mesh(jibGeo, craneGoldMat)
    jib.position.x = 1.8
    jibGroup.add(jib)

    const peakGeo = new THREE.ConeGeometry(0.2, 0.7, 4)
    const peak = new THREE.Mesh(peakGeo, craneGoldMat)
    peak.position.set(0, 0.45, 0)
    jibGroup.add(peak)

    const counterGeo = new THREE.BoxGeometry(0.7, 0.35, 0.35)
    const counter = new THREE.Mesh(counterGeo, steelMat)
    counter.position.x = -0.7
    jibGroup.add(counter)

    // Hoist Cable & Suspended Load
    const trolleyGeo = new THREE.BoxGeometry(0.25, 0.1, 0.2)
    const trolley = new THREE.Mesh(trolleyGeo, steelMat)
    trolley.position.set(2.4, -0.1, 0)
    jibGroup.add(trolley)

    const cableGeo = new THREE.CylinderGeometry(0.012, 0.012, 2.2, 4)
    const cableMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const cable = new THREE.Mesh(cableGeo, cableMat)
    cable.position.set(2.4, -1.2, 0)
    jibGroup.add(cable)

    const loadGeo = new THREE.BoxGeometry(0.6, 0.45, 0.6)
    const loadMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6, // Muted technical teal
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0f766e,
      emissiveIntensity: 0.3,
    })
    const load = new THREE.Mesh(loadGeo, loadMat)
    load.position.set(2.4, -2.45, 0)
    jibGroup.add(load)

    // ----------------------------------------------------------------
    // 7. STAGE 4: Finished Group (Glass Facade, Interior Light & Spire)
    // ----------------------------------------------------------------
    const finishedGroup = new THREE.Group()
    finishedGroup.position.y = -2.0
    finishedGroup.scale.y = 0.001
    finishedGroup.visible = false
    siteMaster.add(finishedGroup)
    stageGroupsRef.current.finished = finishedGroup

    // Main Curtain Wall Glass Envelope
    const glassVolumeHeight = 5.2
    const glassVolumeGeo = new THREE.BoxGeometry(3.9, glassVolumeHeight, 3.9)
    const glassVolume = new THREE.Mesh(glassVolumeGeo, glassMat)
    glassVolume.position.set(0, glassVolumeHeight / 2, 0)
    finishedGroup.add(glassVolume)

    // Illuminated Floor Plates inside
    for (let fh = 0.4; fh <= glassVolumeHeight - 0.4; fh += 0.8) {
      const iFloorGeo = new THREE.BoxGeometry(3.7, 0.04, 3.7)
      const iFloor = new THREE.Mesh(iFloorGeo, interiorFloorMat)
      iFloor.position.set(0, fh, 0)
      finishedGroup.add(iFloor)
    }

    // Architectural Mullions
    for (let mx = -1.8; mx <= 1.8; mx += 0.9) {
      const mFinGeo = new THREE.BoxGeometry(0.04, glassVolumeHeight, 0.08)
      const mFinF = new THREE.Mesh(mFinGeo, steelMat)
      mFinF.position.set(mx, glassVolumeHeight / 2, 1.98)
      finishedGroup.add(mFinF)

      const mFinB = new THREE.Mesh(mFinGeo, steelMat)
      mFinB.position.set(mx, glassVolumeHeight / 2, -1.98)
      finishedGroup.add(mFinB)
    }

    // Rooftop Helipad
    const helipadGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.06, 24)
    const helipad = new THREE.Mesh(helipadGeo, concreteMat)
    helipad.position.set(0, glassVolumeHeight + 0.04, 0)
    finishedGroup.add(helipad)

    // Architectural Spire
    const spireGeo = new THREE.CylinderGeometry(0.02, 0.08, 1.8, 12)
    const spire = new THREE.Mesh(spireGeo, goldMat)
    spire.position.set(0.4, glassVolumeHeight + 0.95, 0.3)
    finishedGroup.add(spire)

    // Red Aviation Beacon
    const beaconGeo = new THREE.SphereGeometry(0.06, 12, 12)
    const beaconMat = new THREE.MeshBasicMaterial({ color: MATERIAL_COLORS.markers.beaconRed })
    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.set(0.4, glassVolumeHeight + 1.85, 0.3)
    finishedGroup.add(beacon)

    // ----------------------------------------------------------------
    // 8. Lighting & Atmosphere
    // ----------------------------------------------------------------
    const hemiLight = new THREE.HemisphereLight(
      ENVIRONMENT_COLORS.lighting.hemiSky,
      BRAND_COLORS.BENAA.dark,
      1.35
    )
    scene.add(hemiLight)

    const sunLight = new THREE.DirectionalLight(ENVIRONMENT_COLORS.sun.keyLight, 2.8)
    sunLight.position.set(6, 10, 8)
    scene.add(sunLight)

    const benaaBounce = new THREE.PointLight(BRAND_COLORS.BENAA.light, 1.8, 16)
    benaaBounce.position.set(-3, 2, 4)
    scene.add(benaaBounce)

    // ----------------------------------------------------------------
    // 9. Interaction & Animation Loop
    // ----------------------------------------------------------------
    let targetRotY = 0.35
    let targetRotX = 0.04
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = 0.35 + x * 0.2
      targetRotX = 0.04 - y * 0.08
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const viewportObserver = createViewportObserver(container, (visible) => {
      isVisible = visible
    })

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        siteMaster.rotation.y += (targetRotY - siteMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        siteMaster.rotation.x += (targetRotX - siteMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Crane smooth rotation in Construction stage
        if (constructionGroup.visible) {
          jibGroup.rotation.y = Math.sin(t * 0.6) * 0.5 + 0.3
          load.rotation.y = Math.sin(t * 1.2) * 0.12
        }

        // Aviation Beacon Flash
        const beaconPulse = Math.sin(t * 4.0) > 0.2 ? 1 : 0.15
        beaconMat.color.setRGB(beaconPulse, 0.08, 0.08)
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 10. Resize Observer & Cleanup
    // ----------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
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
    <div
      className="relative w-full h-full flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-label="Interactive Benaa 3D Construction & Architectural Evolution Scene"
      />

      {/* Floating 4-Stage Lifecycle Controller */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between gap-1 sm:gap-1.5 p-1.5 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-emerald-500/20 shadow-2xl">
        {STAGES.map((stage) => {
          const isActive = activeStage === stage.id
          return (
            <button
              key={stage.id}
              onClick={() => handleManualStageSelect(stage.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-1 rounded-xl text-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/40 scale-102'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white animate-ping' : 'bg-slate-600'
                  }`}
                />
                <span className="text-[10px] sm:text-xs font-bold tracking-tight">
                  {stage.titleEn}
                </span>
              </div>
              <span
                className={`text-[8px] sm:text-[9px] font-arabic leading-tight ${
                  isActive ? 'text-emerald-100' : 'text-slate-500'
                }`}
              >
                {stage.titleAr}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
