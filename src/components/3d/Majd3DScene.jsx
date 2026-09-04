import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Majd3DScene() {
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
    camera.position.set(0, 1.5, 8)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Outer Golden Wireframe Globe
    const globeGeo = new THREE.SphereGeometry(2.3, 28, 28)
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    masterGroup.add(globe)

    // Inner Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.8, 32, 32)
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x402e03,
      emissive: 0x684b06,
      transparent: true,
      opacity: 0.7,
      shininess: 90,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    masterGroup.add(core)

    // Orbital Trade Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })

    const ring1Geo = new THREE.TorusGeometry(3.1, 0.03, 16, 100)
    const ring1 = new THREE.Mesh(ring1Geo, ringMat)
    ring1.rotation.x = Math.PI / 3
    ring1.rotation.y = Math.PI / 6
    masterGroup.add(ring1)

    const ring2Geo = new THREE.TorusGeometry(3.5, 0.02, 16, 100)
    const ring2 = new THREE.Mesh(ring2Geo, ringMat)
    ring2.rotation.x = -Math.PI / 4
    ring2.rotation.y = Math.PI / 3
    masterGroup.add(ring2)

    // Moving Transit Nodes
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const nodes = []
    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat)
      masterGroup.add(node)
      nodes.push({
        mesh: node,
        speed: 0.018 + i * 0.006,
        radius: 3.1,
        angle: (i * Math.PI) / 2,
      })
    }

    // Golden Floating Particles
    const pCount = 140
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xd4a017,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const goldLight = new THREE.PointLight(0xd4a017, 3, 25)
    goldLight.position.set(4, 5, 6)
    scene.add(goldLight)

    // Mouse Tracking
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
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05 + 0.003
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05
      globe.rotation.y += 0.004
      core.rotation.y -= 0.002
      ring1.rotation.z += 0.007
      ring2.rotation.z -= 0.005

      nodes.forEach((n) => {
        n.angle += n.speed
        n.mesh.position.x = Math.cos(n.angle) * n.radius
        n.mesh.position.y = Math.sin(n.angle) * (n.radius * 0.5)
        n.mesh.position.z = Math.sin(n.angle) * (n.radius * 0.8)
      })

      particles.rotation.y = t * 0.02
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
      coreGeo.dispose()
      ring1Geo.dispose()
      ring2Geo.dispose()
      nodeGeo.dispose()
      pGeo.dispose()
      globeMat.dispose()
      coreMat.dispose()
      ringMat.dispose()
      nodeMat.dispose()
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
      className="w-full h-full min-h-[300px] lg:min-h-[400px] relative pointer-events-auto"
      aria-hidden="true"
    />
  )
}
