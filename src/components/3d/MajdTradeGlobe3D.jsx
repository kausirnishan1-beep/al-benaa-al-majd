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
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 8.5)
    camera.lookAt(0, 0, 0)

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
    // 1. Deep Oceanic Sapphire Blue 3D Globe (Scaled to fit within box)
    // ----------------------------------------------------------------
    const globeRadius = 1.7
    const globeGeo = new THREE.SphereGeometry(
      globeRadius,
      isMobile ? 24 : 38,
      isMobile ? 24 : 38
    )
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x0a1e38, // Deep Royal Navy Blue
      emissive: 0x051326,
      emissiveIntensity: 0.6,
      shininess: 95,
      transparent: true,
      opacity: 0.88,
    })
    const globeMesh = new THREE.Mesh(globeGeo, globeMat)
    globeMaster.add(globeMesh)

    // Latitude & Longitude Cyan/Blue Wireframe Grid
    const wireGeo = new THREE.SphereGeometry(
      globeRadius + 0.02,
      isMobile ? 18 : 26,
      isMobile ? 18 : 26
    )
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Radiant Sky Blue / Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    globeMaster.add(wireMesh)

    // ----------------------------------------------------------------
    // 2. Global Trade Corridor Hubs
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

    const pinGeo = new THREE.SphereGeometry(0.065, 12, 12)
    const hubPositions = {}

    Object.entries(hubs).forEach(([key, info]) => {
      const pos = latLngToVector3(info.lat, info.lng, globeRadius + 0.04)
      hubPositions[key] = pos

      const pinMat = new THREE.MeshBasicMaterial({
        color: key === 'primaryHub' ? 0xffffff : 0x38bdf8,
      })
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.copy(pos)
      globeMaster.add(pin)

      if (key === 'primaryHub') {
        const ringGeo = new THREE.RingGeometry(0.09, 0.13, 24)
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.copy(pos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        globeMaster.add(ring)
      }
    })

    // ----------------------------------------------------------------
    // 3. Glowing Blue & Cyan Curved Trade Routes
    // ----------------------------------------------------------------
    const createArc = (p1, p2, colorHex) => {
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const distance = p1.distanceTo(p2)
      mid.normalize().multiplyScalar(globeRadius + distance * 0.42)

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const tubeGeo = new THREE.TubeGeometry(curve, isMobile ? 24 : 48, 0.02, 8, false)
      const tubeMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.8,
      })
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat)
      globeMaster.add(tubeMesh)
      return { curve, tubeMesh }
    }

    const tradeArcs = [
      createArc(hubPositions.primaryHub, hubPositions.routeA, 0x38bdf8),
      createArc(hubPositions.primaryHub, hubPositions.routeB, 0x60a5fa),
      createArc(hubPositions.primaryHub, hubPositions.routeC, 0x2dd4bf),
      createArc(hubPositions.primaryHub, hubPositions.routeD, 0x93c5fd),
    ]

    // ----------------------------------------------------------------
    // 4. Moving Logistics Cargo Indicators
    // ----------------------------------------------------------------
    const cargoGeo = new THREE.SphereGeometry(0.065, 10, 10)
    const cargoMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const movingCargo = tradeArcs.map((arc, index) => {
      const mesh = new THREE.Mesh(cargoGeo, cargoMat)
      globeMaster.add(mesh)
      return { mesh, curve: arc.curve, speed: 0.005 + index * 0.0015, t: index * 0.25 }
    })

    // ----------------------------------------------------------------
    // 5. Orbital Radiant Blue Rings (Strictly fitted within container)
    // ----------------------------------------------------------------
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.016, 16, isMobile ? 40 : 80)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    })
    const orbit1 = new THREE.Mesh(ringGeo1, ringMat1)
    orbit1.rotation.x = Math.PI / 3
    globeMaster.add(orbit1)

    const ringGeo2 = new THREE.TorusGeometry(2.55, 0.014, 16, isMobile ? 40 : 80)
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.6,
    })
    const orbit2 = new THREE.Mesh(ringGeo2, ringMat2)
    orbit2.rotation.x = -Math.PI / 4
    orbit2.rotation.y = Math.PI / 4
    globeMaster.add(orbit2)

    // ----------------------------------------------------------------
    // 6. Natural Blue Atmosphere Lighting & Cosmic Particles
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(THREE_COLORS.LIGHTS.ambient, 0.9))
    const pBlueKey = new THREE.PointLight(0x38bdf8, 3.2, 25)
    pBlueKey.position.set(5, 5, 5)
    scene.add(pBlueKey)

    const pAzureFill = new THREE.PointLight(0x1d4ed8, 2.5, 20)
    pAzureFill.position.set(-5, 4, -4)
    scene.add(pAzureFill)

    const pCount = isMobile ? 30 : 65
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 9
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
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
      targetRotY = x * 0.25
      targetRotX = -y * 0.12
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
      className="w-full h-full min-h-[320px] lg:min-h-[400px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
