import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  THREE_TIMING,
  isReducedMotion,
  isMobileDevice,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'

export default function Contact3DPin() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    // ----------------------------------------------------------------
    // 1. Scene, Camera & Renderer
    // ----------------------------------------------------------------
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.4, 5.2)
    camera.lookAt(0, 0.05, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    container.appendChild(renderer.domElement)

    // ----------------------------------------------------------------
    // 2. PMREM Sky & Gloss Environment Map
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0, '#0a3528') // Benaa deep dark green
    skyGrad.addColorStop(0.35, '#0f4c3a') // Benaa green
    skyGrad.addColorStop(0.55, '#fef08a') // Warm gold sun horizon
    skyGrad.addColorStop(0.75, '#1e293b') // Slate
    skyGrad.addColorStop(1, '#020617')
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    const sunGrad = ctx.createRadialGradient(360, 70, 0, 360, 70, 80)
    sunGrad.addColorStop(0, '#ffffff')
    sunGrad.addColorStop(0.25, '#fffbeb')
    sunGrad.addColorStop(0.7, 'rgba(254, 240, 138, 0.5)')
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(260, 0, 200, 140)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    const master = new THREE.Group()
    master.position.y = -0.1
    scene.add(master)

    // ----------------------------------------------------------------
    // 3. Ground Map Base & Pulse Target Disc
    // ----------------------------------------------------------------
    const groundGroup = new THREE.Group()
    groundGroup.position.y = -0.92
    master.add(groundGroup)

    // Map Base Slab (Dark Titanium Slate)
    const baseGeo = new THREE.CylinderGeometry(2.3, 2.4, 0.14, 40)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25,
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    groundGroup.add(baseMesh)

    // Gold Outer Rim Ring
    const rimGeo = new THREE.TorusGeometry(2.32, 0.02, 16, 48)
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.9,
      roughness: 0.15,
    })
    const rimMesh = new THREE.Mesh(rimGeo, rimMat)
    rimMesh.rotation.x = Math.PI / 2
    rimMesh.position.y = 0.07
    groundGroup.add(rimMesh)

    // Map Grid / Street Crosshairs
    const gridHelper = new THREE.GridHelper(2.8, 12, 0x1a6b52, 0x1e293b)
    gridHelper.position.y = 0.08
    gridHelper.material.opacity = 0.4
    gridHelper.material.transparent = true
    groundGroup.add(gridHelper)

    // Target Center Target Disc (Location Anchor)
    const targetGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24)
    const targetMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 }) // Muted technical teal
    const targetDot = new THREE.Mesh(targetGeo, targetMat)
    targetDot.position.y = 0.085
    groundGroup.add(targetDot)

    // Concentric Target Rings
    const tRingGeo1 = new THREE.RingGeometry(0.45, 0.49, 36)
    const tRingMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    })
    const tRing1 = new THREE.Mesh(tRingGeo1, tRingMat)
    tRing1.rotation.x = -Math.PI / 2
    tRing1.position.y = 0.086
    groundGroup.add(tRing1)

    const tRingGeo2 = new THREE.RingGeometry(1.0, 1.04, 36)
    const tRing2 = new THREE.Mesh(tRingGeo2, tRingMat)
    tRing2.rotation.x = -Math.PI / 2
    tRing2.position.y = 0.086
    groundGroup.add(tRing2)

    // Expanding Radar Shockwave Rings
    const pulseRingGeo = new THREE.RingGeometry(0.2, 0.26, 36)
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6, // Muted technical teal
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseMat)
    pulseRing.rotation.x = -Math.PI / 2
    pulseRing.position.y = 0.088
    groundGroup.add(pulseRing)

    // Rotating Radar Sweep Wedge
    const sweepGeo = new THREE.CircleGeometry(2.0, 36, 0, Math.PI / 3)
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.14,
    })
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat)
    sweepMesh.rotation.x = -Math.PI / 2
    sweepMesh.position.y = 0.084
    groundGroup.add(sweepMesh)

    // Soft Contact Shadow Disc under pin tip
    const shadowGeo = new THREE.CircleGeometry(0.5, 24)
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5,
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = 0.082
    groundGroup.add(shadowMesh)

    // ----------------------------------------------------------------
    // 4. Authentic 3D Google Maps Location Pin Geometry
    // ----------------------------------------------------------------
    const pinGroup = new THREE.Group()
    pinGroup.position.set(0, 0.35, 0)
    master.add(pinGroup)

    // Constructing the classic smooth Google Maps inverted teardrop shape
    const pinShape = new THREE.Shape()
    pinShape.moveTo(0, 0)
    // Smooth right tangent curve
    pinShape.bezierCurveTo(0.18, 0.28, 0.78, 0.95, 0.78, 1.45)
    // Semicircular top arc (Radius: 0.78)
    pinShape.absarc(0, 1.45, 0.78, 0, Math.PI, false)
    // Smooth left tangent curve back to tip
    pinShape.bezierCurveTo(-0.78, 0.95, -0.18, 0.28, 0, 0)

    // Center circular aperture hole (Iconic Google Maps hole)
    const pinHole = new THREE.Path()
    pinHole.absarc(0, 1.45, 0.34, 0, Math.PI * 2, true)
    pinShape.holes.push(pinHole)

    const extrudeSettings = {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
      curveSegments: 52,
    }

    const pinGeo = new THREE.ExtrudeGeometry(pinShape, extrudeSettings)
    pinGeo.center()

    // Vibrant Authentic Google Maps Pure Red Gloss Material with Clearcoat
    const pinMat = new THREE.MeshPhysicalMaterial({
      color: 0xee1b24, // Vivid pure Google Maps iconic Red
      emissive: 0x5a0b0f,
      emissiveIntensity: 0.2,
      metalness: 0.15,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
    })

    const pinMesh = new THREE.Mesh(pinGeo, pinMat)
    pinGroup.add(pinMesh)

    // Inner Glowing Core Disc (Center Aperture Emblem)
    const innerCoreGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.18, 32)
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xfef08a,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.1,
      clearcoat: 1.0,
    })
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    innerCore.rotation.x = Math.PI / 2
    innerCore.position.y = 0.32
    pinGroup.add(innerCore)

    // Golden Orbit Ring around Google Maps Pin
    const orbitGeo = new THREE.TorusGeometry(0.95, 0.018, 16, 48)
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.85,
    })
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat)
    orbitMesh.position.y = 0.32
    orbitMesh.rotation.x = Math.PI / 3.5
    pinGroup.add(orbitMesh)

    // Vertical Upward Sky Beacon Light Shaft (Gold/Amber highlight)
    const beaconGeo = new THREE.CylinderGeometry(0.04, 0.18, 2.6, 16)
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      transparent: true,
      opacity: 0.35,
    })
    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.y = 1.8
    pinGroup.add(beacon)

    // ----------------------------------------------------------------
    // 5. Lighting & Particles
    // ----------------------------------------------------------------
    const hemiLight = new THREE.HemisphereLight(0xfffaed, 0x0f172a, 1.5)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 3.2)
    dirLight.position.set(4, 7, 6)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0xef4444, 2.5, 8)
    pointLight.position.set(0, 0.6, 2)
    scene.add(pointLight)

    const pCount = isMobile ? 20 : 40
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xfffaed,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 6. Interaction & Animation Loop
    // ----------------------------------------------------------------
    let targetY = 0
    let targetX = 0
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      targetY = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.35
      targetX = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * 0.15
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
        master.rotation.y += (targetY - master.rotation.y) * THREE_TIMING.DAMPING_FACTOR + 0.005
        master.rotation.x += (targetX - master.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Hovering Google Maps pin floating motion
        pinGroup.position.y = 0.35 + Math.sin(t * 2.2) * 0.05
        shadowMesh.scale.setScalar(1 + Math.sin(t * 2.2) * 0.12)

        // Orbit ring rotation
        orbitMesh.rotation.z = t * 0.75
        orbitMesh.rotation.y = t * 0.45

        // Radar sweep
        sweepMesh.rotation.z = -t * 1.6

        // Expanding radar shockwaves
        const pulseProgress = (t * 0.5) % 1
        const currentScale = 0.2 + pulseProgress * 7.5
        pulseRing.scale.set(currentScale, currentScale, 1)
        pulseMat.opacity = Math.max(0, 0.85 * (1 - pulseProgress))

        // Beacon light pulsing
        const beamPulse = (Math.sin(t * 3.5) + 1) / 2
        beaconMat.opacity = 0.2 + beamPulse * 0.35

        particles.rotation.y = t * 0.02
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 7. Resize Observer & Cleanup
    // ----------------------------------------------------------------
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
      className="w-full h-full relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  )
}
