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

export default function Contact3DPin() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 3, 7.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    container.appendChild(renderer.domElement)

    const master = new THREE.Group()
    scene.add(master)

    // Base Terrain Radar Disc
    const discGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.1, 32)
    const discMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.BENAA.deepDark,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    })
    const disc = new THREE.Mesh(discGeo, discMat)
    disc.position.y = -1.2
    master.add(disc)

    // Radar Rings
    const ringGeo1 = new THREE.RingGeometry(1.2, 1.25, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.TEAL.primary,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    })
    const radarRing1 = new THREE.Mesh(ringGeo1, ringMat)
    radarRing1.rotation.x = -Math.PI / 2
    radarRing1.position.y = -1.14
    master.add(radarRing1)

    const ringGeo2 = new THREE.RingGeometry(2.0, 2.05, 32)
    const radarRing2 = new THREE.Mesh(ringGeo2, ringMat)
    radarRing2.rotation.x = -Math.PI / 2
    radarRing2.position.y = -1.14
    master.add(radarRing2)

    // 3D Location Pin Marker (Head: Sphere, Tip: Cone)
    const pinGroup = new THREE.Group()
    master.add(pinGroup)

    const pinMat = new THREE.MeshStandardMaterial({
      color: THREE_COLORS.MAJD.light,
      metalness: 0.9,
      roughness: 0.2,
      emissive: THREE_COLORS.MAJD.spire,
    })

    const headGeo = new THREE.SphereGeometry(0.55, 24, 24)
    const head = new THREE.Mesh(headGeo, pinMat)
    head.position.y = 0.9
    pinGroup.add(head)

    const innerHoleGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16)
    const innerHoleMat = new THREE.MeshBasicMaterial({ color: THREE_COLORS.BENAA.deepDark })
    const innerHole = new THREE.Mesh(innerHoleGeo, innerHoleMat)
    innerHole.rotation.z = Math.PI / 2
    innerHole.position.y = 0.9
    pinGroup.add(innerHole)

    const tipGeo = new THREE.ConeGeometry(0.55, 1.2, 24)
    const tip = new THREE.Mesh(tipGeo, pinMat)
    tip.rotation.x = Math.PI
    tip.position.y = 0.3
    pinGroup.add(tip)

    // Pulsing Light at base of pin
    const pulseLight = new THREE.PointLight(THREE_COLORS.BENAA.light, 2.5, 10)
    pulseLight.position.set(0, -0.8, 0)
    master.add(pulseLight)

    // Lighting
    scene.add(new THREE.AmbientLight(THREE_COLORS.LIGHTS.ambient, 0.85))
    const dirLight = new THREE.DirectionalLight(THREE_COLORS.LIGHTS.key, 2.0)
    dirLight.position.set(4, 8, 5)
    scene.add(dirLight)

    // Parallax & Viewport Observer
    let targetY = 0
    let targetX = 0
    let isVisible = true

    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      targetY = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.3
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
        master.rotation.y += (targetY - master.rotation.y) * THREE_TIMING.DAMPING_FACTOR + 0.003
        master.rotation.x += (targetX - master.rotation.x) * THREE_TIMING.DAMPING_FACTOR
        pinGroup.position.y = Math.sin(t * 1.5) * 0.1
      }

      const scale1 = 1 + (t * 0.4) % 1
      radarRing1.scale.set(scale1, scale1, scale1)
      ringMat.opacity = 0.8 * (1 - (t * 0.4) % 1)

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
      className="w-full h-full min-h-[220px] md:min-h-[260px] relative pointer-events-auto"
      aria-hidden="true"
    />
  )
}
