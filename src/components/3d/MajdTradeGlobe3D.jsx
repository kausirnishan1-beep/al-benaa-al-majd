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

export default function MajdTradeGlobe3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1.8, 8.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    container.appendChild(renderer.domElement)

    const globeMaster = new THREE.Group()
    scene.add(globeMaster)

    // ----------------------------------------------------------------
    // 1. Dark Premium 3D Globe
    // ----------------------------------------------------------------
    const globeRadius = 2.4
    const globeGeo = new THREE.SphereGeometry(
      globeRadius,
      isMobile ? 20 : 36,
      isMobile ? 20 : 36
    )
    const globeMat = new THREE.MeshPhongMaterial({
      color: THREE_COLORS.MAJD.core,
      emissive: THREE_COLORS.MAJD.coreEmissive,
      emissiveIntensity: 0.5,
      shininess: 90,
      transparent: true,
      opacity: 0.88,
    })
    const globeMesh = new THREE.Mesh(globeGeo, globeMat)
    globeMaster.add(globeMesh)

    // Latitude & Longitude Wireframe Grid
    const wireGeo = new THREE.SphereGeometry(
      globeRadius + 0.02,
      isMobile ? 16 : 24,
      isMobile ? 16 : 24
    )
    const wireMat = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.MAJD.light,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    globeMaster.add(wireMesh)

    // ----------------------------------------------------------------
    // 2. Generic Global Trade Corridor Points
    // ----------------------------------------------------------------
    const latLngToVector3 = (lat, lng, radius) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      const x = -(radius * Math.sin(phi) * Math.cos(theta))
      const z = radius * Math.sin(phi) * Math.sin(theta)
      const y = radius * Math.cos(phi)
      return new THREE.Vector3(x, y, z)
    }

    const hubs = {
      primaryHub: { lat: 24.7136, lng: 46.6753 },
      routeA: { lat: 31.2304, lng: 121.4737 },
      routeB: { lat: 48.8566, lng: 2.3522 },
      routeC: { lat: 25.2048, lng: 55.2708 },
      routeD: { lat: 1.3521, lng: 103.8198 },
    }

    const pinGeo = new THREE.SphereGeometry(0.08, 12, 12)
    const hubPositions = {}

    Object.entries(hubs).forEach(([key, info]) => {
      const pos = latLngToVector3(info.lat, info.lng, globeRadius + 0.05)
      hubPositions[key] = pos

      const pinMat = new THREE.MeshBasicMaterial({
        color: key === 'primaryHub' ? THREE_COLORS.NEUTRALS.white : THREE_COLORS.MAJD.light,
      })
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.copy(pos)
      globeMaster.add(pin)

      if (key === 'primaryHub') {
        const ringGeo = new THREE.RingGeometry(0.12, 0.16, 24)
        const ringMat = new THREE.MeshBasicMaterial({
          color: THREE_COLORS.TEAL.primary,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.copy(pos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        globeMaster.add(ring)
      }
    })

    // ----------------------------------------------------------------
    // 3. Glowing Curved Trade Routes (Quadratic Bezier)
    // ----------------------------------------------------------------
    const createArc = (p1, p2, colorHex) => {
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const distance = p1.distanceTo(p2)
      mid.normalize().multiplyScalar(globeRadius + distance * 0.45)

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const tubeGeo = new THREE.TubeGeometry(curve, isMobile ? 24 : 48, 0.025, 8, false)
      const tubeMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.75,
      })
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat)
      globeMaster.add(tubeMesh)
      return { curve, tubeMesh }
    }

    const tradeArcs = [
      createArc(hubPositions.primaryHub, hubPositions.routeA, THREE_COLORS.AMBER.primary),
      createArc(hubPositions.primaryHub, hubPositions.routeB, THREE_COLORS.BENAA.light),
      createArc(hubPositions.primaryHub, hubPositions.routeC, THREE_COLORS.MAJD.light),
      createArc(hubPositions.primaryHub, hubPositions.routeD, THREE_COLORS.AMBER.light),
    ]

    // ----------------------------------------------------------------
    // 4. Moving Logistics Cargo Indicators
    // ----------------------------------------------------------------
    const cargoGeo = new THREE.SphereGeometry(0.08, 10, 10)
    const cargoMat = new THREE.MeshBasicMaterial({ color: THREE_COLORS.NEUTRALS.white })
    const movingCargo = tradeArcs.map((arc, index) => {
      const mesh = new THREE.Mesh(cargoGeo, cargoMat)
      globeMaster.add(mesh)
      return { mesh, curve: arc.curve, speed: 0.005 + index * 0.0015, t: index * 0.25 }
    })

    // ----------------------------------------------------------------
    // 5. Orbital Golden Rings
    // ----------------------------------------------------------------
    const ringGeo1 = new THREE.TorusGeometry(3.3, 0.02, 16, isMobile ? 40 : 80)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.MAJD.light,
      transparent: true,
      opacity: 0.65,
    })
    const orbit1 = new THREE.Mesh(ringGeo1, ringMat1)
    orbit1.rotation.x = Math.PI / 3
    globeMaster.add(orbit1)

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.018, 16, isMobile ? 40 : 80)
    const orbit2 = new THREE.Mesh(ringGeo2, ringMat1)
    orbit2.rotation.x = -Math.PI / 4
    orbit2.rotation.y = Math.PI / 4
    globeMaster.add(orbit2)

    // ----------------------------------------------------------------
    // 6. Lighting & Cosmic Particles
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(THREE_COLORS.LIGHTS.ambient, 0.85))
    const pGold = new THREE.PointLight(THREE_COLORS.MAJD.light, 3.0, 25)
    pGold.position.set(5, 5, 5)
    scene.add(pGold)

    const pTeal = new THREE.PointLight(THREE_COLORS.BENAA.light, 2.0, 20)
    pTeal.position.set(-5, 4, -4)
    scene.add(pTeal)

    const pCount = isMobile ? 35 : 80
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: THREE_COLORS.MAJD.light,
      size: 0.05,
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
      targetRotY = x * 0.3
      targetRotX = -y * 0.15
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
        globeMaster.rotation.y += (targetRotY - globeMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR + 0.001
        globeMaster.rotation.x += (targetRotX - globeMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        orbit1.rotation.z += 0.004
        orbit2.rotation.z -= 0.003

        movingCargo.forEach((c) => {
          c.t = (c.t + c.speed) % 1
          const pt = c.curve.getPoint(c.t)
          c.mesh.position.copy(pt)
        })

        particles.rotation.y = t * 0.01
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
      className="w-full h-full min-h-[320px] lg:min-h-[420px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
