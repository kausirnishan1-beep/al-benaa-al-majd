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

export default function Hero3DBuilding() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    // ----------------------------------------------------------------
    // 1. Scene, Camera & Renderer with Shadows
    // ----------------------------------------------------------------
    const scene = new THREE.Scene()

    // Majestic architectural camera angle (low angle looking up at the skyscraper)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    const defaultCameraZ = isMobile ? 13.5 : 11.5
    camera.position.set(3.4, 1.8, defaultCameraZ)
    camera.lookAt(0, 1.2, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Soft realistic shadows
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Master Pivot Group
    const skyscraperMaster = new THREE.Group()
    scene.add(skyscraperMaster)
    skyscraperMaster.position.set(0, -2.5, 0)

    // ----------------------------------------------------------------
    // 2. Photorealistic Daytime Sky Environment Map (PMREM)
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    // Natural Sky Gradient: Azure Zenith -> Soft Sky Blue -> Golden Horizon -> City Base
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0.0, '#1d4ed8') // Deep blue zenith
    skyGrad.addColorStop(0.28, '#60a5fa') // Natural sky blue
    skyGrad.addColorStop(0.50, '#bfdbfe') // Soft sky light
    skyGrad.addColorStop(0.55, '#fef08a') // Subtle golden horizon
    skyGrad.addColorStop(0.60, '#334155') // Distant urban line
    skyGrad.addColorStop(0.72, '#1e293b') // Ground plaza
    skyGrad.addColorStop(1.0, '#0f172a') // Ground base
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    // Natural Sunlight Glow in reflection
    const sunGrad = ctx.createRadialGradient(370, 75, 0, 370, 75, 60)
    sunGrad.addColorStop(0, '#ffffff')
    sunGrad.addColorStop(0.2, '#fffbeb')
    sunGrad.addColorStop(0.6, 'rgba(254, 240, 138, 0.4)')
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(310, 15, 120, 120)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    // ----------------------------------------------------------------
    // 3. Premium Architectural Materials
    // ----------------------------------------------------------------
    // Double-glazed reflective curtain wall glass
    const towerGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      emissive: THREE_COLORS.BENAA.deepDark,
      emissiveIntensity: 0.15,
      metalness: 0.15,
      roughness: 0.03,
      transmission: 0.72,
      thickness: 1.4,
      ior: 1.52,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.98,
      clearcoat: 0.95,
      clearcoatRoughness: 0.02,
    })

    // Anodized dark architectural titanium steel frames
    const steelMullionMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.28,
    })

    // Architectural fair-faced concrete & granite podium
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.85,
      metalness: 0.05,
    })

    // Illuminated warm corporate interior floor slabs
    const interiorFloorMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: THREE_COLORS.MAJD.light,
      emissiveIntensity: 0.25,
      roughness: 0.4,
    })

    // Ground Plaza Paver Slate
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.88,
      metalness: 0.1,
    })

    // Architectural Bronze / Gold Spire & Accent Trim
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.MAJD.light,
      metalness: 0.9,
      roughness: 0.2,
    })

    // ----------------------------------------------------------------
    // 4. Ground Plaza, Colonnade & Soft Shadow
    // ----------------------------------------------------------------
    const groundGeo = new THREE.PlaneGeometry(20, 20)
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.02
    ground.receiveShadow = true
    skyscraperMaster.add(ground)

    // Plaza grid pattern
    const plazaGrid = new THREE.GridHelper(16, 16, 0x475569, 0x0f172a)
    plazaGrid.position.y = -0.01
    skyscraperMaster.add(plazaGrid)

    // Ground Podium Base Slab
    const podiumGeo = new THREE.BoxGeometry(5.2, 0.25, 4.4)
    const podium = new THREE.Mesh(podiumGeo, concreteMat)
    podium.position.set(0, 0.12, 0)
    podium.castShadow = true
    podium.receiveShadow = true
    skyscraperMaster.add(podium)

    // ----------------------------------------------------------------
    // 5. Grand Double-Height Entrance Lobby (Tier 1)
    // ----------------------------------------------------------------
    const lobbyGroup = new THREE.Group()
    skyscraperMaster.add(lobbyGroup)

    const lobbyGlassGeo = new THREE.BoxGeometry(4.4, 0.95, 3.6)
    const lobbyGlass = new THREE.Mesh(lobbyGlassGeo, towerGlassMat)
    lobbyGlass.position.set(0, 0.72, 0)
    lobbyGlass.castShadow = true
    lobbyGlass.receiveShadow = true
    lobbyGroup.add(lobbyGlass)

    // Lobby Concrete Core
    const lobbyCoreGeo = new THREE.BoxGeometry(2.0, 0.95, 1.8)
    const lobbyCore = new THREE.Mesh(lobbyCoreGeo, concreteMat)
    lobbyCore.position.set(0, 0.72, 0)
    lobbyCore.castShadow = true
    lobbyCore.receiveShadow = true
    lobbyGroup.add(lobbyCore)

    // Colonnade Pillars around Lobby
    const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.95, 16)
    const pillarPositions = [
      [-2.0, 0.72, 1.6],
      [-1.0, 0.72, 1.6],
      [0.0, 0.72, 1.6],
      [1.0, 0.72, 1.6],
      [2.0, 0.72, 1.6],
      [-2.0, 0.72, -1.6],
      [2.0, 0.72, -1.6],
    ]
    pillarPositions.forEach(([px, py, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, steelMullionMat)
      pillar.position.set(px, py, pz)
      pillar.castShadow = true
      pillar.receiveShadow = true
      lobbyGroup.add(pillar)
    })

    // Entrance Canopy Overhang
    const canopyGeo = new THREE.BoxGeometry(2.4, 0.08, 1.2)
    const canopy = new THREE.Mesh(canopyGeo, steelMullionMat)
    canopy.position.set(0, 0.9, 2.2)
    canopy.castShadow = true
    canopy.receiveShadow = true
    lobbyGroup.add(canopy)

    // ----------------------------------------------------------------
    // 6. Main Soaring Office Tower (Tier 2 - Floors 2 to 24)
    // ----------------------------------------------------------------
    const towerGroup = new THREE.Group()
    skyscraperMaster.add(towerGroup)

    const mainTowerHeight = 5.2
    const mainTowerWidth = 3.6
    const mainTowerDepth = 2.8
    const numFloors = 20
    const floorH = mainTowerHeight / numFloors

    // Main Glass Volume
    const mainGlassGeo = new THREE.BoxGeometry(mainTowerWidth, mainTowerHeight, mainTowerDepth)
    const mainGlass = new THREE.Mesh(mainGlassGeo, towerGlassMat)
    mainGlass.position.set(0, 1.2 + mainTowerHeight / 2, 0)
    mainGlass.castShadow = true
    mainGlass.receiveShadow = true
    towerGroup.add(mainGlass)

    // Tower Central Concrete Structural Core
    const towerCoreGeo = new THREE.BoxGeometry(1.6, mainTowerHeight, 1.4)
    const towerCore = new THREE.Mesh(towerCoreGeo, concreteMat)
    towerCore.position.set(0, 1.2 + mainTowerHeight / 2, 0)
    towerCore.castShadow = true
    towerCore.receiveShadow = true
    towerGroup.add(towerCore)

    // Horizontal Floor Slabs & Warm Interior Glow Plates
    for (let f = 0; f <= numFloors; f++) {
      const fy = 1.2 + f * floorH

      // Exterior Floor Spandrel Trim
      const spandrelGeo = new THREE.BoxGeometry(mainTowerWidth + 0.04, 0.04, mainTowerDepth + 0.04)
      const spandrel = new THREE.Mesh(spandrelGeo, steelMullionMat)
      spandrel.position.set(0, fy, 0)
      spandrel.castShadow = true
      spandrel.receiveShadow = true
      towerGroup.add(spandrel)

      // Interior Illuminated Floor Slab
      if (f % 2 === 0) {
        const floorSlabGeo = new THREE.BoxGeometry(
          mainTowerWidth - 0.1,
          0.02,
          mainTowerDepth - 0.1
        )
        const floorSlab = new THREE.Mesh(floorSlabGeo, interiorFloorMat)
        floorSlab.position.set(0, fy - 0.02, 0)
        towerGroup.add(floorSlab)
      }
    }

    // Vertical Architectural Steel Mullions (Continuous structural verticality)
    const mullionPositionsX = [-1.6, -1.0, -0.4, 0.4, 1.0, 1.6]
    mullionPositionsX.forEach((mx) => {
      // Front facade vertical fins
      const finFrontGeo = new THREE.BoxGeometry(0.04, mainTowerHeight, 0.08)
      const finFront = new THREE.Mesh(finFrontGeo, steelMullionMat)
      finFront.position.set(mx, 1.2 + mainTowerHeight / 2, mainTowerDepth / 2 + 0.02)
      finFront.castShadow = true
      towerGroup.add(finFront)

      // Back facade vertical fins
      const finBack = new THREE.Mesh(finFrontGeo, steelMullionMat)
      finBack.position.set(mx, 1.2 + mainTowerHeight / 2, -mainTowerDepth / 2 - 0.02)
      finBack.castShadow = true
      towerGroup.add(finBack)
    })

    // Side vertical mullions
    const mullionPositionsZ = [-1.0, -0.4, 0.4, 1.0]
    mullionPositionsZ.forEach((mz) => {
      const sideFinGeo = new THREE.BoxGeometry(0.08, mainTowerHeight, 0.04)
      const finLeft = new THREE.Mesh(sideFinGeo, steelMullionMat)
      finLeft.position.set(-mainTowerWidth / 2 - 0.02, 1.2 + mainTowerHeight / 2, mz)
      finLeft.castShadow = true
      towerGroup.add(finLeft)

      const finRight = new THREE.Mesh(sideFinGeo, steelMullionMat)
      finRight.position.set(mainTowerWidth / 2 + 0.02, 1.2 + mainTowerHeight / 2, mz)
      finRight.castShadow = true
      towerGroup.add(finRight)
    })

    // ----------------------------------------------------------------
    // 7. Executive Sky Lounge Setback (Tier 3)
    // ----------------------------------------------------------------
    const setbackGroup = new THREE.Group()
    skyscraperMaster.add(setbackGroup)

    const setbackY = 1.2 + mainTowerHeight
    const setbackH = 1.4
    const setbackW = 2.8
    const setbackD = 2.2

    // Setback Glass Box
    const setbackGlassGeo = new THREE.BoxGeometry(setbackW, setbackH, setbackD)
    const setbackGlass = new THREE.Mesh(setbackGlassGeo, towerGlassMat)
    setbackGlass.position.set(0, setbackY + setbackH / 2, 0)
    setbackGlass.castShadow = true
    setbackGlass.receiveShadow = true
    setbackGroup.add(setbackGlass)

    // Sky Lounge Observation Balcony Slab
    const balconyGeo = new THREE.BoxGeometry(mainTowerWidth, 0.12, mainTowerDepth)
    const balcony = new THREE.Mesh(balconyGeo, steelMullionMat)
    balcony.position.set(0, setbackY, 0)
    balcony.castShadow = true
    balcony.receiveShadow = true
    setbackGroup.add(balcony)

    // Glass Railing around Sky Terrace
    const railingGeo = new THREE.BoxGeometry(mainTowerWidth - 0.08, 0.25, mainTowerDepth - 0.08)
    const railing = new THREE.Mesh(railingGeo, towerGlassMat)
    railing.position.set(0, setbackY + 0.15, 0)
    setbackGroup.add(railing)

    // ----------------------------------------------------------------
    // 8. Angled Crown Roof, Helipad & Architectural Spire (Tier 4)
    // ----------------------------------------------------------------
    const crownGroup = new THREE.Group()
    skyscraperMaster.add(crownGroup)

    const crownBaseY = setbackY + setbackH

    // Crown Cap Slab
    const crownCapGeo = new THREE.BoxGeometry(setbackW + 0.15, 0.18, setbackD + 0.15)
    const crownCap = new THREE.Mesh(crownCapGeo, steelMullionMat)
    crownCap.position.set(0, crownBaseY + 0.09, 0)
    crownCap.castShadow = true
    crownCap.receiveShadow = true
    crownGroup.add(crownCap)

    // Angled Architectural Crown Truss Screen
    const crownScreenGeo = new THREE.BoxGeometry(setbackW * 0.9, 0.7, setbackD * 0.9)
    const crownScreen = new THREE.Mesh(crownScreenGeo, steelMullionMat)
    crownScreen.position.set(0, crownBaseY + 0.5, 0)
    crownScreen.castShadow = true
    crownScreen.receiveShadow = true
    crownGroup.add(crownScreen)

    // Rooftop Helipad
    const helipadGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.05, 24)
    const helipad = new THREE.Mesh(helipadGeo, concreteMat)
    helipad.position.set(0, crownBaseY + 0.9, 0)
    helipad.castShadow = true
    helipad.receiveShadow = true
    crownGroup.add(helipad)

    // Architectural Spire (Gold/Bronze)
    const spireGeo = new THREE.CylinderGeometry(0.02, 0.09, 1.6, 12)
    const spire = new THREE.Mesh(spireGeo, goldAccentMat)
    spire.position.set(0.4, crownBaseY + 1.7, 0.2)
    spire.castShadow = true
    crownGroup.add(spire)

    // Pulsing Red Aviation Warning Beacon
    const beaconGeo = new THREE.SphereGeometry(0.06, 16, 16)
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 })
    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.set(0.4, crownBaseY + 2.52, 0.2)
    crownGroup.add(beacon)

    // ----------------------------------------------------------------
    // 9. Natural Outdoor Daylight & Shadows (Section 7B)
    // ----------------------------------------------------------------
    // Hemisphere Fill Light (Daylight sky above + ground bounce below)
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.35)
    scene.add(hemiLight)

    // Strong Directional Key Sunlight with Shadow Frustum
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.6)
    sunLight.position.set(8, 14, 9)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 35
    sunLight.shadow.camera.left = -7
    sunLight.shadow.camera.right = 7
    sunLight.shadow.camera.top = 10
    sunLight.shadow.camera.bottom = -4
    sunLight.shadow.bias = -0.0004
    scene.add(sunLight)

    // Sky Rim Sparkle Light
    const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.4)
    rimLight.position.set(-8, 9, -7)
    scene.add(rimLight)

    // Subtle Brand Accent Bounce Lights
    const benaaBounce = new THREE.PointLight(THREE_COLORS.BENAA.primary, 0.9, 15)
    benaaBounce.position.set(-3, 1, 3)
    scene.add(benaaBounce)

    const majdBounce = new THREE.PointLight(THREE_COLORS.MAJD.light, 0.8, 15)
    majdBounce.position.set(3, 5, 2)
    scene.add(majdBounce)

    // ----------------------------------------------------------------
    // 10. Interaction: Mouse Move Parallax, Scroll Zoom & Raycasting
    // ----------------------------------------------------------------
    let targetRotY = 0.35 // Angled perspective view
    let targetRotX = 0.04
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

      // Subtle multi-axis rotation around the grand skyscraper
      targetRotY = 0.35 + x * 0.38
      targetRotX = 0.04 - y * 0.14
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
    // 11. Animation Render Loop (60 FPS Target)
    // ----------------------------------------------------------------
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        skyscraperMaster.rotation.y +=
          (targetRotY - skyscraperMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        skyscraperMaster.rotation.x +=
          (targetRotX - skyscraperMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Idle organic micro-motion
        skyscraperMaster.position.y = -2.5 + Math.sin(t * 0.7) * 0.025

        // Camera dolly zoom smoothing
        camera.position.z += (targetCameraZ - camera.position.z) * 0.06

        // Aviation Beacon Flash
        const beaconPulse = Math.sin(t * 4.0) > 0.2 ? 1 : 0.15
        beaconMat.color.setRGB(beaconPulse, 0.08, 0.08)

        // Raycasting for subtle glass sparkle glint
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects([mainGlass, setbackGlass, lobbyGlass])
        if (intersects.length > 0) {
          towerGlassMat.emissiveIntensity = 0.32
        } else {
          towerGlassMat.emissiveIntensity = 0.15
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 12. Resize Handling
    // ----------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)

    // ----------------------------------------------------------------
    // 13. Resource Cleanup on Unmount
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
      {/* 3D Ambient Depth Brand Glow (#0F4C3A Deep Green & #D4A017 Gold) */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#0F4C3A]/25 via-[#2DD4BF]/10 to-[#D4A017]/20 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] bg-slate-950/85 backdrop-blur-[2px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Architectural Corporate Skyscraper HQ"
      />
    </motion.div>
  )
}
