import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero3DBuilding() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

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
      {/* 3D Tilted Card Wrapper */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.025 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.4 }}
        className="relative w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] bg-slate-950 group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 1: Real Curved / Twisted Architectural Glass Skyscraper */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-curved-tower.jpg"
            alt="Modern Curved Architectural Glass Skyscraper"
            onError={(e) => {
              // Graceful fallback to ultra-HD curved glass tower
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=85'
            }}
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Real Glass Tint & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06241b]/80 via-transparent to-black/25 mix-blend-multiply pointer-events-none"></div>
        </div>

        {/* Layer 2: Subtle Architectural Geometric Focus Ring (Aesthetic only, no text) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-white/20 border-dashed opacity-40 pointer-events-none"
          />
          <div className="absolute w-60 h-60 rounded-full border border-emerald-400/20 pointer-events-none" />
        </div>

        {/* Layer 3: Dynamic Specular Sunlight Glare moving with cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(45, 212, 191, 0.2) 40%, transparent 70%)`,
          }}
        />

        {/* Layer 4: Corner Gloss Edge Reflections */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/25 pointer-events-none" />
      </motion.div>
    </div>
  )
}
