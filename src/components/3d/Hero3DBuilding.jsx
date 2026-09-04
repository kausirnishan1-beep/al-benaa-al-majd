import { useEffect, useRef } from 'react'
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 3.5, 17)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // Master Architectural Hierarchy
    const masterBuilding = new THREE.Group()
    scene.add(masterBuilding)

    // ----------------------------------------------------------------
    // 2. High-End Architectural Materials
    // ----------------------------------------------------------------
    // Luxury Deep Green Reflective Architectural Glass
    const luxGlassMat = new THREE.MeshPhysicalMaterial({
      color: THREE_COLORS.BENAA.glass,
      emissive: THREE_COLORS.BENAA.deepDark,
      metalness: 0.92,
      roughness: 0.12,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    })

    // Glowing Warm Gold Interior Office Lighting
    const illuminatedFloorMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.MAJD.light,
      emissive: THREE_COLORS.MAJD.light,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
    })

    // High-Tech Holographic Structural Blueprint Wireframe
    const blueprintWireMat = new THREE.LineBasicMaterial({
      color: THREE_COLORS.TEAL.primary,
      transparent: true,
      opacity: 0.7,
    })

    // Polished Champagne Gold Architectural Mullions / Vertical Fins
    const goldMullionMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.MAJD.light,
      metalness: 0.95,
      roughness: 0.25,
      emissive: THREE_COLORS.MAJD.spire,
      emissiveIntensity: 0.4,
    })

    // Dark Basalt Concrete Podium
    const podiumMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.NEUTRALS.podium,
      roughness: 0.7,
      metalness: 0.3,
    })

    // ----------------------------------------------------------------
    // 3. Foundation Podium & Blueprint Construction Grid
    // ----------------------------------------------------------------
    const podiumGroup = new THREE.Group()
    podiumGroup.position.set(0, -3.2, 0)
    masterBuilding.add(podiumGroup)

    // Tiered Stepped Plinth
    const plinth1 = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.8, 0.4, 32), podiumMat)
    plinth1.position.y = 0.2
    podiumGroup.add(plinth1)

    const plinth2 = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.0, 0.5, 32), podiumMat)
    plinth2.position.y = 0.65
    podiumGroup.add(plinth2)

    // Holographic Base Blueprint Grid
    const baseGrid = new THREE.GridHelper(
      12,
      isMobile ? 16 : 24,
      THREE_COLORS.MAJD.light,
      THREE_COLORS.BENAA.light
    )
    baseGrid.position.y = 0.91
    podiumGroup.add(baseGrid)

    // ----------------------------------------------------------------
    // 4. Iconic Twisted Spiral Skyscraper (Tower 1 - Primary Icon)
    // ----------------------------------------------------------------
    const towerGroup = new THREE.Group()
    towerGroup.position.set(-0.6, -2.2, 0)
    masterBuilding.add(towerGroup)

    const floorCount = isMobile ? 16 : 22
    const floorHeight = 0.34
    const baseRadius = 1.9

    for (let i = 0; i < floorCount; i++) {
      const progress = i / floorCount
      // Taper and dynamic architectural twist angle
      const taper = 1 - progress * 0.38
      const twistAngle = progress * Math.PI * 0.45 // Elegant 80-degree aerodynamic twist
      const y = i * floorHeight + floorHeight / 2
      const radius = baseRadius * taper

      // Custom faceted elliptical floor slab
      const floorGeo = new THREE.CylinderGeometry(
        radius * 0.95,
        radius,
        floorHeight * 0.88,
        isMobile ? 8 : 12
      )
      const floorMesh = new THREE.Mesh(floorGeo, luxGlassMat)
      floorMesh.position.y = y
      floorMesh.rotation.y = twistAngle
      towerGroup.add(floorMesh)

      // Blueprint edge lines
      const edgeGeo = new THREE.EdgesGeometry(floorGeo)
      const edgeLine = new THREE.LineSegments(edgeGeo, blueprintWireMat)
      edgeLine.position.y = y
      edgeLine.rotation.y = twistAngle
      towerGroup.add(edgeLine)

      // Interior illuminated warm core (selective glowing floors like Reference 1)
      if (i % 2 === 0 || i === 5 || i === 11 || i === 17) {
        const coreGeo = new THREE.CylinderGeometry(
          radius * 0.65,
          radius * 0.7,
          floorHeight * 0.6,
          isMobile ? 8 : 12
        )
        const coreMesh = new THREE.Mesh(coreGeo, illuminatedFloorMat)
        coreMesh.position.y = y
        coreMesh.rotation.y = twistAngle
        towerGroup.add(coreMesh)
      }
    }

    // Vertical Golden Facade Spines / Aerodynamic Fins
    const finCount = 6
    const totalHeight = floorCount * floorHeight

    for (let f = 0; f < finCount; f++) {
      const finPoints = []
      for (let i = 0; i <= floorCount; i++) {
        const progress = i / floorCount
        const taper = 1 - progress * 0.38
        const twistAngle = progress * Math.PI * 0.45
        const angle = (f * Math.PI * 2) / finCount + twistAngle
        const r = (baseRadius * taper) + 0.05
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        const y = i * floorHeight
        finPoints.push(new THREE.Vector3(x, y, z))
      }

      const finCurve = new THREE.CatmullRomCurve3(finPoints)
      const finTubeGeo = new THREE.TubeGeometry(finCurve, isMobile ? 24 : 40, 0.035, 6, false)
      const finMesh = new THREE.Mesh(finTubeGeo, goldMullionMat)
      towerGroup.add(finMesh)
    }

    // ----------------------------------------------------------------
    // 5. Crown Sky-Lounge & Glass Observation Dome (Reference 1)
    // ----------------------------------------------------------------
    const crownY = totalHeight
    const domeRadius = baseRadius * (1 - 0.38) * 0.9

    // Circular Sky-Deck Ring
    const skyDeckGeo = new THREE.CylinderGeometry(domeRadius * 1.15, domeRadius * 1.05, 0.25, 24)
    const skyDeck = new THREE.Mesh(skyDeckGeo, goldMullionMat)
    skyDeck.position.y = crownY + 0.12
    towerGroup.add(skyDeck)

    // Glass Observation Dome
    const domeGeo = new THREE.SphereGeometry(
      domeRadius,
      isMobile ? 16 : 24,
      isMobile ? 12 : 16,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    )
    const domeMesh = new THREE.Mesh(domeGeo, luxGlassMat)
    domeMesh.position.y = crownY + 0.25
    towerGroup.add(domeMesh)

    const domeEdgeGeo = new THREE.EdgesGeometry(domeGeo)
    const domeEdge = new THREE.LineSegments(domeEdgeGeo, blueprintWireMat)
    domeEdge.position.y = crownY + 0.25
    towerGroup.add(domeEdge)

    // Architectural Spire Peak with Pulsing Diamond
    const spireGeo = new THREE.ConeGeometry(0.08, 2.2, 16)
    const spire = new THREE.Mesh(spireGeo, goldMullionMat)
    spire.position.y = crownY + 1.35
    towerGroup.add(spire)

    const beaconGeo = new THREE.OctahedronGeometry(0.12)
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf })
    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.y = crownY + 2.5
    towerGroup.add(beacon)

    // ----------------------------------------------------------------
    // 6. Secondary Cascading Modern Wing (Tower 2 - Reference 2 & 3)
    // ----------------------------------------------------------------
    const wingGroup = new THREE.Group()
    wingGroup.position.set(2.4, -2.2, 0.8)
    masterBuilding.add(wingGroup)

    const wingFloorCount = isMobile ? 10 : 13
    for (let w = 0; w < wingFloorCount; w++) {
      const wy = w * floorHeight + floorHeight / 2
      const wWidth = 2.0 - (w / wingFloorCount) * 0.4
      const wDepth = 1.6

      const wingGeo = new THREE.BoxGeometry(wWidth, floorHeight * 0.9, wDepth)
      const wingMesh = new THREE.Mesh(wingGeo, luxGlassMat)
      wingMesh.position.y = wy
      wingMesh.rotation.y = -Math.PI / 8
      wingGroup.add(wingMesh)

      const wingEdgeGeo = new THREE.EdgesGeometry(wingGeo)
      const wingEdge = new THREE.LineSegments(wingEdgeGeo, blueprintWireMat)
      wingEdge.position.y = wy
      wingEdge.rotation.y = -Math.PI / 8
      wingGroup.add(wingEdge)

      if (w % 3 === 0) {
        const wingCoreGeo = new THREE.BoxGeometry(wWidth * 0.6, floorHeight * 0.6, wDepth * 0.6)
        const wingCore = new THREE.Mesh(wingCoreGeo, illuminatedFloorMat)
        wingCore.position.y = wy
        wingCore.rotation.y = -Math.PI / 8
        wingGroup.add(wingCore)
      }
    }

    // ----------------------------------------------------------------
    // 7. Rotating Holographic Lens / Focus Ring (Reference 3)
    // ----------------------------------------------------------------
    const focalRingGeo = new THREE.TorusGeometry(3.8, 0.02, 16, isMobile ? 40 : 80)
    const focalRingMat = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.MAJD.light,
      transparent: true,
      opacity: 0.6,
    })
    const focalRing = new THREE.Mesh(focalRingGeo, focalRingMat)
    focalRing.rotation.x = Math.PI / 2.3
    focalRing.position.y = 2.2
    masterBuilding.add(focalRing)

    const subRingGeo = new THREE.TorusGeometry(4.2, 0.015, 16, isMobile ? 40 : 80)
    const subRingMat = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.TEAL.primary,
      transparent: true,
      opacity: 0.45,
    })
    const subRing = new THREE.Mesh(subRingGeo, subRingMat)
    subRing.rotation.x = -Math.PI / 2.6
    subRing.position.y = 3.5
    masterBuilding.add(subRing)

    // ----------------------------------------------------------------
    // 8. Subtle Floating Stardust Particles
    // ----------------------------------------------------------------
    const particleCount = isMobile ? 40 : 90
    const pGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    const colTeal = new THREE.Color(THREE_COLORS.TEAL.primary)
    const colGold = new THREE.Color(THREE_COLORS.MAJD.light)

    for (let p = 0; p < particleCount; p++) {
      pPositions[p * 3] = (Math.random() - 0.5) * 16
      pPositions[p * 3 + 1] = Math.random() * 12 - 2
      pPositions[p * 3 + 2] = (Math.random() - 0.5) * 14

      const c = Math.random() > 0.5 ? colTeal : colGold
      pColors[p * 3] = c.r
      pColors[p * 3 + 1] = c.g
      pColors[p * 3 + 2] = c.b
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 9. Premium Architectural Lighting Setup
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(THREE_COLORS.LIGHTS.ambient, 0.9))

    const mainSun = new THREE.DirectionalLight(THREE_COLORS.LIGHTS.sun, 2.4)
    mainSun.position.set(8, 14, 10)
    scene.add(mainSun)

    const benaaGlow = new THREE.PointLight(THREE_COLORS.BENAA.light, 3.5, 25)
    benaaGlow.position.set(-6, 6, 5)
    scene.add(benaaGlow)

    const majdGlow = new THREE.PointLight(THREE_COLORS.MAJD.light, 3.0, 25)
    majdGlow.position.set(6, 4, -4)
    scene.add(majdGlow)

    const cyanRim = new THREE.PointLight(THREE_COLORS.TEAL.primary, 2.0, 15)
    cyanRim.position.set(0, 8, 4)
    scene.add(cyanRim)

    // ----------------------------------------------------------------
    // 10. Smooth Parallax & Viewport Observer
    // ----------------------------------------------------------------
    let mouseX = 0
    let mouseY = 0
    let targetRotY = 0.35
    let targetRotX = 0.05
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseX = x
      mouseY = y
      targetRotY = 0.35 + mouseX * 0.4
      targetRotX = 0.05 - mouseY * 0.2
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const viewportObserver = createViewportObserver(container, (visible) => {
      isVisible = visible
    })

    // ----------------------------------------------------------------
    // 11. Render Loop
    // ----------------------------------------------------------------
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        masterBuilding.rotation.y += (targetRotY - masterBuilding.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        masterBuilding.rotation.x += (targetRotX - masterBuilding.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        focalRing.rotation.z = t * 0.06
        subRing.rotation.z = -t * 0.04
        particles.rotation.y = t * 0.012
      }

      beacon.rotation.y = t * 2
      beaconMat.color.setHex(Math.sin(t * 3) > 0 ? THREE_COLORS.TEAL.primary : THREE_COLORS.MAJD.light)

      renderer.render(scene, camera)
    }

    animate()

    // ----------------------------------------------------------------
    // 12. Responsive Resize
    // ----------------------------------------------------------------
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    resizeObserver.observe(container)

    // ----------------------------------------------------------------
    // Cleanup
    // ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      viewportObserver.disconnect()
      resizeObserver.disconnect()

      disposeObject3D(scene)
      renderer.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] lg:min-h-[540px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
