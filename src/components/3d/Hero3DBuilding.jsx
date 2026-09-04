import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DBuilding() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 4, 16)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Master Group for Mouse & Scroll Interaction
    const buildingMaster = new THREE.Group()
    scene.add(buildingMaster)

    // Materials
    const concretePodiumMat = new THREE.MeshStandardMaterial({
      color: 0x14201c,
      roughness: 0.6,
      metalness: 0.2,
    })

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e3a2f,
      emissive: 0x041a14,
      metalness: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    const goldRibMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.9,
      roughness: 0.3,
      emissive: 0x5a4103,
      emissiveIntensity: 0.6,
    })

    const cyanEdgeMat = new THREE.LineBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.75,
    })

    const windowLightMat = new THREE.MeshBasicMaterial({
      color: 0xffe8a3,
      transparent: true,
      opacity: 0.9,
    })

    // ----------------------------------------------------------------
    // 2. Main High-Rise Skyscraper (AL BENAA Architectural Masterpiece)
    // ----------------------------------------------------------------
    const towerGroup = new THREE.Group()
    towerGroup.position.set(-0.5, -2.5, 0)
    buildingMaster.add(towerGroup)

    // Foundation Podium
    const podiumGeo = new THREE.BoxGeometry(4.2, 0.8, 4.2)
    const podiumMesh = new THREE.Mesh(podiumGeo, concretePodiumMat)
    podiumMesh.position.y = 0.4
    towerGroup.add(podiumMesh)

    // Blueprint Grid at the Base
    const baseGrid = new THREE.GridHelper(10, 20, 0xd4a017, 0x1b4d3e)
    baseGrid.position.y = 0.01
    towerGroup.add(baseGrid)

    // Multi-Tier Main Tower
    const floorCount = 14
    const floorHeight = 0.52
    const baseWidth = 2.4

    for (let f = 0; f < floorCount; f++) {
      const taper = 1 - (f / floorCount) * 0.32
      const w = baseWidth * taper
      const d = baseWidth * taper
      const yPos = 0.8 + f * floorHeight + floorHeight / 2

      // Glass floor slab
      const floorGeo = new THREE.BoxGeometry(w, floorHeight * 0.92, d)
      const floorMesh = new THREE.Mesh(floorGeo, glassMat)
      floorMesh.position.y = yPos
      towerGroup.add(floorMesh)

      // Wireframe contour lines
      const edgeGeo = new THREE.EdgesGeometry(floorGeo)
      const edgeLine = new THREE.LineSegments(edgeGeo, cyanEdgeMat)
      edgeLine.position.y = yPos
      towerGroup.add(edgeLine)

      // Random glowing office windows inside floors
      if (f % 2 === 0 || f === 1 || f === 7 || f === 11) {
        const windowGeo = new THREE.PlaneGeometry(0.35, 0.25)
        // North face window
        const winN = new THREE.Mesh(windowGeo, windowLightMat)
        winN.position.set(0, yPos, d / 2 + 0.01)
        towerGroup.add(winN)

        // South face window
        const winS = new THREE.Mesh(windowGeo, windowLightMat)
        winS.position.set(0.3, yPos, -d / 2 - 0.01)
        winS.rotation.y = Math.PI
        towerGroup.add(winS)
      }
    }

    // Vertical Golden Architectural Fins / Structural Bracing
    const ribHeight = floorCount * floorHeight
    const ribGeo = new THREE.BoxGeometry(0.08, ribHeight, 0.12)
    const ribPositions = [
      [-baseWidth / 2 - 0.04, 0.8 + ribHeight / 2, baseWidth / 2 + 0.04],
      [baseWidth / 2 + 0.04, 0.8 + ribHeight / 2, baseWidth / 2 + 0.04],
      [-baseWidth / 2 - 0.04, 0.8 + ribHeight / 2, -baseWidth / 2 - 0.04],
      [baseWidth / 2 + 0.04, 0.8 + ribHeight / 2, -baseWidth / 2 - 0.04],
    ]

    ribPositions.forEach(([rx, ry, rz]) => {
      const rib = new THREE.Mesh(ribGeo, goldRibMat)
      rib.position.set(rx, ry, rz)
      towerGroup.add(rib)
    })

    // Skyscraper Crown & Communications Spire
    const crownBaseY = 0.8 + ribHeight
    const spireGeo = new THREE.CylinderGeometry(0.04, 0.18, 2.4, 16)
    const spire = new THREE.Mesh(spireGeo, goldRibMat)
    spire.position.y = crownBaseY + 1.2
    towerGroup.add(spire)

    // Pulsing Beacon Light on Top of Spire
    const beaconGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 })
    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.y = crownBaseY + 2.4
    towerGroup.add(beacon)

    // ----------------------------------------------------------------
    // 3. Secondary Interlocking Commercial Wing
    // ----------------------------------------------------------------
    const wingGeo = new THREE.BoxGeometry(2.0, 3.6, 2.0)
    const wingMesh = new THREE.Mesh(wingGeo, glassMat)
    wingMesh.position.set(2.2, 0.8 + 1.8, 0.6)
    towerGroup.add(wingMesh)

    const wingEdgeGeo = new THREE.EdgesGeometry(wingGeo)
    const wingEdgeLine = new THREE.LineSegments(wingEdgeGeo, cyanEdgeMat)
    wingEdgeLine.position.set(2.2, 0.8 + 1.8, 0.6)
    towerGroup.add(wingEdgeLine)

    // Floating Golden Trade Halo around Building
    const haloGeo = new THREE.TorusGeometry(3.6, 0.025, 16, 100)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.65,
    })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.rotation.x = Math.PI / 2.5
    halo.position.y = 4.2
    towerGroup.add(halo)

    // ----------------------------------------------------------------
    // 4. Ambient Floating Dust / Construction Nodes
    // ----------------------------------------------------------------
    const particleCount = 160
    const pGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    const colTeal = new THREE.Color(0x2dd4bf)
    const colAmber = new THREE.Color(0xd4a017)

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 16
      pPositions[i * 3 + 1] = Math.random() * 12 - 2
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14

      const c = Math.random() > 0.4 ? colTeal : colAmber
      pColors[i * 3] = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 5. Lighting
    // ----------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(6, 12, 8)
    scene.add(keyLight)

    const emeraldFillLight = new THREE.PointLight(0x2dd4bf, 3, 20)
    emeraldFillLight.position.set(-6, 5, 4)
    scene.add(emeraldFillLight)

    const amberRimLight = new THREE.PointLight(0xd4a017, 3.5, 20)
    amberRimLight.position.set(5, 7, -4)
    scene.add(amberRimLight)

    // ----------------------------------------------------------------
    // 6. Smooth Mouse Parallax & Scroll Integration
    // ----------------------------------------------------------------
    let mouseX = 0
    let mouseY = 0
    let targetRotY = 0.4 // subtle base angle
    let targetRotX = 0.05
    let scrollOffset = 0

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseX = x
      mouseY = y
      targetRotY = 0.4 + mouseX * 0.45
      targetRotX = 0.05 - mouseY * 0.25
    }

    const onScroll = () => {
      scrollOffset = window.scrollY * 0.0008
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    // ----------------------------------------------------------------
    // 7. Render Loop
    // ----------------------------------------------------------------
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth inertia damping
      buildingMaster.rotation.y += (targetRotY - buildingMaster.rotation.y) * 0.04
      buildingMaster.rotation.x += (targetRotX - buildingMaster.rotation.x) * 0.04
      buildingMaster.position.y = -scrollOffset * 0.5

      // Gentle building breathing & beacon flash
      halo.rotation.z = t * 0.15
      particles.rotation.y = t * 0.015
      beaconMat.opacity = 0.5 + Math.sin(t * 5) * 0.5

      renderer.render(scene, camera)
    }

    animate()

    // ----------------------------------------------------------------
    // 8. Responsive Resize
    // ----------------------------------------------------------------
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    resizeObserver.observe(container)

    // ----------------------------------------------------------------
    // Cleanup
    // ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()

      podiumGeo.dispose()
      spireGeo.dispose()
      beaconGeo.dispose()
      wingGeo.dispose()
      wingEdgeGeo.dispose()
      haloGeo.dispose()
      pGeo.dispose()

      concretePodiumMat.dispose()
      glassMat.dispose()
      goldRibMat.dispose()
      cyanEdgeMat.dispose()
      windowLightMat.dispose()
      beaconMat.dispose()
      haloMat.dispose()
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
      className="w-full h-full min-h-[380px] lg:min-h-[520px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
