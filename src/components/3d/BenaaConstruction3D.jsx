import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  THREE_TIMING,
  isReducedMotion,
  isMobileDevice,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'

export default function BenaaConstruction3D() {
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
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    // Low-angle architectural isometric view that captures full height
    camera.position.set(3.2, 3.2, 11.8)
    camera.lookAt(0, 0.4, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    container.appendChild(renderer.domElement)

    // ----------------------------------------------------------------
    // 2. PMREM Sky & Construction Lighting Reflections
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0, '#064e3b')
    skyGrad.addColorStop(0.3, '#0284c7')
    skyGrad.addColorStop(0.6, '#0f172a')
    skyGrad.addColorStop(1, '#020617')
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    const sunGrad = ctx.createRadialGradient(380, 70, 0, 380, 70, 80)
    sunGrad.addColorStop(0, '#ffffff')
    sunGrad.addColorStop(0.3, '#fef08a')
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(280, 0, 200, 140)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    // Master site group: scaled & centered to fit perfectly within card boundaries
    const siteMaster = new THREE.Group()
    siteMaster.scale.set(0.62, 0.62, 0.62)
    siteMaster.position.set(0, -0.6, 0)
    scene.add(siteMaster)

    // ----------------------------------------------------------------
    // 3. Foundation Ground Podium & Blueprint Grid
    // ----------------------------------------------------------------
    const groundGroup = new THREE.Group()
    siteMaster.add(groundGroup)

    const foundationGeo = new THREE.BoxGeometry(6.6, 0.35, 6.6)
    const foundationMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.3,
    })
    const foundation = new THREE.Mesh(foundationGeo, foundationMat)
    foundation.position.y = -2.18
    groundGroup.add(foundation)

    const grid = new THREE.GridHelper(7.2, 16, 0x34d399, 0x1e3a5f)
    grid.position.y = -1.98
    grid.material.opacity = 0.55
    grid.material.transparent = true
    groundGroup.add(grid)

    // Perimeter Warning Accent Rails
    const railMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 })
    const railGeo = new THREE.BoxGeometry(6.64, 0.04, 0.04)
    const railFront = new THREE.Mesh(railGeo, railMat)
    railFront.position.set(0, -1.98, 3.3)
    groundGroup.add(railFront)

    const railBack = new THREE.Mesh(railGeo, railMat)
    railBack.position.set(0, -1.98, -3.3)
    groundGroup.add(railBack)

    // ----------------------------------------------------------------
    // 4. Rising Architectural Skyscraper Structure
    // ----------------------------------------------------------------
    const buildingGroup = new THREE.Group()
    siteMaster.add(buildingGroup)

    // Fair-faced architectural concrete core
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      roughness: 0.7,
      metalness: 0.2,
    })

    // Reflective solar architectural glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.55,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    })

    // Anodized structural steel frames & wireframes
    const steelFrameMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.2,
    })

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })

    // Illuminated warm interior floor plates
    const litFloorMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.4,
      roughness: 0.35,
    })

    // Level 1: Podium Core & Glass Facade (Ground to +0.0)
    const l1GlassGeo = new THREE.BoxGeometry(3.6, 1.8, 3.6)
    const l1Glass = new THREE.Mesh(l1GlassGeo, glassMat)
    const l1Wire = new THREE.Mesh(l1GlassGeo, wireMat)
    l1Glass.position.y = -1.05
    l1Wire.position.y = -1.05
    buildingGroup.add(l1Glass)
    buildingGroup.add(l1Wire)

    // Slabs & columns for Level 1
    for (let y = -1.9; y <= -0.2; y += 0.45) {
      const slabGeo = new THREE.BoxGeometry(3.7, 0.04, 3.7)
      const slab = new THREE.Mesh(slabGeo, steelFrameMat)
      slab.position.y = y
      buildingGroup.add(slab)

      const floorGeo = new THREE.BoxGeometry(3.5, 0.02, 3.5)
      const floor = new THREE.Mesh(floorGeo, litFloorMat)
      floor.position.y = y + 0.02
      buildingGroup.add(floor)
    }

    // Level 2: Middle Tier (+0.0 to +1.6)
    const l2GlassGeo = new THREE.BoxGeometry(2.9, 1.6, 2.9)
    const l2Glass = new THREE.Mesh(l2GlassGeo, glassMat)
    const l2Wire = new THREE.Mesh(l2GlassGeo, wireMat)
    l2Glass.position.y = 0.65
    l2Wire.position.y = 0.65
    buildingGroup.add(l2Glass)
    buildingGroup.add(l2Wire)

    for (let y = 0.0; y <= 1.4; y += 0.45) {
      const slabGeo = new THREE.BoxGeometry(3.0, 0.04, 3.0)
      const slab = new THREE.Mesh(slabGeo, steelFrameMat)
      slab.position.y = y
      buildingGroup.add(slab)

      const floorGeo = new THREE.BoxGeometry(2.8, 0.02, 2.8)
      const floor = new THREE.Mesh(floorGeo, litFloorMat)
      floor.position.y = y + 0.02
      buildingGroup.add(floor)
    }

    // Level 3: Penthouse / Crown Under Construction (+1.6 to +2.8)
    const l3Geo = new THREE.BoxGeometry(2.2, 1.2, 2.2)
    const l3Mesh = new THREE.Mesh(l3Geo, concreteMat)
    const l3Wire = new THREE.Mesh(l3Geo, wireMat)
    l3Mesh.position.y = 2.05
    l3Wire.position.y = 2.05
    buildingGroup.add(l3Mesh)
    buildingGroup.add(l3Wire)

    // Exposed rebar columns extending from rooftop under construction
    const rebarMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.3 })
    const rebarCoords = [[-0.9, -0.9], [0.9, -0.9], [0.9, 0.9], [-0.9, 0.9], [0, -0.9], [0, 0.9]]
    rebarCoords.forEach(([rx, rz]) => {
      const rebarGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8)
      const rebar = new THREE.Mesh(rebarGeo, rebarMat)
      rebar.position.set(rx, 2.95, rz)
      buildingGroup.add(rebar)
    })

    // ----------------------------------------------------------------
    // 5. Heavy-Duty Construction Tower Crane
    // ----------------------------------------------------------------
    const craneGroup = new THREE.Group()
    craneGroup.position.set(-2.5, -1.98, -2.0)
    siteMaster.add(craneGroup)

    const craneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Construction gold/amber
      metalness: 0.85,
      roughness: 0.25,
    })

    const craneDarkMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.3,
    })

    // Crane Foundation Base Anchor
    const cBaseGeo = new THREE.BoxGeometry(0.9, 0.3, 0.9)
    const cBase = new THREE.Mesh(cBaseGeo, craneDarkMat)
    cBase.position.y = 0.15
    craneGroup.add(cBase)

    // Crane Mast (Lattice Vertical Tower)
    const mastGeo = new THREE.BoxGeometry(0.35, 5.6, 0.35)
    const mast = new THREE.Mesh(mastGeo, craneGoldMat)
    mast.position.y = 2.95
    craneGroup.add(mast)

    // Crane Mast Wireframe (Truss effect)
    const mastWireGeo = new THREE.BoxGeometry(0.38, 5.6, 0.38)
    const mastWire = new THREE.Mesh(mastWireGeo, wireMat)
    mastWire.position.y = 2.95
    craneGroup.add(mastWire)

    // Crane Cabin
    const cabinGeo = new THREE.BoxGeometry(0.5, 0.45, 0.45)
    const cabin = new THREE.Mesh(cabinGeo, craneDarkMat)
    cabin.position.set(0.15, 5.75, 0.15)
    craneGroup.add(cabin)

    // Rotating Jib & Boom Arm Group
    const jibGroup = new THREE.Group()
    jibGroup.position.y = 5.8
    craneGroup.add(jibGroup)

    // Main Jib Arm (Extending forward over the building)
    const jibGeo = new THREE.BoxGeometry(4.2, 0.14, 0.14)
    const jib = new THREE.Mesh(jibGeo, craneGoldMat)
    jib.position.x = 1.7
    jibGroup.add(jib)

    // Crane Jib Truss Top Cable Peak (A-frame tower)
    const peakGeo = new THREE.ConeGeometry(0.2, 0.7, 4)
    const peak = new THREE.Mesh(peakGeo, craneGoldMat)
    peak.position.set(0, 0.45, 0)
    jibGroup.add(peak)

    // Counterweight at the back
    const counterGeo = new THREE.BoxGeometry(0.7, 0.35, 0.35)
    const counter = new THREE.Mesh(counterGeo, craneDarkMat)
    counter.position.x = -0.7
    jibGroup.add(counter)

    // Crane Trolley, Hoist Cable & Active Load
    const trolleyGeo = new THREE.BoxGeometry(0.25, 0.1, 0.2)
    const trolley = new THREE.Mesh(trolleyGeo, craneDarkMat)
    trolley.position.set(2.4, -0.1, 0)
    jibGroup.add(trolley)

    const cableGeo = new THREE.CylinderGeometry(0.012, 0.012, 2.0, 4)
    const cableMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const cable = new THREE.Mesh(cableGeo, cableMat)
    cable.position.set(2.4, -1.1, 0)
    jibGroup.add(cable)

    // Suspended Architectural Construction Precast Block
    const loadGeo = new THREE.BoxGeometry(0.55, 0.4, 0.55)
    const loadMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
    })
    const load = new THREE.Mesh(loadGeo, loadMat)
    load.position.set(2.4, -2.25, 0)
    jibGroup.add(load)

    // ----------------------------------------------------------------
    // 6. Lighting & Atmosphere
    // ----------------------------------------------------------------
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x064e3b, 1.4)
    scene.add(hemiLight)

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 3.2)
    sunLight.position.set(6, 9, 8)
    scene.add(sunLight)

    const fillLight = new THREE.PointLight(0x34d399, 2.5, 16)
    fillLight.position.set(-4, 3, 4)
    scene.add(fillLight)

    const pCount = isMobile ? 25 : 50
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 12
      pPos[i * 3 + 1] = Math.random() * 8 - 2
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 7. Interaction & Animation Loop
    // ----------------------------------------------------------------
    let targetRotY = 0.4
    let targetRotX = 0.08
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = 0.4 + x * 0.22
      targetRotX = 0.08 - y * 0.1
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

        // Crane Jib realistic smooth rotating sweep
        jibGroup.rotation.y = Math.sin(t * 0.5) * 0.55 + 0.3

        // Suspended load slight swaying motion
        load.rotation.y = Math.sin(t * 1.2) * 0.15

        particles.rotation.y = t * 0.01
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 8. Resize Observer & Cleanup
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
      className="w-full h-full relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
