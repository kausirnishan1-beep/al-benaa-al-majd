import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Benaa3DScene() {
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
    camera.position.set(0, 2.5, 9)

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

    // Wireframe architectural structures
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })

    const solidMat = new THREE.MeshPhongMaterial({
      color: 0x06241b,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    })

    // Central Tower
    const geo1 = new THREE.BoxGeometry(1.8, 4.5, 1.8)
    const mesh1 = new THREE.Mesh(geo1, solidMat)
    const wire1 = new THREE.Mesh(geo1, wireMat)
    mesh1.position.y = 2.25
    wire1.position.y = 2.25
    masterGroup.add(mesh1)
    masterGroup.add(wire1)

    // Side Structure Left
    const geo2 = new THREE.CylinderGeometry(0.8, 1.0, 3.2, 8)
    const mesh2 = new THREE.Mesh(geo2, solidMat)
    const wire2 = new THREE.Mesh(geo2, wireMat)
    mesh2.position.set(-2.0, 1.6, 0.5)
    wire2.position.set(-2.0, 1.6, 0.5)
    masterGroup.add(mesh2)
    masterGroup.add(wire2)

    // Side Structure Right (Glass Cube Step)
    const geo3 = new THREE.BoxGeometry(1.4, 2.2, 1.4)
    const mesh3 = new THREE.Mesh(geo3, solidMat)
    const wire3 = new THREE.Mesh(geo3, wireMat)
    mesh3.position.set(2.0, 1.1, -0.4)
    wire3.position.set(2.0, 1.1, -0.4)
    masterGroup.add(mesh3)
    masterGroup.add(wire3)

    // Blueprint Ground Grid
    const grid = new THREE.GridHelper(12, 24, 0x2dd4bf, 0x0f3e30)
    grid.position.y = 0
    masterGroup.add(grid)

    // Floating structural ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 80)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.5 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.y = 2.5
    masterGroup.add(ring)

    // Floating Blueprint Dust
    const pCount = 120
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 1] = Math.random() * 8
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const cyanLight = new THREE.PointLight(0x2dd4bf, 2.5, 20)
    cyanLight.position.set(-4, 6, 5)
    scene.add(cyanLight)

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
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05 + 0.002
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05
      ring.rotation.z = t * 0.2
      particles.rotation.y = t * 0.03
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
      geo1.dispose()
      geo2.dispose()
      geo3.dispose()
      ringGeo.dispose()
      pGeo.dispose()
      wireMat.dispose()
      solidMat.dispose()
      ringMat.dispose()
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
