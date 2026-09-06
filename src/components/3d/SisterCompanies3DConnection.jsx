import { useEffect, useRef } from 'react'
import * as THREE from 'three'
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
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    const cameraZ = isMobile ? 14.2 : 11.0
    const cameraY = isMobile ? 1.4 : 1.2
    camera.position.set(0, cameraY, cameraZ)
    camera.lookAt(0, -0.3, 0)

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

    // ----------------------------------------------------------------
    // Environment Map (PMREM) for natural architectural reflections
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0.0, '#064e3b') // Deep Green
    skyGrad.addColorStop(0.25, '#0284c7') // Sky Blue
    skyGrad.addColorStop(0.5, '#fef08a') // Soft Horizon Gold
    skyGrad.addColorStop(0.65, '#334155') // Slate
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
    const masterScale = isMobile ? 0.74 : 1.0
    connectionMaster.scale.set(masterScale, masterScale, masterScale)
    connectionMaster.position.y = -0.3
    scene.add(connectionMaster)

    // ----------------------------------------------------------------
    // 0. Clean Ground Campus Plaza (Dark Slate Platform)
    // ----------------------------------------------------------------
    const plazaGroup = new THREE.Group()
    connectionMaster.add(plazaGroup)

    const plazaGeo = new THREE.BoxGeometry(10.8, 0.22, 5.0)
    const plazaMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.45,
      metalness: 0.6,
    })
    const plazaMesh = new THREE.Mesh(plazaGeo, plazaMat)
    plazaMesh.position.y = -2.15
    plazaGroup.add(plazaMesh)

    const groundGrid = new THREE.GridHelper(10.2, 16, 0x334155, 0x1e293b)
    groundGrid.position.y = -2.03
    plazaGroup.add(groundGrid)

    // Left Edge Marker (Green) & Right Edge Marker (Gold)
    const edgeGeo = new THREE.BoxGeometry(5.2, 0.03, 0.04)
    const edgeMatGreen = new THREE.MeshBasicMaterial({ color: 0x10b981 })
    const edgeMatGold = new THREE.MeshBasicMaterial({ color: 0xf59e0b })

    const edgeLeft = new THREE.Mesh(edgeGeo, edgeMatGreen)
    edgeLeft.position.set(-2.6, -2.03, 2.5)
    plazaGroup.add(edgeLeft)

    const edgeRight = new THREE.Mesh(edgeGeo, edgeMatGold)
    edgeRight.position.set(2.6, -2.03, 2.5)
    plazaGroup.add(edgeRight)

    // ----------------------------------------------------------------
    // 1. LEFT: AL BENAA 🟢 (Green Corporate Skyscraper)
    // ----------------------------------------------------------------
    const benaaGroup = new THREE.Group()
    benaaGroup.position.set(-3.6, 0, 0)
    connectionMaster.add(benaaGroup)

    // Emerald Green Tinted Architectural Solar Glass
    const benaaGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x34d399,
      emissive: 0x064e3b,
      emissiveIntensity: 0.2,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.65,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    })

    const benaaMullionMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.24,
    })

    const benaaPodiumMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.05,
      roughness: 0.8,
    })

    const benaaGreenAccent = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2,
    })

    // Tower Lower Body (Tier 1)
    const bTowerGeo1 = new THREE.BoxGeometry(1.6, 2.6, 1.6)
    const bTowerMesh1 = new THREE.Mesh(bTowerGeo1, benaaGlassMat)
    bTowerMesh1.position.y = -0.6
    benaaGroup.add(bTowerMesh1)

    // Tower Upper Body (Tier 2 Setback)
    const bTowerGeo2 = new THREE.BoxGeometry(1.3, 1.8, 1.3)
    const bTowerMesh2 = new THREE.Mesh(bTowerGeo2, benaaGlassMat)
    bTowerMesh2.position.y = 1.4
    benaaGroup.add(bTowerMesh2)

    // Foundation Base Slabs
    const bBaseGeo1 = new THREE.BoxGeometry(2.4, 0.22, 2.4)
    const bBaseMesh1 = new THREE.Mesh(bBaseGeo1, benaaPodiumMat)
    bBaseMesh1.position.y = -1.93
    benaaGroup.add(bBaseMesh1)

    // Horizontal Floor Slabs
    for (let y = -1.6; y <= 2.1; y += 0.38) {
      const isUpper = y > 0.5
      const width = isUpper ? 1.34 : 1.66
      const slabGeo = new THREE.BoxGeometry(width, 0.04, width)
      const slabMesh = new THREE.Mesh(slabGeo, benaaMullionMat)
      slabMesh.position.y = y
      benaaGroup.add(slabMesh)
    }

    // Vertical Facade Mullions
    const colCoords = [
      [-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8],
      [0, -0.8], [0, 0.8], [-0.8, 0], [0.8, 0],
    ]
    colCoords.forEach(([cx, cz]) => {
      const colGeo = new THREE.BoxGeometry(0.06, 2.6, 0.06)
      const colMesh = new THREE.Mesh(colGeo, benaaMullionMat)
      colMesh.position.set(cx, -0.6, cz)
      benaaGroup.add(colMesh)
    })

    // Crown & Green Spire
    const bSpireGeo = new THREE.CylinderGeometry(0.02, 0.08, 1.1, 12)
    const bSpire = new THREE.Mesh(bSpireGeo, benaaGreenAccent)
    bSpire.position.set(0, 3.15, 0)
    benaaGroup.add(bSpire)

    const bBeaconGeo = new THREE.SphereGeometry(0.07, 12, 12)
    const bBeaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 })
    const bBeacon = new THREE.Mesh(bBeaconGeo, bBeaconMat)
    bBeacon.position.set(0, 3.75, 0)
    benaaGroup.add(bBeacon)

    // ----------------------------------------------------------------
    // 2. RIGHT: AL MAJD 🟡 (Gold Global Trade & Logistics Hub)
    // ----------------------------------------------------------------
    const majdGroup = new THREE.Group()
    majdGroup.position.set(3.6, 0, 0)
    connectionMaster.add(majdGroup)

    const majdGlobeMat = new THREE.MeshPhongMaterial({
      color: 0x051326,
      emissive: 0x020a14,
      emissiveIntensity: 0.5,
      shininess: 90,
      transparent: true,
      opacity: 0.9,
    })

    const majdGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    })

    const majdGoldWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })

    const mGlobeGeo = new THREE.SphereGeometry(1.35, 26, 26)
    const mGlobeMesh = new THREE.Mesh(mGlobeGeo, majdGlobeMat)
    mGlobeMesh.position.y = 0.15
    const mGlobeWire = new THREE.Mesh(mGlobeGeo, majdGoldWireMat)
    mGlobeWire.position.y = 0.15
    majdGroup.add(mGlobeMesh)
    majdGroup.add(mGlobeWire)

    // Golden Orbital Rings
    const mRingGeo1 = new THREE.TorusGeometry(1.9, 0.02, 16, 48)
    const mOrbit1 = new THREE.Mesh(mRingGeo1, majdGoldMat)
    mOrbit1.position.y = 0.15
    mOrbit1.rotation.x = Math.PI / 3.2
    majdGroup.add(mOrbit1)

    const mRingGeo2 = new THREE.TorusGeometry(2.1, 0.016, 16, 48)
    const mOrbit2 = new THREE.Mesh(mRingGeo2, majdGoldMat)
    mOrbit2.position.y = 0.15
    mOrbit2.rotation.x = -Math.PI / 4
    mOrbit2.rotation.y = Math.PI / 4
    majdGroup.add(mOrbit2)

    // Logistics Ground Pedestal
    const mBaseGeo = new THREE.CylinderGeometry(1.5, 1.7, 0.25, 28)
    const mBaseMesh = new THREE.Mesh(mBaseGeo, benaaMullionMat)
    mBaseMesh.position.y = -1.93
    majdGroup.add(mBaseMesh)

    // ----------------------------------------------------------------
    // 3. CENTER: CONNECTION 🔵 (Refined Teal Architectural Bridge)
    // ----------------------------------------------------------------
    const centerGroup = new THREE.Group()
    centerGroup.position.set(0, 0.1, 0)
    connectionMaster.add(centerGroup)

    // Central Teal Synergy Nexus
    const coreCrystalGeo = new THREE.OctahedronGeometry(0.55, 0)
    const coreCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x14b8a6, // Pure Teal
      emissive: 0x0f766e,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
    })
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, coreCrystalMat)
    centerGroup.add(coreCrystal)

    // Architectural Sky-Bridge Conduits (Teal Connection)
    const bridgeGeo = new THREE.CylinderGeometry(0.045, 0.045, 7.2, 12)
    const bridgeMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6, // Teal Connection Corridor
      transparent: true,
      opacity: 0.85,
    })
    const bridgeMesh = new THREE.Mesh(bridgeGeo, bridgeMat)
    bridgeMesh.rotation.z = Math.PI / 2
    bridgeMesh.position.set(0, 0.1, 0)
    connectionMaster.add(bridgeMesh)

    // Subtle Moving Teal Supply/Signal Packets
    const packetGeo = new THREE.SphereGeometry(0.07, 10, 10)
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf })
    const packet1 = new THREE.Mesh(packetGeo, packetMat)
    const packet2 = new THREE.Mesh(packetGeo, packetMat)
    connectionMaster.add(packet1)
    connectionMaster.add(packet2)

    // ----------------------------------------------------------------
    // 4. Lighting (Clean Daylight + Brand Accent Bounce)
    // ----------------------------------------------------------------
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.35)
    scene.add(hemiLight)

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.8)
    sunLight.position.set(4, 8, 7)
    scene.add(sunLight)

    // Green bounce on left, Teal bounce in center, Gold bounce on right
    const pGreen = new THREE.PointLight(0x10b981, 2.2, 14)
    pGreen.position.set(-4, 2, 3)
    scene.add(pGreen)

    const pTeal = new THREE.PointLight(0x14b8a6, 2.0, 12)
    pTeal.position.set(0, 1, 3)
    scene.add(pTeal)

    const pGold = new THREE.PointLight(0xf59e0b, 2.2, 14)
    pGold.position.set(4, 2, 3)
    scene.add(pGold)

    // ----------------------------------------------------------------
    // 5. Interaction & Animation Loop
    // ----------------------------------------------------------------
    let targetRotY = 0
    let targetRotX = 0
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = x * 0.16
      targetRotX = -y * 0.06
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

        // Right Globe calm rotation
        mGlobeMesh.rotation.y = t * 0.18
        mGlobeWire.rotation.y = t * 0.18
        mOrbit1.rotation.z += 0.003
        mOrbit2.rotation.z -= 0.0025

        // Center Teal Nexus calm rotation
        coreCrystal.rotation.x = t * 0.4
        coreCrystal.rotation.y = t * 0.5

        // Moving Teal Signals along bridge (-3.0 to +3.0)
        packetT1 = (packetT1 + 0.006) % 1
        packetT2 = (packetT2 + 0.006) % 1
        packet1.position.set(-3.0 + packetT1 * 6.0, 0.1, 0)
        packet2.position.set(3.0 - packetT2 * 6.0, 0.1, 0)

        // Pulsing Green Beacon on left skyscraper
        const beaconPulse = Math.sin(t * 3.5) > 0.2 ? 1 : 0.2
        bBeaconMat.color.setRGB(0.06 * beaconPulse, 0.8 * beaconPulse, 0.5 * beaconPulse)
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
      ref={containerRef}
      className="w-full h-full min-h-[360px] md:min-h-[440px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Sister Companies Commercial Connection: Al Benaa Green + Al Majd Gold + Teal Synergy Bridge"
    />
  )
}
