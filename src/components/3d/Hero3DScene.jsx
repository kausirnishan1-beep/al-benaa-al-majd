import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 3, 14)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Master 3D Group
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // ----------------------------------------------------
    // 1. AL-BENAA: 3D Architectural Blueprint Structures
    // ----------------------------------------------------
    const buildingGroup = new THREE.Group()
    buildingGroup.position.set(-2.8, -1.2, 0)
    masterGroup.add(buildingGroup)

    // Emerald & Cyan Wireframe materials
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    })

    const solidBuildingMat = new THREE.MeshPhongMaterial({
      color: 0x06241b,
      transparent: true,
      opacity: 0.85,
      shininess: 90,
      specular: 0x2dd4bf,
    })

    // Skyscraper 1 (Main Tower)
    const towerGeo1 = new THREE.BoxGeometry(1.6, 5.2, 1.6)
    const towerMesh1 = new THREE.Mesh(towerGeo1, solidBuildingMat)
    towerMesh1.position.y = 2.6
    const towerWire1 = new THREE.Mesh(towerGeo1, wireframeMat)
    towerWire1.position.y = 2.6
    buildingGroup.add(towerMesh1)
    buildingGroup.add(towerWire1)

    // Skyscraper 2 (Secondary Tower)
    const towerGeo2 = new THREE.BoxGeometry(1.4, 3.8, 1.4)
    const towerMesh2 = new THREE.Mesh(towerGeo2, solidBuildingMat)
    towerMesh2.position.set(1.4, 1.9, 0.4)
    const towerWire2 = new THREE.Mesh(towerGeo2, wireframeMat)
    towerWire2.position.set(1.4, 1.9, 0.4)
    buildingGroup.add(towerMesh2)
    buildingGroup.add(towerWire2)

    // Skyscraper 3 (Terraced Tower)
    const towerGeo3 = new THREE.BoxGeometry(1.2, 2.8, 1.2)
    const towerMesh3 = new THREE.Mesh(towerGeo3, solidBuildingMat)
    towerMesh3.position.set(-1.3, 1.4, 0.5)
    const towerWire3 = new THREE.Mesh(towerGeo3, wireframeMat)
    towerWire3.position.set(-1.3, 1.4, 0.5)
    buildingGroup.add(towerMesh3)
    buildingGroup.add(towerWire3)

    // Blueprint Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0xd4a017, 0x1b4d3e)
    gridHelper.position.y = 0
    buildingGroup.add(gridHelper)

    // ----------------------------------------------------
    // 2. AL-MAJD: 3D Global Trade & Supply Chain Sphere
    // ----------------------------------------------------
    const tradeGroup = new THREE.Group()
    tradeGroup.position.set(2.6, 1.2, 0)
    masterGroup.add(tradeGroup)

    // Golden Wireframe Globe
    const globeGeo = new THREE.SphereGeometry(2.2, 24, 24)
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const globeMesh = new THREE.Mesh(globeGeo, globeMat)
    tradeGroup.add(globeMesh)

    // Inner glowing sphere
    const innerGlobeGeo = new THREE.SphereGeometry(1.9, 32, 32)
    const innerGlobeMat = new THREE.MeshPhongMaterial({
      color: 0x402e03,
      emissive: 0x684b06,
      transparent: true,
      opacity: 0.6,
      shininess: 80,
    })
    const innerGlobeMesh = new THREE.Mesh(innerGlobeGeo, innerGlobeMat)
    tradeGroup.add(innerGlobeMesh)

    // Orbital Trade Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    })
    const ringGeo1 = new THREE.TorusGeometry(3.0, 0.03, 16, 100)
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1)
    ringMesh1.rotation.x = Math.PI / 3
    ringMesh1.rotation.y = Math.PI / 6
    tradeGroup.add(ringMesh1)

    const ringGeo2 = new THREE.TorusGeometry(3.4, 0.02, 16, 100)
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat1)
    ringMesh2.rotation.x = -Math.PI / 4
    ringMesh2.rotation.y = Math.PI / 3
    tradeGroup.add(ringMesh2)

    // Trade Transit Nodes (Glowing Points on Orbit)
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const nodeCount = 5
    const orbitalNodes = []

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat)
      tradeGroup.add(node)
      orbitalNodes.push({
        mesh: node,
        speed: 0.015 + i * 0.005,
        radius: 3.0,
        angle: (i * Math.PI * 2) / nodeCount,
      })
    }

    // ----------------------------------------------------
    // 3. Ambient Floating Particles (Gold & Cyan Dust)
    // ----------------------------------------------------
    const particleCount = 200
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorGold = new THREE.Color(0xd4a017)
    const colorCyan = new THREE.Color(0x2dd4bf)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12

      const mixedColor = Math.random() > 0.5 ? colorGold : colorCyan
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ----------------------------------------------------
    // 4. Lighting
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const pointLightCyan = new THREE.PointLight(0x2dd4bf, 2.5, 30)
    pointLightCyan.position.set(-5, 4, 6)
    scene.add(pointLightCyan)

    const pointLightGold = new THREE.PointLight(0xd4a017, 3, 30)
    pointLightGold.position.set(5, 3, 6)
    scene.add(pointLightGold)

    // ----------------------------------------------------
    // 5. Mouse Parallax Interaction
    // ----------------------------------------------------
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseX = x
      mouseY = y
      targetRotationY = mouseX * 0.35
      targetRotationX = -mouseY * 0.2
    }

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect()
        const touch = e.touches[0]
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1)
        mouseX = x
        mouseY = y
        targetRotationY = mouseX * 0.35
        targetRotationX = -mouseY * 0.2
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // ----------------------------------------------------
    // 6. Animation Loop
    // ----------------------------------------------------
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse damping
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.05
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.05

      // Continuous subtle rotations
      buildingGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.15
      globeMesh.rotation.y += 0.005
      globeMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1
      innerGlobeMesh.rotation.y -= 0.003
      ringMesh1.rotation.z += 0.008
      ringMesh2.rotation.z -= 0.006

      // Animate orbital nodes
      orbitalNodes.forEach((node) => {
        node.angle += node.speed
        node.mesh.position.x = Math.cos(node.angle) * node.radius
        node.mesh.position.y = Math.sin(node.angle) * (node.radius * 0.5)
        node.mesh.position.z = Math.sin(node.angle) * (node.radius * 0.8)
      })

      // Particle floating drift
      particles.rotation.y = elapsedTime * 0.02
      particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // ----------------------------------------------------
    // 7. Resize Observer
    // ----------------------------------------------------
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })

    resizeObserver.observe(container)

    // ----------------------------------------------------
    // Cleanup
    // ----------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      resizeObserver.disconnect()

      // Dispose Three.js resources to prevent memory leaks
      towerGeo1.dispose()
      towerGeo2.dispose()
      towerGeo3.dispose()
      globeGeo.dispose()
      innerGlobeGeo.dispose()
      ringGeo1.dispose()
      ringGeo2.dispose()
      nodeGeo.dispose()
      particleGeo.dispose()

      wireframeMat.dispose()
      solidBuildingMat.dispose()
      globeMat.dispose()
      innerGlobeMat.dispose()
      ringMat1.dispose()
      nodeMat.dispose()
      particleMat.dispose()

      renderer.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] lg:min-h-[480px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
