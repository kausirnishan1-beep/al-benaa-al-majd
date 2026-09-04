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

export default function SisterCompanies3DConnection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    const scene = new THREE.Scene()
    // Camera positioned with an architectural grounded perspective
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1.2, 11.2)
    camera.lookAt(0, -0.3, 0)

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
    // Environment Map (PMREM) for photorealistic architectural reflections
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0.0, '#1e40af')
    skyGrad.addColorStop(0.3, '#60a5fa')
    skyGrad.addColorStop(0.5, '#bfdbfe')
    skyGrad.addColorStop(0.55, '#fef08a')
    skyGrad.addColorStop(0.65, '#334155')
    skyGrad.addColorStop(1.0, '#0f172a')
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    const sunGrad = ctx.createRadialGradient(360, 80, 0, 360, 80, 70)
    sunGrad.addColorStop(0, '#ffffff')
    sunGrad.addColorStop(0.3, '#fffbeb')
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(290, 10, 140, 140)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    const connectionMaster = new THREE.Group()
    connectionMaster.position.y = -0.3
    scene.add(connectionMaster)

    // ----------------------------------------------------------------
    // 0. GRAND CORPORATE GROUND PLAZA & CAMPUS FOUNDATION (Firmly Grounded)
    // ----------------------------------------------------------------
    const plazaGroup = new THREE.Group()
    connectionMaster.add(plazaGroup)

    // Main Architectural Plaza Slab (Granite / Dark Titanium Platform)
    const plazaGeo = new THREE.BoxGeometry(10.8, 0.22, 5.0)
    const plazaMat = new THREE.MeshStandardMaterial({
      color: 0x111c2e,
      roughness: 0.35,
      metalness: 0.75,
    })
    const plazaMesh = new THREE.Mesh(plazaGeo, plazaMat)
    plazaMesh.position.y = -2.15
    plazaGroup.add(plazaMesh)

    // Lower Sub-Foundation Chamfer Step
    const subPlazaGeo = new THREE.BoxGeometry(11.4, 0.16, 5.6)
    const subPlazaMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.7,
      metalness: 0.5,
    })
    const subPlazaMesh = new THREE.Mesh(subPlazaGeo, subPlazaMat)
    subPlazaMesh.position.y = -2.32
    plazaGroup.add(subPlazaMesh)

    // Sleek Architectural Ground Grid
    const groundGrid = new THREE.GridHelper(10.2, 16, 0x38bdf8, 0x1e3a5f)
    groundGrid.position.y = -2.03
    groundGrid.material.opacity = 0.45
    groundGrid.material.transparent = true
    plazaGroup.add(groundGrid)

    // Glowing Perimeter Ground Accent Lines (Cyan & Amber edge runners)
    const edgeGeo = new THREE.BoxGeometry(10.84, 0.03, 0.04)
    const edgeMatCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
    const edgeFront = new THREE.Mesh(edgeGeo, edgeMatCyan)
    edgeFront.position.set(0, -2.03, 2.5)
    plazaGroup.add(edgeFront)

    const edgeBack = new THREE.Mesh(edgeGeo, edgeMatCyan)
    edgeBack.position.set(0, -2.03, -2.5)
    plazaGroup.add(edgeBack)

    // Central Ground Runway / Inter-Campus Transit Pathway
    const runwayGeo = new THREE.BoxGeometry(6.4, 0.02, 0.35)
    const runwayMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8,
    })
    const runwayMesh = new THREE.Mesh(runwayGeo, runwayMat)
    runwayMesh.position.set(0, -2.03, 0)
    plazaGroup.add(runwayMesh)

    // ----------------------------------------------------------------
    // 1. LEFT: AL BENAA AL RAHAB 3D Skyscraper (Grounded Firmly on Plaza)
    // ----------------------------------------------------------------
    const benaaGroup = new THREE.Group()
    benaaGroup.position.set(-3.6, 0, 0)
    connectionMaster.add(benaaGroup)

    // Crystal Architectural Solar Glass
    const benaaGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.6,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
    })

    // Anodized Silver Architectural Steel Mullions & Columns
    const benaaMullionMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.88,
      roughness: 0.22,
    })

    // Glowing Illuminated Warm Office Interior Floors
    const benaaLitFloorMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.45,
      roughness: 0.35,
    })

    // Architectural Fair-Faced Concrete Podium Base
    const benaaPodiumMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.15,
      roughness: 0.6,
    })

    // Gold Architectural Spire & Crown Accent
    const benaaGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    })

    // Main Tower Glass Volume (Tier 1: Lower Body)
    const bTowerGeo1 = new THREE.BoxGeometry(1.6, 2.6, 1.6)
    const bTowerMesh1 = new THREE.Mesh(bTowerGeo1, benaaGlassMat)
    bTowerMesh1.position.y = -0.6
    benaaGroup.add(bTowerMesh1)

    // Tower Glass Volume (Tier 2: Upper Setback)
    const bTowerGeo2 = new THREE.BoxGeometry(1.3, 1.8, 1.3)
    const bTowerMesh2 = new THREE.Mesh(bTowerGeo2, benaaGlassMat)
    bTowerMesh2.position.y = 1.4
    benaaGroup.add(bTowerMesh2)

    // Foundation Base Slabs anchored directly to the ground plaza
    const bBaseGeo1 = new THREE.BoxGeometry(2.5, 0.22, 2.5)
    const bBaseMesh1 = new THREE.Mesh(bBaseGeo1, benaaPodiumMat)
    bBaseMesh1.position.y = -1.93
    benaaGroup.add(bBaseMesh1)

    const bBaseGeo2 = new THREE.BoxGeometry(2.1, 0.15, 2.1)
    const bBaseMesh2 = new THREE.Mesh(bBaseGeo2, benaaMullionMat)
    bBaseMesh2.position.y = -1.78
    benaaGroup.add(bBaseMesh2)

    // Ground Contact Shadow Disc
    const bShadowGeo = new THREE.CircleGeometry(1.5, 24)
    const bShadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    })
    const bShadowMesh = new THREE.Mesh(bShadowGeo, bShadowMat)
    bShadowMesh.rotation.x = -Math.PI / 2
    bShadowMesh.position.y = -2.03
    benaaGroup.add(bShadowMesh)

    // Horizontal Floor Slabs & Warm Glowing Office Levels
    for (let y = -1.6; y <= 2.1; y += 0.38) {
      const isUpper = y > 0.5
      const width = isUpper ? 1.34 : 1.66
      const slabGeo = new THREE.BoxGeometry(width, 0.04, width)
      const slabMesh = new THREE.Mesh(slabGeo, benaaMullionMat)
      slabMesh.position.y = y
      benaaGroup.add(slabMesh)

      // Illuminated floor plate
      const floorWidth = width - 0.1
      const floorGeo = new THREE.BoxGeometry(floorWidth, 0.02, floorWidth)
      const floorMesh = new THREE.Mesh(floorGeo, benaaLitFloorMat)
      floorMesh.position.y = y + 0.02
      benaaGroup.add(floorMesh)
    }

    // Vertical Facade Mullion Fins (Lower Tier)
    const colCoords1 = [
      [-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8],
      [0, -0.8], [0, 0.8], [-0.8, 0], [0.8, 0],
    ]
    colCoords1.forEach(([cx, cz]) => {
      const colGeo = new THREE.BoxGeometry(0.06, 2.6, 0.06)
      const colMesh = new THREE.Mesh(colGeo, benaaMullionMat)
      colMesh.position.set(cx, -0.6, cz)
      benaaGroup.add(colMesh)
    })

    // Vertical Facade Mullion Fins (Upper Tier)
    const colCoords2 = [
      [-0.65, -0.65], [0.65, -0.65], [0.65, 0.65], [-0.65, 0.65],
      [0, -0.65], [0, 0.65], [-0.65, 0], [0.65, 0],
    ]
    colCoords2.forEach(([cx, cz]) => {
      const colGeo = new THREE.BoxGeometry(0.05, 1.8, 0.05)
      const colMesh = new THREE.Mesh(colGeo, benaaMullionMat)
      colMesh.position.set(cx, 1.4, cz)
      benaaGroup.add(colMesh)
    })

    // Rooftop Mechanical Crown & Spire
    const bCrownGeo = new THREE.BoxGeometry(0.9, 0.35, 0.9)
    const bCrownMesh = new THREE.Mesh(bCrownGeo, benaaMullionMat)
    bCrownMesh.position.y = 2.48
    benaaGroup.add(bCrownMesh)

    const bSpireGeo = new THREE.CylinderGeometry(0.02, 0.08, 1.1, 12)
    const bSpire = new THREE.Mesh(bSpireGeo, benaaGoldMat)
    bSpire.position.set(0, 3.15, 0)
    benaaGroup.add(bSpire)

    const bBeaconGeo = new THREE.SphereGeometry(0.07, 16, 16)
    const bBeaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    const bBeacon = new THREE.Mesh(bBeaconGeo, bBeaconMat)
    bBeacon.position.set(0, 3.75, 0)
    benaaGroup.add(bBeacon)

    // ----------------------------------------------------------------
    // 2. RIGHT: AL MAJD LINES 3D Global Trade & Freight Hub (Grounded)
    // ----------------------------------------------------------------
    const majdGroup = new THREE.Group()
    majdGroup.position.set(3.6, 0, 0)
    connectionMaster.add(majdGroup)

    const majdGlobeMat = new THREE.MeshPhongMaterial({
      color: 0x0f2b48,
      emissive: 0x081b2e,
      emissiveIntensity: 0.55,
      shininess: 95,
      transparent: true,
      opacity: 0.88,
    })

    const majdWireMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })

    const mGlobeGeo = new THREE.SphereGeometry(1.35, 28, 28)
    const mGlobeMesh = new THREE.Mesh(mGlobeGeo, majdGlobeMat)
    mGlobeMesh.position.y = 0.15
    const mGlobeWire = new THREE.Mesh(mGlobeGeo, majdWireMat)
    mGlobeWire.position.y = 0.15
    majdGroup.add(mGlobeMesh)
    majdGroup.add(mGlobeWire)

    // Orbital Golden Ring 1
    const mRingGeo1 = new THREE.TorusGeometry(1.9, 0.022, 16, 60)
    const mRingMat1 = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.8,
    })
    const mOrbit1 = new THREE.Mesh(mRingGeo1, mRingMat1)
    mOrbit1.position.y = 0.15
    mOrbit1.rotation.x = Math.PI / 3
    majdGroup.add(mOrbit1)

    // Orbital Blue Ring 2
    const mRingGeo2 = new THREE.TorusGeometry(2.1, 0.018, 16, 60)
    const mRingMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    })
    const mOrbit2 = new THREE.Mesh(mRingGeo2, mRingMat2)
    mOrbit2.position.y = 0.15
    mOrbit2.rotation.x = -Math.PI / 4
    mOrbit2.rotation.y = Math.PI / 4
    majdGroup.add(mOrbit2)

    // Logistics Ground Pedestal & Beveled Plinth (Solid Ground Anchor)
    const mBaseGeo1 = new THREE.CylinderGeometry(1.6, 1.8, 0.22, 28)
    const mBaseMat1 = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.25,
    })
    const mBaseMesh1 = new THREE.Mesh(mBaseGeo1, mBaseMat1)
    mBaseMesh1.position.y = -1.93
    majdGroup.add(mBaseMesh1)

    const mBaseGeo2 = new THREE.CylinderGeometry(1.3, 1.5, 0.25, 28)
    const mBaseMat2 = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.2,
    })
    const mBaseMesh2 = new THREE.Mesh(mBaseGeo2, mBaseMat2)
    mBaseMesh2.position.y = -1.72
    majdGroup.add(mBaseMesh2)

    // Illuminated Gold Anchor Ring around base
    const mBaseGlowGeo = new THREE.TorusGeometry(1.62, 0.02, 16, 36)
    const mBaseGlowMat = new THREE.MeshBasicMaterial({ color: 0xd4a017 })
    const mBaseGlow = new THREE.Mesh(mBaseGlowGeo, mBaseGlowMat)
    mBaseGlow.rotation.x = Math.PI / 2
    mBaseGlow.position.y = -1.82
    majdGroup.add(mBaseGlow)

    // Ground Contact Shadow Disc
    const mShadowGeo = new THREE.CircleGeometry(1.6, 24)
    const mShadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    })
    const mShadowMesh = new THREE.Mesh(mShadowGeo, mShadowMat)
    mShadowMesh.rotation.x = -Math.PI / 2
    mShadowMesh.position.y = -2.03
    majdGroup.add(mShadowMesh)

    // ----------------------------------------------------------------
    // 3. CENTER: Unified Commercial Alliance Core & Spline Energy Beams
    // ----------------------------------------------------------------
    const centerGroup = new THREE.Group()
    centerGroup.position.set(0, 0.1, 0)
    connectionMaster.add(centerGroup)

    // Central Crystalline Nexus (Octahedron Diamond)
    const coreCrystalGeo = new THREE.OctahedronGeometry(0.68, 0)
    const coreCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x2dd4bf,
      emissiveIntensity: 0.75,
      roughness: 0.08,
      metalness: 0.9,
      transparent: true,
      opacity: 0.92,
    })
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, coreCrystalMat)
    centerGroup.add(coreCrystal)

    // Central Rotating Synergy Rings
    const cRingGeo1 = new THREE.TorusGeometry(1.1, 0.018, 16, 48)
    const cRingMat1 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.85 })
    const cRing1 = new THREE.Mesh(cRingGeo1, cRingMat1)
    centerGroup.add(cRing1)

    const cRingGeo2 = new THREE.TorusGeometry(1.25, 0.018, 16, 48)
    const cRingMat2 = new THREE.MeshBasicMaterial({ color: 0xd4a017, transparent: true, opacity: 0.85 })
    const cRing2 = new THREE.Mesh(cRingGeo2, cRingMat2)
    cRing2.rotation.x = Math.PI / 2
    centerGroup.add(cRing2)

    // Dynamic Spline Energy Corridors (Double Helix Synergy)
    const curvePoints1 = [
      new THREE.Vector3(-2.8, 0.4, 0),
      new THREE.Vector3(-1.4, 0.8, 0.5),
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(1.4, -0.6, -0.5),
      new THREE.Vector3(2.8, -0.2, 0),
    ]
    const spline1 = new THREE.CatmullRomCurve3(curvePoints1)
    const tubeGeo1 = new THREE.TubeGeometry(spline1, 48, 0.035, 8, false)
    const tubeMat1 = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.85,
    })
    const tube1 = new THREE.Mesh(tubeGeo1, tubeMat1)
    connectionMaster.add(tube1)

    const curvePoints2 = [
      new THREE.Vector3(-2.8, -0.3, 0),
      new THREE.Vector3(-1.4, -0.7, -0.5),
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(1.4, 0.8, 0.5),
      new THREE.Vector3(2.8, 0.4, 0),
    ]
    const spline2 = new THREE.CatmullRomCurve3(curvePoints2)
    const tubeGeo2 = new THREE.TubeGeometry(spline2, 48, 0.035, 8, false)
    const tubeMat2 = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.85,
    })
    const tube2 = new THREE.Mesh(tubeGeo2, tubeMat2)
    connectionMaster.add(tube2)

    // Moving Data / Supply Packets
    const packetGeo = new THREE.SphereGeometry(0.08, 12, 12)
    const packetMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const packet1 = new THREE.Mesh(packetGeo, packetMat1)
    const packet2 = new THREE.Mesh(packetGeo, packetMat1)
    connectionMaster.add(packet1)
    connectionMaster.add(packet2)

    // ----------------------------------------------------------------
    // 4. Lighting & Ambient Particles (Direct Architectural Illumination)
    // ----------------------------------------------------------------
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.4)
    scene.add(hemiLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // Direct Sun Key Light on Left Skyscraper (Brilliant architectural illumination)
    const pBenaaKey = new THREE.DirectionalLight(0xfffbeb, 3.2)
    pBenaaKey.position.set(-5, 7, 7)
    scene.add(pBenaaKey)

    const pBenaaFill = new THREE.PointLight(0x60a5fa, 2.5, 18)
    pBenaaFill.position.set(-4, 2, 4)
    scene.add(pBenaaFill)

    // Direct Key Light on Right Trade Globe
    const pMajdKey = new THREE.DirectionalLight(0xfffaed, 2.8)
    pMajdKey.position.set(5, 7, 7)
    scene.add(pMajdKey)

    const pMajdFill = new THREE.PointLight(0xd4a017, 2.8, 18)
    pMajdFill.position.set(4, 2, 4)
    scene.add(pMajdFill)

    const pCore = new THREE.PointLight(0x2dd4bf, 2.2, 12)
    pCore.position.set(0, 0, 2)
    scene.add(pCore)

    const pCount = isMobile ? 35 : 75
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 16
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 5. Interaction: Mouse Parallax & Viewport Observer
    // ----------------------------------------------------------------
    let targetRotY = 0
    let targetRotX = 0
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = x * 0.18
      targetRotX = -y * 0.08
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const viewportObserver = createViewportObserver(container, (visible) => {
      isVisible = visible
    })

    let animId
    const clock = new THREE.Clock()
    let packetT1 = 0
    let packetT2 = 0.5

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        connectionMaster.rotation.y +=
          (targetRotY - connectionMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        connectionMaster.rotation.x +=
          (targetRotX - connectionMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Firmly grounded - no floating bobbing of buildings or bases!
        // Right Globe rotation & orbits on its grounded plinth
        mGlobeMesh.rotation.y = t * 0.2
        mGlobeWire.rotation.y = t * 0.2
        mOrbit1.rotation.z += 0.005
        mOrbit2.rotation.z -= 0.004

        // Center Core crystal & rings
        coreCrystal.rotation.x = t * 0.6
        coreCrystal.rotation.y = t * 0.8
        cRing1.rotation.z = t * 0.5
        cRing2.rotation.y = -t * 0.4

        // Moving Energy Packets along spline
        packetT1 = (packetT1 + 0.008) % 1
        packetT2 = (packetT2 + 0.008) % 1
        packet1.position.copy(spline1.getPoint(packetT1))
        packet2.position.copy(spline2.getPoint(packetT2))

        // Beacon pulsing on skyscraper top
        const pulse = (Math.sin(t * 4.0) + 1) / 2
        bBeaconMat.color.setRGB(0.2, 0.8 + pulse * 0.2, 1.0)

        particles.rotation.y = t * 0.01
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 6. Resize Handling
    // ----------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)

    // ----------------------------------------------------------------
    // 7. Cleanup on Unmount
    // ----------------------------------------------------------------
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
      className="w-full h-full min-h-[360px] md:min-h-[440px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
