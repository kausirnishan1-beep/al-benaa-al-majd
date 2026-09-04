import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { isReducedMotion } from '../../utils/three-performance.js'

export default function Hero3DBuilding() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Scroll parallax / zoom dolly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })
  const scrollScale = useTransform(smoothScrollY, [0, 0.5, 1], [0.96, 1.02, 1.06])
  const scrollRotate = useTransform(smoothScrollY, [0, 1], [-1.5, 1.5])

  useEffect(() => {
    setReducedMotion(isReducedMotion())
  }, [])

  const handleMouseMove = (e) => {
    if (reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Smooth rotational depth
    const rotX = -((y - centerY) / centerY) * 12
    const rotY = ((x - centerX) / centerX) * 14

    setTilt({ x: rotX, y: rotY })
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[420px] lg:min-h-[500px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Ambient Brand Depth Glow (Deep Green #0F4C3A, Gold #D4A017, Teal #2DD4BF) */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#0F4C3A]/30 via-[#2DD4BF]/15 to-[#D4A017]/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main 3D Tilted Building Canvas Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{
          opacity: 1,
          scale: isHovered ? 1.03 : 1,
          y: 0,
          rotateX: reducedMotion ? 0 : tilt.x,
          rotateY: reducedMotion ? 0 : tilt.y,
        }}
        style={{
          scale: scrollScale,
          rotateZ: scrollRotate,
          transformStyle: 'preserve-3d',
        }}
        transition={{
          opacity: { duration: 0.8, ease: 'easeOut' },
          scale: { type: 'spring', stiffness: 220, damping: 22, mass: 0.4 },
          rotateX: { type: 'spring', stiffness: 220, damping: 22, mass: 0.4 },
          rotateY: { type: 'spring', stiffness: 220, damping: 22, mass: 0.4 },
        }}
        className="relative w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/25 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] bg-slate-950 group"
      >
        {/* Layer 1: Photorealistic Modern Corporate Glass Building */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-corporate-building.jpg"
            alt="AL BENAA & AL MAJD Modern Photorealistic Corporate Building Architecture"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=85'
            }}
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Elegant Corporate Dark Vignette & Depth Filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06241b]/60 via-transparent to-black/20 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Layer 2: Dynamic Cursor-Tracking Specular Sunlight Glare on Curved Glass */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.55) 0%, rgba(45, 212, 191, 0.25) 35%, rgba(212, 160, 23, 0.15) 55%, transparent 75%)`,
          }}
        />

        {/* Layer 3: Glass Edge Rim Highlight & Reflection */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30 pointer-events-none" />

        {/* Layer 4: Subtle Corner Ambient Brand Gradients */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D4A017]/15 to-transparent rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#0F4C3A]/30 to-transparent rounded-bl-3xl pointer-events-none" />
      </motion.div>
    </div>
  )
}
