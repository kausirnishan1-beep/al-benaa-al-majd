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
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 11.5)
    camera.lookAt(0, 0, 0)

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

    const connectionMaster = new THREE.Group()
    scene.add(connectionMaster)

    // ----------------------------------------------------------------
    // 1. LEFT: AL BENAA AL RAHAB 3D Skyscraper Architecture (Deep Green)
    // ----------------------------------------------------------------
    const benaaGroup = new THREE.Group()
    benaaGroup.position.set(-3.6, 0, 0)
    connectionMaster.add(benaaGroup)

    const benaaGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a6b52,
      emissive: 0x06241b,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.9,
    })

    const benaaMullionMat = new THREE.MeshStandardMaterial({
      color: 0x0f4c3a,
      metalness: 0.85,
      roughness: 0.3,
    })

    const benaaLitFloorMat = new THREE.MeshStandardMaterial({
      color: 0x6ee7b7,
      emissive: 0x10b981,
      emissiveIntensity: 0.4,
      roughness: 0.4,
    })

    // Skyscraper Main Glass Volume
    const bTowerGeo = new THREE.BoxGeometry(1.6, 4.0, 1.6)
    const bTowerMesh = new THREE.Mesh(bTowerGeo, benaaGlassMat)
    benaaGroup.add(bTowerMesh)

    // Tower Foundation Slab
    const bBaseGeo = new THREE.BoxGeometry(2.4, 0.3, 2.4)
    const bBaseMesh = new THREE.Mesh(bBaseGeo, benaaMullionMat)
    bBaseMesh.position.y = -2.15
    benaaGroup.add(bBaseMesh)

    // Floor Slabs & Mullions
    for (let i = -1.8; i <= 1.8; i += 0.45) {
      const slabGeo = new THREE.BoxGeometry(1.66, 0.04, 1.66)
      const slabMesh = new THREE.Mesh(slabGeo, benaaMullionMat)
      slabMesh.position.y = i
      benaaGroup.add(slabMesh)

      if (Math.abs(i) < 1.4) {
        const floorGeo = new THREE.BoxGeometry(1.5, 0.02, 1.5)
        const floorMesh = new THREE.Mesh(floorGeo, benaaLitFloorMat)
        floorMesh.position.y = i + 0.02
        benaaGroup.add(floorMesh)
      }
    }

    // Corner Vertical Columns
    const colCoords = [[-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8]]
    colCoords.forEach(([cx, cz]) => {
      const colGeo = new THREE.BoxGeometry(0.08, 4.0, 0.08)
      const colMesh = new THREE.Mesh(colGeo, benaaMullionMat)
      colMesh.position.set(cx, 0, cz)
      benaaGroup.add(colMesh)
    })

    // Tower Crown Spire
    const bSpireGeo = new THREE.CylinderGeometry(0.02, 0.08, 1.2, 8)
    const bSpire = new THREE.Mesh(bSpireGeo, benaaMullionMat)
    bSpire.position.set(0, 2.6, 0)
    benaaGroup.add(bSpire)

    const bBeaconGeo = new THREE.SphereGeometry(0.06, 12, 12)
    const bBeaconMat = new THREE.MeshBasicMaterial({ color: 0x34d399 })
    const bBeacon = new THREE.Mesh(bBeaconGeo, bBeaconMat)
    bBeacon.position.set(0, 3.25, 0)
    benaaGroup.add(bBeacon)

    // ----------------------------------------------------------------
    // 2. RIGHT: AL MAJD LINES 3D Global Trade & Freight Globe (Royal Gold)
    // ----------------------------------------------------------------
    const majdGroup = new THREE.Group()
    majdGroup.position.set(3.6, 0, 0)
    connectionMaster.add(majdGroup)

    const majdGlobeMat = new THREE.MeshPhongMaterial({
      color: 0x3a2803,
      emissive: 0x1f1400,
      emissiveIntensity: 0.6,
      shininess: 90,
      transparent: true,
      opacity: 0.88,
    })

    const majdWireMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })

    const mGlobeGeo = new THREE.SphereGeometry(1.4, 28, 28)
    const mGlobeMesh = new THREE.Mesh(mGlobeGeo, majdGlobeMat)
    const mGlobeWire = new THREE.Mesh(mGlobeGeo, majdWireMat)
    majdGroup.add(mGlobeMesh)
    majdGroup.add(mGlobeWire)

    // Orbital Radiant Golden Ring 1
    const mRingGeo1 = new THREE.TorusGeometry(2.0, 0.022, 16, 60)
    const mRingMat1 = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.75,
    })
    const mOrbit1 = new THREE.Mesh(mRingGeo1, mRingMat1)
    mOrbit1.rotation.x = Math.PI / 3
    majdGroup.add(mOrbit1)

    // Orbital Blue Ring 2
    const mRingGeo2 = new THREE.TorusGeometry(2.2, 0.018, 16, 60)
    const mRingMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    })
    const mOrbit2 = new THREE.Mesh(mRingGeo2, mRingMat2)
    mOrbit2.rotation.x = -Math.PI / 4
    mOrbit2.rotation.y = Math.PI / 4
    majdGroup.add(mOrbit2)

    // Logistics Base Pedestal
    const mBaseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.3, 24)
    const mBaseMat = new THREE.MeshStandardMaterial({
      color: 0x241904,
      metalness: 0.85,
      roughness: 0.3,
    })
    const mBaseMesh = new THREE.Mesh(mBaseGeo, mBaseMat)
    mBaseMesh.position.y = -2.15
    majdGroup.add(mBaseMesh)

    // ----------------------------------------------------------------
    // 3. CENTER: Unified Commercial Alliance Core & Spline Energy Beams
    // ----------------------------------------------------------------
    const centerGroup = new THREE.Group()
    connectionMaster.add(centerGroup)

    // Central Crystalline Nexus (Octahedron Diamond)
    const coreCrystalGeo = new THREE.OctahedronGeometry(0.7, 0)
    const coreCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x2dd4bf,
      emissiveIntensity: 0.65,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.9,
    })
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, coreCrystalMat)
    centerGroup.add(coreCrystal)

    // Central Rotating Synergy Rings
    const cRingGeo1 = new THREE.TorusGeometry(1.1, 0.018, 16, 48)
    const cRingMat1 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 })
    const cRing1 = new THREE.Mesh(cRingGeo1, cRingMat1)
    centerGroup.add(cRing1)

    const cRingGeo2 = new THREE.TorusGeometry(1.25, 0.018, 16, 48)
    const cRingMat2 = new THREE.MeshBasicMaterial({ color: 0xd4a017, transparent: true, opacity: 0.8 })
    const cRing2 = new THREE.Mesh(cRingGeo2, cRingMat2)
    cRing2.rotation.x = Math.PI / 2
    centerGroup.add(cRing2)

    // Dynamic Spline Energy Corridors (Double Helix Synergy)
    const curvePoints1 = [
      new THREE.Vector3(-2.8, 0.4, 0),
      new THREE.Vector3(-1.4, 0.9, 0.6),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.4, -0.9, -0.6),
      new THREE.Vector3(2.8, -0.4, 0),
    ]
    const spline1 = new THREE.CatmullRomCurve3(curvePoints1)
    const tubeGeo1 = new THREE.TubeGeometry(spline1, 48, 0.035, 8, false)
    const tubeMat1 = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.8,
    })
    const tube1 = new THREE.Mesh(tubeGeo1, tubeMat1)
    connectionMaster.add(tube1)

    const curvePoints2 = [
      new THREE.Vector3(-2.8, -0.4, 0),
      new THREE.Vector3(-1.4, -0.9, -0.6),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.4, 0.9, 0.6),
      new THREE.Vector3(2.8, 0.4, 0),
    ]
    const spline2 = new THREE.CatmullRomCurve3(curvePoints2)
    const tubeGeo2 = new THREE.TubeGeometry(spline2, 48, 0.035, 8, false)
    const tubeMat2 = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.8,
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
    // 4. Lighting & Ambient Particles
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(THREE_COLORS.LIGHTS.ambient, 0.9))

    const pBenaa = new THREE.PointLight(0x10b981, 3.2, 20)
    pBenaa.position.set(-4, 3, 4)
    scene.add(pBenaa)

    const pMajd = new THREE.PointLight(0xd4a017, 3.2, 20)
    pMajd.position.set(4, 3, 4)
    scene.add(pMajd)

    const pCore = new THREE.PointLight(0x2dd4bf, 2.5, 12)
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
      targetRotY = x * 0.22
      targetRotX = -y * 0.12
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

        // Left Tower subtle floating
        benaaGroup.position.y = Math.sin(t * 1.2) * 0.08
        benaaGroup.rotation.y = Math.sin(t * 0.5) * 0.1

        // Right Globe rotation & orbits
        majdGroup.position.y = Math.cos(t * 1.2) * 0.08
        mGlobeMesh.rotation.y = t * 0.2
        mGlobeWire.rotation.y = t * 0.2
        mOrbit1.rotation.z += 0.005
        mOrbit2.rotation.z -= 0.004

        // Center Core crystal & rings
        coreCrystal.rotation.x = t * 0.6
        coreCrystal.rotation.y = t * 0.8
        cRing1.rotation.z = t * 0.5
        cRing2.rotation.y = -t * 0.4

        // Moving Energy Packets
        packetT1 = (packetT1 + 0.008) % 1
        packetT2 = (packetT2 + 0.008) % 1
        packet1.position.copy(spline1.getPoint(packetT1))
        packet2.position.copy(spline2.getPoint(packetT2))

        // Beacon pulsing
        const pulse = (Math.sin(t * 4.0) + 1) / 2
        bBeaconMat.color.setRGB(0.2, 0.8 + pulse * 0.2, 0.5)

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
