import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { THREE_COLORS } from '../../utils/three-colors.js'
import {
  THREE_TIMING,
  isReducedMotion,
  isMobileDevice,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'

export default function BenaaConstruction3D() {
  const containerRef = useRef(null)
  const [isRenovated, setIsRenovated] = useState(false)
  const modeRef = useRef(isRenovated)

  useEffect(() => {
    modeRef.current = isRenovated
  }, [isRenovated])

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
    camera.position.set(0, 4, 13)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    container.appendChild(renderer.domElement)

    const siteMaster = new THREE.Group()
    scene.add(siteMaster)

    // ----------------------------------------------------------------
    // 1. Foundation Slab & Grid
    // ----------------------------------------------------------------
    const foundationGeo = new THREE.BoxGeometry(6.5, 0.5, 6.5)
    const foundationMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.NEUTRALS.foundation,
      roughness: 0.8,
    })
    const foundation = new THREE.Mesh(foundationGeo, foundationMat)
    foundation.position.y = -2.2
    siteMaster.add(foundation)

    const grid = new THREE.GridHelper(
      10,
      isMobile ? 12 : 20,
      THREE_COLORS.BENAA.light,
      THREE_COLORS.BENAA.dark
    )
    grid.position.y = -1.94
    siteMaster.add(grid)

    // ----------------------------------------------------------------
    // 2. Rising Multi-Tier Building Floors
    // ----------------------------------------------------------------
    const buildingGroup = new THREE.Group()
    siteMaster.add(buildingGroup)

    const rawConcreteMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.NEUTRALS.concrete,
      roughness: 0.9,
    })

    const modernGlassMat = new THREE.MeshPhysicalMaterial({
      color: THREE_COLORS.BENAA.glass,
      emissive: THREE_COLORS.BENAA.deepDark,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9,
    })

    const steelWireMat = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.BENAA.light,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })

    // Level 1 (Ground)
    const l1Geo = new THREE.BoxGeometry(3.6, 1.4, 3.6)
    const l1Mesh = new THREE.Mesh(l1Geo, rawConcreteMat)
    const l1Wire = new THREE.Mesh(l1Geo, steelWireMat)
    l1Mesh.position.y = -1.2
    l1Wire.position.y = -1.2
    buildingGroup.add(l1Mesh)
    buildingGroup.add(l1Wire)

    // Level 2
    const l2Geo = new THREE.BoxGeometry(3.0, 1.4, 3.0)
    const l2Mesh = new THREE.Mesh(l2Geo, rawConcreteMat)
    const l2Wire = new THREE.Mesh(l2Geo, steelWireMat)
    l2Mesh.position.y = 0.2
    l2Wire.position.y = 0.2
    buildingGroup.add(l2Mesh)
    buildingGroup.add(l2Wire)

    // Level 3 (Penthouse Roof)
    const l3Geo = new THREE.BoxGeometry(2.4, 1.2, 2.4)
    const l3Mesh = new THREE.Mesh(l3Geo, rawConcreteMat)
    const l3Wire = new THREE.Mesh(l3Geo, steelWireMat)
    l3Mesh.position.y = 1.5
    l3Wire.position.y = 1.5
    buildingGroup.add(l3Mesh)
    buildingGroup.add(l3Wire)

    // ----------------------------------------------------------------
    // 3. Mini Stylized Construction Crane
    // ----------------------------------------------------------------
    const craneGroup = new THREE.Group()
    craneGroup.position.set(-2.8, -1.95, -2.2)
    siteMaster.add(craneGroup)

    const craneMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.MAJD.light,
      metalness: 0.7,
      roughness: 0.3,
    })

    // Crane Mast (Vertical Tower)
    const mastGeo = new THREE.CylinderGeometry(0.08, 0.08, 5.5, 8)
    const mast = new THREE.Mesh(mastGeo, craneMat)
    mast.position.y = 2.75
    craneGroup.add(mast)

    // Crane Jib (Horizontal rotating arm)
    const jibGroup = new THREE.Group()
    jibGroup.position.y = 5.2
    craneGroup.add(jibGroup)

    const jibGeo = new THREE.BoxGeometry(4.0, 0.1, 0.12)
    const jib = new THREE.Mesh(jibGeo, craneMat)
    jib.position.x = 1.5
    jibGroup.add(jib)

    // Counter-weight
    const counterGeo = new THREE.BoxGeometry(0.5, 0.3, 0.3)
    const counter = new THREE.Mesh(counterGeo, rawConcreteMat)
    counter.position.x = -0.6
    jibGroup.add(counter)

    // Crane Cable & Load Block
    const cableGeo = new THREE.CylinderGeometry(0.01, 0.01, 2.2, 4)
    const cableMat = new THREE.MeshBasicMaterial({ color: THREE_COLORS.NEUTRALS.white })
    const cable = new THREE.Mesh(cableGeo, cableMat)
    cable.position.set(2.4, -1.1, 0)
    jibGroup.add(cable)

    const hookLoadGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4)
    const hookLoad = new THREE.Mesh(hookLoadGeo, craneMat)
    hookLoad.position.set(2.4, -2.2, 0)
    jibGroup.add(hookLoad)

    // ----------------------------------------------------------------
    // 4. Lighting & Particles
    // ----------------------------------------------------------------
    scene.add(new THREE.AmbientLight(THREE_COLORS.LIGHTS.ambient, 0.8))
    const sunLight = new THREE.DirectionalLight(THREE_COLORS.LIGHTS.sun, 2.0)
    sunLight.position.set(5, 10, 7)
    scene.add(sunLight)

    const benaaLight = new THREE.PointLight(THREE_COLORS.BENAA.light, 2.5, 20)
    benaaLight.position.set(-4, 4, 4)
    scene.add(benaaLight)

    const pCount = isMobile ? 30 : 60
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 12
      pPos[i * 3 + 1] = Math.random() * 8 - 2
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: THREE_COLORS.BENAA.light,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ----------------------------------------------------------------
    // 5. Mouse Parallax & Viewport Observer
    // ----------------------------------------------------------------
    let targetRotY = 0.5
    let targetRotX = 0.1
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = 0.5 + x * 0.3
      targetRotX = 0.1 - y * 0.15
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
        siteMaster.rotation.y += (targetRotY - siteMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        siteMaster.rotation.x += (targetRotX - siteMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Slow smooth crane rotation
        jibGroup.rotation.y = Math.sin(t * 0.4) * 0.6 + 0.2
        particles.rotation.y = t * 0.01
      }

      // Dynamic Transition between Raw Construction & Modern Renovation
      const activeMat = modeRef.current ? modernGlassMat : rawConcreteMat
      l1Mesh.material = activeMat
      l2Mesh.material = activeMat
      l3Mesh.material = activeMat

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
    <div className="w-full h-full relative group">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[320px] lg:min-h-[420px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      />
      {/* Renovation Interactive Toggle Overlay */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsRenovated((prev) => !prev)}
          className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all flex items-center gap-2 shadow-lg"
        >
          <span className={`w-2 h-2 rounded-full ${isRenovated ? 'bg-cyan-400 animate-ping' : 'bg-amber-400'}`}></span>
          <span>{isRenovated ? 'Mode: Modern Renovation' : 'Mode: Active Construction'}</span>
        </button>
      </div>
    </div>
  )
}
