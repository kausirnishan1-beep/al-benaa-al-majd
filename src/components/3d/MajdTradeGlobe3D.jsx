import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MajdTradeGlobe3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

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
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const globeMaster = new THREE.Group()
    scene.add(globeMaster)

    // ----------------------------------------------------------------
    // 1. Dark Premium 3D Globe
    // ----------------------------------------------------------------
    const globeRadius = 2.4
    const globeGeo = new THREE.SphereGeometry(globeRadius, 36, 36)
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x241a02,
      emissive: 0x4a3504,
      emissiveIntensity: 0.6,
      shininess: 90,
      transparent: true,
      opacity: 0.88,
    })
    const globeMesh = new THREE.Mesh(globeGeo, globeMat)
    globeMaster.add(globeMesh)

    // Latitude & Longitude Wireframe Grid
    const wireGeo = new THREE.SphereGeometry(globeRadius + 0.02, 24, 24)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    globeMaster.add(wireMesh)

    // ----------------------------------------------------------------
    // 2. Helper: Convert Lat/Lng to 3D Coordinates on Globe
    // ----------------------------------------------------------------
    const latLngToVector3 = (lat, lng, radius) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      const x = -(radius * Math.sin(phi) * Math.cos(theta))
      const z = radius * Math.sin(phi) * Math.sin(theta)
      const y = radius * Math.cos(phi)
      return new THREE.Vector3(x, y, z)
    }

    // Key Hubs
    const hubs = {
      riyadh: { lat: 24.7136, lng: 46.6753, name: 'Saudi Arabia (HQ)' },
      china: { lat: 31.2304, lng: 121.4737, name: 'China (Manufacturing)' },
      europe: { lat: 48.8566, lng: 2.3522, name: 'Europe (Industrial)' },
      gcc: { lat: 25.2048, lng: 55.2708, name: 'GCC (Trade Corridor)' },
      asia: { lat: 1.3521, lng: 103.8198, name: 'Southeast Asia' },
    }

    // Hub Pin Geometry
    const pinGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const hubPositions = {}
    const hubMarkers = []

    Object.entries(hubs).forEach(([key, info]) => {
      const pos = latLngToVector3(info.lat, info.lng, globeRadius + 0.05)
      hubPositions[key] = pos

      const pinMat = new THREE.MeshBasicMaterial({
        color: key === 'riyadh' ? 0xffffff : 0xf59e0b,
      })
      const pin = new THREE.Mesh(pinGeo, pinMat)
      pin.position.copy(pos)
      globeMaster.add(pin)
      hubMarkers.push(pin)

      // Pulsing Ring on Riyadh HQ
      if (key === 'riyadh') {
        const ringGeo = new THREE.RingGeometry(0.12, 0.16, 24)
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x2dd4bf,
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
    // 3. Glowing Curved Trade Routes (Splines)
    // ----------------------------------------------------------------
    const createArc = (p1, p2, colorHex) => {
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const distance = p1.distanceTo(p2)
      // Push mid point outward from globe center to form curved arc
      mid.normalize().multiplyScalar(globeRadius + distance * 0.45)

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.03, 8, false)
      const tubeMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.8,
      })
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat)
      globeMaster.add(tubeMesh)
      return { curve, tubeMesh, tubeGeo, tubeMat }
    }

    const tradeArcs = [
      createArc(hubPositions.riyadh, hubPositions.china, 0xf59e0b),
      createArc(hubPositions.riyadh, hubPositions.europe, 0x2dd4bf),
      createArc(hubPositions.riyadh, hubPositions.gcc, 0xd4a017),
      createArc(hubPositions.riyadh, hubPositions.asia, 0xfbbf24),
    ]

    // ----------------------------------------------------------------
    // 4. Moving Cargo Indicators on Trade Routes
    // ----------------------------------------------------------------
    const cargoGeo = new THREE.SphereGeometry(0.09, 12, 12)
    const cargoMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const movingCargo = tradeArcs.map((arc, index) => {
      const mesh = new THREE.Mesh(cargoGeo, cargoMat)
      globeMaster.add(mesh)
      return { mesh, curve: arc.curve, speed: 0.006 + index * 0.002, t: index * 0.25 }
    })

    // ----------------------------------------------------------------
    // 5. Orbital Golden Rings around the Globe
    // ----------------------------------------------------------------
    const ringGeo1 = new THREE.TorusGeometry(3.3, 0.025, 16, 100)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xd4a017, transparent: true, opacity: 0.7 })
    const orbit1 = new THREE.Mesh(ringGeo1, ringMat1)
    orbit1.rotation.x = Math.PI / 3
    globeMaster.add(orbit1)

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.02, 16, 100)
    const orbit2 = new THREE.Mesh(ringGeo2, ringMat1)
    orbit2.rotation.x = -Math.PI / 4
    orbit2.rotation.y = Math.PI / 4
    globeMaster.add(orbit2)

    // ----------------------------------------------------------------
    // 6. Lighting & Cosmic Particles
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const pGold = new THREE.PointLight(0xd4a017, 3.5, 25)
    pGold.position.set(5, 5, 5)
    scene.add(pGold)

    const pTeal = new THREE.PointLight(0x2dd4bf, 2.5, 20)
    pTeal.position.set(-5, 4, -4)
    scene.add(pTeal)

    const pCount = 130
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xd4a017,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 7. Mouse Parallax & Animation Loop
    // ----------------------------------------------------------------
    let targetRotY = 0
    let targetRotX = 0
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = x * 0.4
      targetRotX = -y * 0.2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      globeMaster.rotation.y += (targetRotY - globeMaster.rotation.y) * 0.04 + 0.002
      globeMaster.rotation.x += (targetRotX - globeMaster.rotation.x) * 0.04

      orbit1.rotation.z += 0.006
      orbit2.rotation.z -= 0.005

      // Move Cargo Indicators along Bezier arcs
      movingCargo.forEach((c) => {
        c.t = (c.t + c.speed) % 1
        const pt = c.curve.getPoint(c.t)
        c.mesh.position.copy(pt)
      })

      particles.rotation.y = t * 0.015

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
      ro.disconnect()

      globeGeo.dispose()
      wireGeo.dispose()
      pinGeo.dispose()
      ringGeo1.dispose()
      ringGeo2.dispose()
      cargoGeo.dispose()
      pGeo.dispose()

      tradeArcs.forEach((a) => {
        a.tubeGeo.dispose()
        a.tubeMat.dispose()
      })

      globeMat.dispose()
      wireMat.dispose()
      ringMat1.dispose()
      cargoMat.dispose()
      pMat.dispose()

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
