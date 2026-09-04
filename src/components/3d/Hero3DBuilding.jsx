import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Layers, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero3DBuilding() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [activeLayer, setActiveLayer] = useState('both') // 'photo' | 'blueprint' | 'both'
  const [isHovered, setIsHovered] = useState(false)
  const [activePin, setActivePin] = useState(null)

  // Architectural Metadata Pins
  const pins = [
    {
      id: 'crown',
      x: '52%',
      y: '16%',
      label: 'Sky Lounge & Spire',
      labelAr: 'قمة البرج والواجهة العلوية',
      spec: 'Reinforced Architectural Steel Framing',
    },
    {
      id: 'facade',
      x: '38%',
      y: '42%',
      label: 'Low-E Solar Glazing',
      labelAr: 'واجهات زجاجية عازلة للطاقة',
      spec: 'Double-glazed thermal acoustic curtain walls',
    },
    {
      id: 'core',
      x: '64%',
      y: '68%',
      label: 'Structural Core & MEP',
      labelAr: 'الهيكل الإنشائي والأنظمة الذكية',
      spec: 'Post-tensioned concrete & smart building automation',
    },
  ]

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = -((y - centerY) / centerY) * 10
    const rotY = ((x - centerX) / centerX) * 12

    setTilt({ x: rotX, y: rotY })
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setActivePin(null)
  }

  // Real ultra-HD modern skyscraper photograph (Riyadh / international commercial luxury high-rise)
  const realBuildingImg =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'

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
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
        className="relative w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 1: REAL Photorealistic Modern Skyscraper */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            activeLayer === 'blueprint' ? 'opacity-25' : 'opacity-100'
          }`}
        >
          <img
            src={realBuildingImg}
            alt="AL BENAA Modern Architectural Commercial Skyscraper"
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Real Glass Tint & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-benaa-dark/90 via-transparent to-black/30 mix-blend-multiply"></div>
        </div>

        {/* Layer 2: 3D Holographic CAD Blueprint Grid Overlay (Reference 2 style) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            activeLayer === 'photo' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Blueprint SVG Vector Mesh */}
          <svg className="w-full h-full opacity-60 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cadGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#2dd4bf" strokeWidth="0.6" strokeOpacity="0.4" />
                <circle cx="0" cy="0" r="1.2" fill="#d4a017" fillOpacity="0.7" />
              </pattern>
              <linearGradient id="laserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
                <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Pattern */}
            <rect width="100%" height="100%" fill="url(#cadGrid)" />

            {/* Structural Blueprint Diagonal Bracing Lines */}
            <g stroke="#2dd4bf" strokeWidth="1.2" strokeOpacity="0.7" strokeDasharray="4,4">
              <line x1="20%" y1="90%" x2="52%" y2="16%" />
              <line x1="80%" y1="90%" x2="52%" y2="16%" />
              <line x1="20%" y1="50%" x2="80%" y2="50%" />
              <line x1="30%" y1="30%" x2="70%" y2="30%" />
              <line x1="15%" y1="70%" x2="85%" y2="70%" />
            </g>

            {/* Scanning Laser Beam */}
            <line
              x1="0"
              y1="40%"
              x2="100%"
              y2="40%"
              stroke="url(#laserBeam)"
              strokeWidth="4"
              className="animate-pulse"
            />
          </svg>

          {/* Holographic Particle Shimmer */}
          <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        </div>

        {/* Layer 3: Dynamic Specular Sunlight Glare moving with cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(45, 212, 191, 0.15) 45%, transparent 70%)`,
          }}
        />

        {/* Layer 4: Interactive Architectural Metadata Pins */}
        <div className="absolute inset-0 pointer-events-auto" style={{ transform: 'translateZ(30px)' }}>
          {pins.map((pin) => (
            <div
              key={pin.id}
              style={{ left: pin.x, top: pin.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
              onMouseEnter={() => setActivePin(pin.id)}
              onMouseLeave={() => setActivePin(null)}
            >
              {/* Radar Pulsing Pin */}
              <div className="relative flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-emerald-400/40 animate-ping absolute"></span>
                <span className="w-3 h-3 rounded-full bg-majd-light border-2 border-white shadow-lg relative z-10 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-benaa-dark"></span>
                </span>
              </div>

              {/* Tooltip Card on Hover */}
              <AnimatePresence>
                {activePin === pin.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-56 p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-emerald-500/30 text-white shadow-2xl z-30 pointer-events-none"
                  >
                    <div className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-majd-light" />
                      <span>{pin.label}</span>
                    </div>
                    <div className="text-[10px] text-gray-300 font-arabic mt-0.5">{pin.labelAr}</div>
                    <div className="text-[10px] text-gray-400 mt-1 leading-snug border-t border-white/10 pt-1">
                      {pin.spec}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Top Header Tag */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-lg">
          <Building2 className="w-3.5 h-3.5 text-majd-light" />
          <span>Real Project Architecture</span>
          <span className="text-white/40">|</span>
          <span className="text-emerald-300 text-[10px] font-mono">BIM 3D Model</span>
        </div>

        {/* Bottom Interactive Layer Mode Switcher (Photo / Blueprint / Hybrid) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/15 shadow-xl">
            <button
              type="button"
              onClick={() => setActiveLayer('photo')}
              className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                activeLayer === 'photo'
                  ? 'bg-benaa text-white shadow'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Real Photo
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('both')}
              className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all flex items-center gap-1 ${
                activeLayer === 'both'
                  ? 'bg-gradient-to-r from-benaa to-majd text-white shadow'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>3D Hybrid</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('blueprint')}
              className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all flex items-center gap-1 ${
                activeLayer === 'blueprint'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Blueprint</span>
            </button>
          </div>

          <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-white/80 font-mono hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>3D Tilt Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
