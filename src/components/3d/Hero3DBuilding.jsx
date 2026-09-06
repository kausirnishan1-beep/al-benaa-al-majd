import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  BRAND_COLORS,
  MATERIAL_COLORS,
  ENVIRONMENT_COLORS,
} from '../../utils/three-colors.js'
import {
  THREE_TIMING,
  isReducedMotion,
  isMobileDevice,
  getStandardPixelRatio,
  createViewportObserver,
  disposeObject3D,
} from '../../utils/three-performance.js'
import { gsap, ScrollTrigger } from '../../utils/gsap-utils.js'

export default function Hero3DBuilding({ modelUrl = '/models/skyscraper.glb' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = isReducedMotion()
    const isMobile = isMobileDevice()

    // ----------------------------------------------------------------
    // 1. Scene, Camera & Renderer with Realistic Tone Mapping & Shadows
    // ----------------------------------------------------------------
    const scene = new THREE.Scene()

    // Low-angle architectural perspective
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    const cameraX = isMobile ? 2.2 : 3.6
    const cameraY = isMobile ? 1.3 : 1.5
    const defaultCameraZ = isMobile ? 14.2 : 12.8
    // Start slightly pushed back for 1.2s cinematic push-in
    const initialCameraZ = reducedMotion ? defaultCameraZ : defaultCameraZ + 2.0
    camera.position.set(cameraX, cameraY, initialCameraZ)
    camera.lookAt(0, 0.4, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(getStandardPixelRatio())
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    // Soft realistic shadows
    renderer.shadowMap.enabled = !isMobile
    if (!isMobile) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }
    container.appendChild(renderer.domElement)

    // Master Pivot Group
    const skyscraperMaster = new THREE.Group()
    scene.add(skyscraperMaster)
    const buildingScale = isMobile ? 0.58 : 0.63
    skyscraperMaster.scale.set(buildingScale, buildingScale, buildingScale)
    skyscraperMaster.position.set(0, isMobile ? -2.0 : -2.2, 0)

    // ----------------------------------------------------------------
    // 2. Photorealistic Studio HDRI Environment Map (PMREM)
    // ----------------------------------------------------------------
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    // Natural Sky & Horizon Gradient: Deep Emerald/Slate Zenith -> Warm Sun Glow -> Granite Plaza
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 256)
    skyGrad.addColorStop(0.0, ENVIRONMENT_COLORS.sky.zenithGreen)
    skyGrad.addColorStop(0.28, ENVIRONMENT_COLORS.sky.slateAtmosphere)
    skyGrad.addColorStop(0.48, ENVIRONMENT_COLORS.sky.horizonAmbient)
    skyGrad.addColorStop(0.52, ENVIRONMENT_COLORS.sky.horizonWarmSun)
    skyGrad.addColorStop(0.58, ENVIRONMENT_COLORS.sky.distantSkyline)
    skyGrad.addColorStop(0.70, ENVIRONMENT_COLORS.sky.graniteGround)
    skyGrad.addColorStop(1.0, ENVIRONMENT_COLORS.sky.deepFoundation)
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, 512, 256)

    // Natural Sun Glint
    const sunGrad = ctx.createRadialGradient(380, 70, 0, 380, 70, 65)
    sunGrad.addColorStop(0, ENVIRONMENT_COLORS.sun.glintWhite)
    sunGrad.addColorStop(0.25, ENVIRONMENT_COLORS.sun.glintWarm)
    sunGrad.addColorStop(0.6, ENVIRONMENT_COLORS.sun.glintHalo)
    sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(315, 10, 130, 130)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const envMapTarget = pmremGenerator.fromEquirectangular(envTexture)
    scene.environment = envMapTarget.texture

    // ----------------------------------------------------------------
    // 3. Physically Based Rendering (PBR) Materials
    // ----------------------------------------------------------------
    // High-spec reflective solar curtain wall glass (MeshPhysicalMaterial)
    const towerGlassMat = new THREE.MeshPhysicalMaterial({
      color: MATERIAL_COLORS.glass.tint,
      emissive: MATERIAL_COLORS.glass.emissive,
      emissiveIntensity: 0.18,
      metalness: 0.15,
      roughness: 0.05,
      transmission: 0.72,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    })

    // Anodized dark champagne / titanium architectural steel mullions
    const steelMullionMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.steel.mullion,
      metalness: 0.88,
      roughness: 0.24,
    })

    // Architectural fair-faced concrete & granite podium
    const concreteMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.concrete.fairFaced,
      roughness: 0.82,
      metalness: 0.05,
    })

    // Warm illuminated interior office floor slabs
    const interiorFloorMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.interior.warmIlluminatedFloor,
      emissive: MATERIAL_COLORS.interior.floorGlow,
      emissiveIntensity: 0.22,
      roughness: 0.45,
    })

    // Ground plaza slate
    const groundMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_COLORS.ground.slate,
      roughness: 0.88,
      metalness: 0.08,
    })

    // Architectural gold / bronze spire & crown accents
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: BRAND_COLORS.MAJD.light,
      metalness: 0.92,
      roughness: 0.18,
    })

    const interactiveGlassMeshes = []

    // ----------------------------------------------------------------
    // 4. Procedural High-Detail Architecture Construction
    // ----------------------------------------------------------------
    const buildProceduralArchitecture = () => {
      // Ground Plaza
      const groundGeo = new THREE.PlaneGeometry(20, 20)
      const ground = new THREE.Mesh(groundGeo, groundMat)
      ground.rotation.x = -Math.PI / 2
      ground.position.y = -0.02
      ground.receiveShadow = true
      skyscraperMaster.add(ground)

      const plazaGrid = new THREE.GridHelper(16, 16, 0x475569, 0x0f172a)
      plazaGrid.position.y = -0.01
      skyscraperMaster.add(plazaGrid)

      // Podium Base Slab
      const podiumGeo = new THREE.BoxGeometry(5.2, 0.25, 4.4)
      const podium = new THREE.Mesh(podiumGeo, concreteMat)
      podium.position.set(0, 0.12, 0)
      podium.castShadow = true
      podium.receiveShadow = true
      skyscraperMaster.add(podium)

      // Entrance Lobby (Tier 1)
      const lobbyGroup = new THREE.Group()
      skyscraperMaster.add(lobbyGroup)

      const lobbyGlassGeo = new THREE.BoxGeometry(4.4, 0.95, 3.6)
      const lobbyGlass = new THREE.Mesh(lobbyGlassGeo, towerGlassMat)
      lobbyGlass.position.set(0, 0.72, 0)
      lobbyGlass.castShadow = true
      lobbyGlass.receiveShadow = true
      lobbyGroup.add(lobbyGlass)
      interactiveGlassMeshes.push(lobbyGlass)

      const lobbyCoreGeo = new THREE.BoxGeometry(2.0, 0.95, 1.8)
      const lobbyCore = new THREE.Mesh(lobbyCoreGeo, concreteMat)
      lobbyCore.position.set(0, 0.72, 0)
      lobbyCore.castShadow = true
      lobbyCore.receiveShadow = true
      lobbyGroup.add(lobbyCore)

      const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.95, 16)
      const pillarPositions = [
        [-2.0, 0.72, 1.6],
        [-1.0, 0.72, 1.6],
        [0.0, 0.72, 1.6],
        [1.0, 0.72, 1.6],
        [2.0, 0.72, 1.6],
        [-2.0, 0.72, -1.6],
        [2.0, 0.72, -1.6],
      ]
      pillarPositions.forEach(([px, py, pz]) => {
        const pillar = new THREE.Mesh(pillarGeo, steelMullionMat)
        pillar.position.set(px, py, pz)
        pillar.castShadow = true
        pillar.receiveShadow = true
        lobbyGroup.add(pillar)
      })

      const canopyGeo = new THREE.BoxGeometry(2.4, 0.08, 1.2)
      const canopy = new THREE.Mesh(canopyGeo, steelMullionMat)
      canopy.position.set(0, 0.9, 2.2)
      canopy.castShadow = true
      canopy.receiveShadow = true
      lobbyGroup.add(canopy)

      // Main Tower (Tier 2)
      const towerGroup = new THREE.Group()
      skyscraperMaster.add(towerGroup)

      const mainTowerHeight = 5.2
      const mainTowerWidth = 3.6
      const mainTowerDepth = 2.8
      const numFloors = 20
      const floorH = mainTowerHeight / numFloors

      const mainGlassGeo = new THREE.BoxGeometry(mainTowerWidth, mainTowerHeight, mainTowerDepth)
      const mainGlass = new THREE.Mesh(mainGlassGeo, towerGlassMat)
      mainGlass.position.set(0, 1.2 + mainTowerHeight / 2, 0)
      mainGlass.castShadow = true
      mainGlass.receiveShadow = true
      towerGroup.add(mainGlass)
      interactiveGlassMeshes.push(mainGlass)

      const towerCoreGeo = new THREE.BoxGeometry(1.6, mainTowerHeight, 1.4)
      const towerCore = new THREE.Mesh(towerCoreGeo, concreteMat)
      towerCore.position.set(0, 1.2 + mainTowerHeight / 2, 0)
      towerCore.castShadow = true
      towerCore.receiveShadow = true
      towerGroup.add(towerCore)

      for (let f = 0; f <= numFloors; f++) {
        const fy = 1.2 + f * floorH
        const spandrelGeo = new THREE.BoxGeometry(
          mainTowerWidth + 0.04,
          0.04,
          mainTowerDepth + 0.04
        )
        const spandrel = new THREE.Mesh(spandrelGeo, steelMullionMat)
        spandrel.position.set(0, fy, 0)
        spandrel.castShadow = true
        spandrel.receiveShadow = true
        towerGroup.add(spandrel)

        if (f % 2 === 0) {
          const floorSlabGeo = new THREE.BoxGeometry(
            mainTowerWidth - 0.1,
            0.02,
            mainTowerDepth - 0.1
          )
          const floorSlab = new THREE.Mesh(floorSlabGeo, interiorFloorMat)
          floorSlab.position.set(0, fy - 0.02, 0)
          towerGroup.add(floorSlab)
        }
      }

      // Vertical structural mullions
      const mullionPositionsX = [-1.6, -1.0, -0.4, 0.4, 1.0, 1.6]
      mullionPositionsX.forEach((mx) => {
        const finFrontGeo = new THREE.BoxGeometry(0.04, mainTowerHeight, 0.08)
        const finFront = new THREE.Mesh(finFrontGeo, steelMullionMat)
        finFront.position.set(mx, 1.2 + mainTowerHeight / 2, mainTowerDepth / 2 + 0.02)
        finFront.castShadow = true
        towerGroup.add(finFront)

        const finBack = new THREE.Mesh(finFrontGeo, steelMullionMat)
        finBack.position.set(mx, 1.2 + mainTowerHeight / 2, -mainTowerDepth / 2 - 0.02)
        finBack.castShadow = true
        towerGroup.add(finBack)
      })

      const mullionPositionsZ = [-1.0, -0.4, 0.4, 1.0]
      mullionPositionsZ.forEach((mz) => {
        const sideFinGeo = new THREE.BoxGeometry(0.08, mainTowerHeight, 0.04)
        const finLeft = new THREE.Mesh(sideFinGeo, steelMullionMat)
        finLeft.position.set(-mainTowerWidth / 2 - 0.02, 1.2 + mainTowerHeight / 2, mz)
        finLeft.castShadow = true
        towerGroup.add(finLeft)

        const finRight = new THREE.Mesh(sideFinGeo, steelMullionMat)
        finRight.position.set(mainTowerWidth / 2 + 0.02, 1.2 + mainTowerHeight / 2, mz)
        finRight.castShadow = true
        towerGroup.add(finRight)
      })

      // Executive Sky Lounge Setback (Tier 3)
      const setbackGroup = new THREE.Group()
      skyscraperMaster.add(setbackGroup)

      const setbackY = 1.2 + mainTowerHeight
      const setbackH = 1.4
      const setbackW = 2.8
      const setbackD = 2.2

      const setbackGlassGeo = new THREE.BoxGeometry(setbackW, setbackH, setbackD)
      const setbackGlass = new THREE.Mesh(setbackGlassGeo, towerGlassMat)
      setbackGlass.position.set(0, setbackY + setbackH / 2, 0)
      setbackGlass.castShadow = true
      setbackGlass.receiveShadow = true
      setbackGroup.add(setbackGlass)
      interactiveGlassMeshes.push(setbackGlass)

      const balconyGeo = new THREE.BoxGeometry(mainTowerWidth, 0.12, mainTowerDepth)
      const balcony = new THREE.Mesh(balconyGeo, steelMullionMat)
      balcony.position.set(0, setbackY, 0)
      balcony.castShadow = true
      balcony.receiveShadow = true
      setbackGroup.add(balcony)

      const railingGeo = new THREE.BoxGeometry(mainTowerWidth - 0.08, 0.25, mainTowerDepth - 0.08)
      const railing = new THREE.Mesh(railingGeo, towerGlassMat)
      railing.position.set(0, setbackY + 0.15, 0)
      setbackGroup.add(railing)

      // Crown Roof, Helipad & Spire (Tier 4)
      const crownGroup = new THREE.Group()
      skyscraperMaster.add(crownGroup)

      const crownBaseY = setbackY + setbackH

      const crownCapGeo = new THREE.BoxGeometry(setbackW + 0.15, 0.18, setbackD + 0.15)
      const crownCap = new THREE.Mesh(crownCapGeo, steelMullionMat)
      crownCap.position.set(0, crownBaseY + 0.09, 0)
      crownCap.castShadow = true
      crownCap.receiveShadow = true
      crownGroup.add(crownCap)

      const crownScreenGeo = new THREE.BoxGeometry(setbackW * 0.9, 0.7, setbackD * 0.9)
      const crownScreen = new THREE.Mesh(crownScreenGeo, steelMullionMat)
      crownScreen.position.set(0, crownBaseY + 0.5, 0)
      crownScreen.castShadow = true
      crownScreen.receiveShadow = true
      crownGroup.add(crownScreen)

      const helipadGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.05, 24)
      const helipad = new THREE.Mesh(helipadGeo, concreteMat)
      helipad.position.set(0, crownBaseY + 0.9, 0)
      helipad.castShadow = true
      helipad.receiveShadow = true
      crownGroup.add(helipad)

      const spireGeo = new THREE.CylinderGeometry(0.02, 0.09, 1.6, 12)
      const spire = new THREE.Mesh(spireGeo, goldAccentMat)
      spire.position.set(0.4, crownBaseY + 1.7, 0.2)
      spire.castShadow = true
      crownGroup.add(spire)

      const beaconGeo = new THREE.SphereGeometry(0.06, 16, 16)
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 })
      const beacon = new THREE.Mesh(beaconGeo, beaconMat)
      beacon.position.set(0.4, crownBaseY + 2.52, 0.2)
      crownGroup.add(beacon)

      return { beaconMat }
    }

    // ----------------------------------------------------------------
    // 5. GLTF Model Loader with Fallback
    // ----------------------------------------------------------------
    let beaconMatRef = null

    if (modelUrl) {
      const loader = new GLTFLoader()
      loader.load(
        modelUrl,
        (gltf) => {
          // Clear any initial children and mount loaded GLTF model
          while (skyscraperMaster.children.length > 0) {
            skyscraperMaster.remove(skyscraperMaster.children[0])
          }
          const model = gltf.scene
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) {
                child.material.envMap = envMapTarget.texture
                child.material.needsUpdate = true
              }
            }
          })
          // Auto-center & compute bounds
          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          model.position.sub(center)
          skyscraperMaster.add(model)
        },
        undefined,
        () => {
          // Fallback to high-detail PBR procedural architecture
          const res = buildProceduralArchitecture()
          beaconMatRef = res?.beaconMat || null
        }
      )
    } else {
      const res = buildProceduralArchitecture()
      beaconMatRef = res?.beaconMat || null
    }

    // ----------------------------------------------------------------
    // 6. Natural Outdoor Daylight & Soft Shadows
    // ----------------------------------------------------------------
    // Hemisphere light (Soft sky fill + warm earth bounce)
    const hemiLight = new THREE.HemisphereLight(
      ENVIRONMENT_COLORS.lighting.hemiSky,
      ENVIRONMENT_COLORS.lighting.hemiGround,
      1.25
    )
    scene.add(hemiLight)

    // Directional Key Sun Light
    const sunLight = new THREE.DirectionalLight(ENVIRONMENT_COLORS.sun.keyLight, 2.5)
    sunLight.position.set(8, 14, 9)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 35
    sunLight.shadow.camera.left = -7
    sunLight.shadow.camera.right = 7
    sunLight.shadow.camera.top = 10
    sunLight.shadow.camera.bottom = -4
    sunLight.shadow.bias = -0.0004
    scene.add(sunLight)

    // Soft warm architectural rim light
    const rimLight = new THREE.DirectionalLight(ENVIRONMENT_COLORS.lighting.warmRim, 1.1)
    rimLight.position.set(-8, 9, -7)
    scene.add(rimLight)

    // Corporate brand bounce lights
    const benaaBounce = new THREE.PointLight(BRAND_COLORS.BENAA.light, 1.2, 16)
    benaaBounce.position.set(-3, 1, 3)
    scene.add(benaaBounce)

    const majdBounce = new THREE.PointLight(BRAND_COLORS.MAJD.light, 0.9, 16)
    majdBounce.position.set(3, 5, 2)
    scene.add(majdBounce)

    // ----------------------------------------------------------------
    // 7. Interaction: 1.2s Camera Push-in, Cursor Parallax & Scroll
    // ----------------------------------------------------------------
    let targetRotY = 0.35
    let targetRotX = 0.03
    let targetCameraZ = defaultCameraZ
    let isVisible = true

    // 1.2s: Camera slowly pushes in (Cinematic dolly-in)
    let introCameraPushIn = null
    if (!reducedMotion) {
      introCameraPushIn = gsap.to(camera.position, {
        z: defaultCameraZ,
        duration: 2.2,
        delay: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          targetCameraZ = camera.position.z
        },
      })
    }

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Cursor X -> subtle rotation, Cursor Y -> subtle tilt (Calm subtle parallax)
    const onMouseMove = (e) => {
      if (reducedMotion) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      mouse.x = x
      mouse.y = y

      targetRotY = 0.35 + x * 0.18
      targetRotX = 0.03 - y * 0.06
    }

    // Smooth Mobile Touch
    let touchStartX = 0
    let touchStartY = 0
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e) => {
      if (reducedMotion || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - touchStartX
      const deltaY = e.touches[0].clientY - touchStartY
      targetRotY += deltaX * 0.002
      targetRotX = Math.max(-0.12, Math.min(0.15, targetRotX - deltaY * 0.0015))
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    // Scroll: camera slight movement via ScrollTrigger
    let scrollTriggerInstance = null
    if (!reducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          targetCameraZ = defaultCameraZ - self.progress * 1.2
          targetRotY = 0.35 + self.progress * 0.08
        },
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })

    const viewportObserver = createViewportObserver(container, (visible) => {
      isVisible = visible
    })

    // ----------------------------------------------------------------
    // 8. Animation Render Loop (Calm Kinematics, Subtle Idle Breathing)
    // ----------------------------------------------------------------
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!reducedMotion) {
        // Smooth rotational damping
        skyscraperMaster.rotation.y +=
          (targetRotY - skyscraperMaster.rotation.y) * THREE_TIMING.DAMPING_FACTOR
        skyscraperMaster.rotation.x +=
          (targetRotX - skyscraperMaster.rotation.x) * THREE_TIMING.DAMPING_FACTOR

        // Idle: very subtle organic breathing movement (NO aggressive spinning)
        skyscraperMaster.position.y = -2.2 + Math.sin(t * 0.5) * 0.015

        // Smooth camera dolly zoom on scroll
        camera.position.z += (targetCameraZ - camera.position.z) * 0.05

        // Beacon pulsing
        if (beaconMatRef) {
          const beaconPulse = Math.sin(t * 3.5) > 0.3 ? 1 : 0.15
          beaconMatRef.color.setRGB(beaconPulse, 0.08, 0.08)
        }

        // Raycasting for subtle glass sparkle glint
        if (interactiveGlassMeshes.length > 0) {
          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(interactiveGlassMeshes)
          if (intersects.length > 0) {
            towerGlassMat.emissiveIntensity = 0.28
          } else {
            towerGlassMat.emissiveIntensity = 0.12
          }
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ----------------------------------------------------------------
    // 9. Resize Handling
    // ----------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)

    // ----------------------------------------------------------------
    // 10. Resource Disposal & Cleanup
    // ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      if (container) {
        container.removeEventListener('touchstart', onTouchStart)
        container.removeEventListener('touchmove', onTouchMove)
      }
      if (introCameraPushIn) {
        introCameraPushIn.kill()
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill()
      }
      viewportObserver.disconnect()
      ro.disconnect()

      pmremGenerator.dispose()
      envMapTarget.dispose()
      envTexture.dispose()
      disposeObject3D(scene)
      renderer.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [modelUrl])

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[500px] flex items-center justify-center select-none">
      {/* 3D Ambient Depth Brand Glow (#0F4C3A Deep Green, #14B8A6 Muted Teal, #D4A017 Gold) */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#0F4C3A]/25 via-[#14B8A6]/10 to-[#D4A017]/20 rounded-3xl blur-2xl opacity-40 pointer-events-none" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] bg-slate-950/85 backdrop-blur-[2px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Architectural Corporate Skyscraper HQ"
      />
    </div>
  )
}
