import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SisterCompanies3DConnection() {
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
    camera.position.set(0, 0, 12)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const connectionMaster = new THREE.Group()
    scene.add(connectionMaster)

    // ----------------------------------------------------------------
    // 1. LEFT: AL BENAA 3D Engineering Structure (Emerald / Cyan)
    // ----------------------------------------------------------------
    const benaaGroup = new THREE.Group()
    benaaGroup.position.set(-3.6, 0, 0)
    connectionMaster.add(benaaGroup)

    const benaaMat = new THREE.MeshPhysicalMaterial({
      color: 0x06241b,
      emissive: 0x0f3e30,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    })

    const benaaWireMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })

    // Tower & Column Structure
    const towerGeo = new THREE.BoxGeometry(1.6, 3.8, 1.6)
    const towerMesh = new THREE.Mesh(towerGeo, benaaMat)
    const towerWire = new THREE.Mesh(towerGeo, benaaWireMat)
    benaaGroup.add(towerMesh)
    benaaGroup.add(towerWire)

    // Stepped foundation slab
    const slabGeo = new THREE.BoxGeometry(2.4, 0.4, 2.4)
    const slabMesh = new THREE.Mesh(slabGeo, benaaMat)
    slabMesh.position.y = -2.1
    benaaGroup.add(slabMesh)

    // Structural Cross Bracing (Crane / Truss)
    const trussGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8)
    const trussMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf })
    const trussL = new THREE.Mesh(trussGeo, trussMat)
    trussL.rotation.z = Math.PI / 4
    benaaGroup.add(trussL)

    const trussR = new THREE.Mesh(trussGeo, trussMat)
    trussR.rotation.z = -Math.PI / 4
    benaaGroup.add(trussR)

    // ----------------------------------------------------------------
    // 2. RIGHT: AL MAJD 3D Global Trade & Freight (Gold / Amber)
    // ----------------------------------------------------------------
    const majdGroup = new THREE.Group()
    majdGroup.position.set(3.6, 0, 0)
    connectionMaster.add(majdGroup)

    const majdMat = new THREE.MeshPhysicalMaterial({
      color: 0x402e03,
      emissive: 0x684b06,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    })

    const majdWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })

    // Rotating Trade Globe
    const globeGeo = new THREE.SphereGeometry(1.4, 24, 24)
    const globeMesh = new THREE.Mesh(globeGeo, majdMat)
    const globeWire = new THREE.Mesh(globeGeo, majdWireMat)
    majdGroup.add(globeMesh)
    majdGroup.add(globeWire)

    // Stylized Logistics Cargo Crate floating below globe
    const crateGeo = new THREE.BoxGeometry(1.2, 0.8, 1.2)
    const crateMesh = new THREE.Mesh(crateGeo, majdMat)
    const crateWire = new THREE.Mesh(crateGeo, majdWireMat)
    crateMesh.position.y = -2.1
    crateWire.position.y = -2.1
    majdGroup.add(crateMesh)
    majdGroup.add(crateWire)

    // Orbital Ring
    const orbitGeo = new THREE.TorusGeometry(2.0, 0.03, 16, 80)
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xd4a017, transparent: true, opacity: 0.8 })
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat)
    orbitMesh.rotation.x = Math.PI / 3
    majdGroup.add(orbitMesh)

    // ----------------------------------------------------------------
    // 3. CENTER: Glowing Connecting Energy Bridge & Core Nucleus
    // ----------------------------------------------------------------
    const centerGroup = new THREE.Group()
    connectionMaster.add(centerGroup)

    // Central Core Orb
    const coreGeo = new THREE.SphereGeometry(0.65, 32, 32)
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x2dd4bf,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    centerGroup.add(coreMesh)

    // Energy Curve Spline (Bezier Tube from Al-Benaa -> Center -> Al-Majd)
    const curvePoints = [
      new THREE.Vector3(-3.2, 0, 0),
      new THREE.Vector3(-1.6, 0.8, 0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.6, -0.8, -0.5),
      new THREE.Vector3(3.2, 0, 0),
    ]
    const spline = new THREE.CatmullRomCurve3(curvePoints)
    const tubeGeo = new THREE.TubeGeometry(spline, 64, 0.06, 12, false)
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    })
    const energyTube = new THREE.Mesh(tubeGeo, tubeMat)
    centerGroup.add(energyTube)

    // Secondary Opposing Energy Arc
    const curvePoints2 = [
      new THREE.Vector3(-3.2, -0.5, 0),
      new THREE.Vector3(-1.4, -1.0, -0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.4, 1.0, 0.5),
      new THREE.Vector3(3.2, 0.5, 0),
    ]
    const spline2 = new THREE.CatmullRomCurve3(curvePoints2)
    const tubeGeo2 = new THREE.TubeGeometry(spline2, 64, 0.04, 12, false)
    const tubeMat2 = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.7,
    })
    const energyTube2 = new THREE.Mesh(tubeGeo2, tubeMat2)
    centerGroup.add(energyTube2)

    // Luminous Connecting Data Packets (Energy Pulses)
    const packetGeo = new THREE.SphereGeometry(0.1, 16, 16)
    const packetMatBenaa = new THREE.MeshBasicMaterial({ color: 0x2dd4bf })
    const packetMatMajd = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    
    const packet1 = new THREE.Mesh(packetGeo, packetMatBenaa)
    const packet2 = new THREE.Mesh(packetGeo, packetMatMajd)
    centerGroup.add(packet1)
    centerGroup.add(packet2)

    // ----------------------------------------------------------------
    // 4. Ambient Floating Dust
    // ----------------------------------------------------------------
    const pCount = 100
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const pLightCyan = new THREE.PointLight(0x2dd4bf, 3, 20)
    pLightCyan.position.set(-4, 3, 4)
    scene.add(pLightCyan)

    const pLightGold = new THREE.PointLight(0xd4a017, 3, 20)
    pLightGold.position.set(4, 3, 4)
    scene.add(pLightGold)

    // ----------------------------------------------------------------
    // 5. Mouse Attraction Interaction
    // ----------------------------------------------------------------
    let mouseX = 0
    let mouseY = 0
    let targetRotY = 0
    let targetRotX = 0

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseX = x
      mouseY = y
      targetRotY = mouseX * 0.3
      targetRotX = -mouseY * 0.15
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth master rotation
      connectionMaster.rotation.y += (targetRotY - connectionMaster.rotation.y) * 0.05
      connectionMaster.rotation.x += (targetRotX - connectionMaster.rotation.x) * 0.05

      // Left Benaa subtle movement
      benaaGroup.rotation.y = Math.sin(t * 0.5) * 0.2
      benaaGroup.position.x = -3.6 + Math.cos(t * 0.8) * 0.15

      // Right Majd subtle movement
      globeMesh.rotation.y += 0.008
      orbitMesh.rotation.z -= 0.01
      majdGroup.position.x = 3.6 - Math.cos(t * 0.8) * 0.15

      // Center core pulse
      const coreScale = 1 + Math.sin(t * 3) * 0.12
      coreMesh.scale.set(coreScale, coreScale, coreScale)

      // Animate energy packets traversing spline
      const progress1 = (t * 0.3) % 1
      const progress2 = (t * 0.35 + 0.5) % 1
      const pos1 = spline.getPoint(progress1)
      const pos2 = spline2.getPoint(progress2)
      packet1.position.copy(pos1)
      packet2.position.copy(pos2)

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

      towerGeo.dispose()
      slabGeo.dispose()
      trussGeo.dispose()
      globeGeo.dispose()
      crateGeo.dispose()
      orbitGeo.dispose()
      coreGeo.dispose()
      tubeGeo.dispose()
      tubeGeo2.dispose()
      packetGeo.dispose()
      pGeo.dispose()

      benaaMat.dispose()
      benaaWireMat.dispose()
      trussMat.dispose()
      majdMat.dispose()
      majdWireMat.dispose()
      orbitMat.dispose()
      coreMat.dispose()
      tubeMat.dispose()
      tubeMat2.dispose()
      packetMatBenaa.dispose()
      packetMatMajd.dispose()
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
      className="w-full h-full min-h-[340px] md:min-h-[440px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
