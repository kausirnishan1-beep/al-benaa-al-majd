import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  BRAND_COLORS,
  MATERIAL_COLORS,
  ENVIRONMENT_COLORS,
} from '../../utils/three-colors.js'
import {
  THREE_TIMING,
  isReducedMotion,
  getDeviceTier,
  getAdaptiveConfig,
  getStandardPixelRatio,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'

export default function MajdTradeGlobe3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const adaptive = getAdaptiveConfig()
    const isMobile = adaptive.tier === 'mobile'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, isMobile ? 9.6 : 8.4)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: adaptive.enableAntialias,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(getStandardPixelRatio())
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    container.appendChild(renderer.domElement)

    const globeMaster = new THREE.Group()
    const globeScale = isMobile ? 0.78 : 0.92
    globeMaster.scale.set(globeScale, globeScale, globeScale)
    scene.add(globeMaster)

    // ----------------------------------------------------------------
    // 1. Deep Royal Navy Oceanic Core Sphere
    // ----------------------------------------------------------------
    const globeRadius = 1.7
    const globeGeo = new THREE.SphereGeometry(
      globeRadius,
      adaptive.globeSegments,
      adaptive.globeSegments
    )
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x051326, // Deep Royal Navy Blue
      emissive: 0x020a14,
      emissiveIntensity: 0.6,
      shininess: 90,
      transparent: true,
      opacity: 0.92,
    })
    const globeMesh = new THREE.Mesh(globeGeo, globeMat)
    globeMaster.add(globeMesh)

    // Geodesic / Latitude-Longitude Coordinate Grid (Gold)
    const wireGeo = new THREE.SphereGeometry(
      globeRadius + 0.02,
      isMobile ? 18 : 26,
      isMobile ? 18 : 26
    )
    const wireMat = new THREE.MeshBasicMaterial({
      color: BRAND_COLORS.MAJD.light, // Warm Gold Grid
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    globeMaster.add(wireMesh)

    // ----------------------------------------------------------------
    // 2. Generic Global Trade Network Nodes (Fibonacci Sphere Topology)
    // ----------------------------------------------------------------
    const numNodes = adaptive.networkNodes
    const nodePositions = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10)
    const nodeGoldMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.interior.warmIlluminatedFloor,
      emissive: BRAND_COLORS.MAJD.light,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    })

    const nodeTealMat = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.TEAL.primary,
      emissive: BRAND_COLORS.TEAL.dark,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    })

    for (let i = 0; i < numNodes; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numNodes)
      const r = globeRadius + 0.04

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi)
      const z = r * Math.sin(phi) * Math.sin(theta)
      const pos = new THREE.Vector3(x, y, z)
      nodePositions.push(pos)

      const isPrimary = i % 3 === 0
      const nodeMesh = new THREE.Mesh(nodeGeo, isPrimary ? nodeGoldMat : nodeTealMat)
      nodeMesh.position.copy(pos)
      globeMaster.add(nodeMesh)

      // Pulsing pulse rings on key nodes
      if (isPrimary) {
        const ringGeo = new THREE.RingGeometry(0.06, 0.09, 16)
        const ringMat = new THREE.MeshBasicMaterial({
          color: BRAND_COLORS.AMBER.primary, // Micro-amber highlight
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.copy(pos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        globeMaster.add(ring)
      }
    }

    // ----------------------------------------------------------------
    // 3. Generic Global Trade Network Arcs (Mathematical Interconnection)
    // ----------------------------------------------------------------
    const createNetworkArc = (p1, p2, colorHex) => {
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const dist = p1.distanceTo(p2)
      // Raise arc higher depending on distance across the globe
      mid.normalize().multiplyScalar(globeRadius + Math.min(dist * 0.35, 0.75))

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const tubeGeo = new THREE.TubeGeometry(
        curve,
        adaptive.tier === 'mobile' ? 20 : 36,
        0.016,
        6,
        false
      )
      const tubeMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.65,
      })
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat)
      globeMaster.add(tubeMesh)
      return { curve, tubeMesh }
    }

    const networkArcs = []
    const arcConnections = adaptive.networkArcs
    for (let i = 0; i < arcConnections; i++) {
      const idxA = (i * 2) % numNodes
      const idxB = (i * 2 + 5) % numNodes
      // Gold Primary with Muted Teal connection
      const colorHex = i % 2 === 0 ? BRAND_COLORS.MAJD.light : BRAND_COLORS.TEAL.primary
      const arc = createNetworkArc(nodePositions[idxA], nodePositions[idxB], colorHex)
      networkArcs.push(arc)
    }

    // ----------------------------------------------------------------
    // 4. Moving Trade Logistics Data Packets (Dynamic Stream)
    // ----------------------------------------------------------------
    const packetGeo = new THREE.SphereGeometry(0.05, 8, 8)
    const packetGoldMat = new THREE.MeshBasicMaterial({ color: ENVIRONMENT_COLORS.sun.keyLight })
    const packetTealMat = new THREE.MeshBasicMaterial({ color: BRAND_COLORS.TEAL.light })

    const movingPackets = networkArcs.map((arc, index) => {
      const mesh = new THREE.Mesh(packetGeo, index % 2 === 0 ? packetGoldMat : packetTealMat)
      globeMaster.add(mesh)
      return {
        mesh,
        curve: arc.curve,
        speed: 0.004 + (index % 5) * 0.0012,
        t: (index * 0.17) % 1,
      }
    })

    // ----------------------------------------------------------------
    // 5. Concentric Gold & Dark Gold Orbital Logistics Rings
    // ----------------------------------------------------------------
    const ringGeo1 = new THREE.TorusGeometry(
      2.35,
      0.016,
      adaptive.torusSegments.radial,
      adaptive.torusSegments.tubular
    )
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.MAJD.light,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    })
    const orbit1 = new THREE.Mesh(ringGeo1, ringMat1)
    orbit1.rotation.x = Math.PI / 3.2
    globeMaster.add(orbit1)

    const ringGeo2 = new THREE.TorusGeometry(
      2.55,
      0.014,
      adaptive.torusSegments.radial,
      adaptive.torusSegments.tubular
    )
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.MAJD.dark,
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.7,
    })
    const orbit2 = new THREE.Mesh(ringGeo2, ringMat2)
    orbit2.rotation.x = -Math.PI / 4.2
    orbit2.rotation.y = Math.PI / 4
    globeMaster.add(orbit2)

    // Orbital satellite markers
    const satGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08)
    const satMat = new THREE.MeshBasicMaterial({ color: ENVIRONMENT_COLORS.sun.keyLight })
    const satellite1 = new THREE.Mesh(satGeo, satMat)
    orbit1.add(satellite1)
    satellite1.position.x = 2.35

    const satellite2 = new THREE.Mesh(satGeo, satMat)
    orbit2.add(satellite2)
    satellite2.position.x = 2.55

    // ----------------------------------------------------------------
    // 6. Gold & Warm Atmosphere Lighting & Dust
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(ENVIRONMENT_COLORS.lighting.ambientStudio, 0.9))

    const goldKeyLight = new THREE.PointLight(ENVIRONMENT_COLORS.lighting.majdBounce, 3.0, 25)
    goldKeyLight.position.set(5, 5, 5)
    scene.add(goldKeyLight)

    const goldFillLight = new THREE.PointLight(BRAND_COLORS.MAJD.dark, 2.0, 20)
    goldFillLight.position.set(-5, 4, -4)
    scene.add(goldFillLight)

    const pCount = adaptive.particleCount
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 9
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 7. Parallax & Viewport Observer
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
      targetRotX = -y * 0.1
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
        // Continuous organic global trade rotation + mouse parallax
        globeMaster.rotation.y +=
          (targetRotY - globeMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR + 0.0015
        globeMaster.rotation.x +=
          (targetRotX - globeMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        orbit1.rotation.z += 0.0035
        orbit2.rotation.z -= 0.0028

        movingPackets.forEach((p) => {
          p.t = (p.t + p.speed) % 1
          const pt = p.curve.getPoint(p.t)
          p.mesh.position.copy(pt)
        })

        particles.rotation.y = t * 0.008
      }

      renderer.render(scene, camera)
    }
    animate()

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
      className="w-full h-full min-h-[320px] lg:min-h-[400px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive Majd 3D Global Trade & Logistics Network Globe"
    />
  )
}
