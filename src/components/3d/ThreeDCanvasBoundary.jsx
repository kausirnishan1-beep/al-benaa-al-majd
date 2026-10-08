import { Component } from 'react'
import { Building2 } from 'lucide-react'

function supportsWebGL() {
  if (typeof document === 'undefined') return true
  if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) return true

  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })
    )
  } catch {
    return false
  }
}

function shouldUseLightweightVisual() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
  if (/jsdom/i.test(navigator.userAgent)) return false

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  return (
    window.innerWidth < 768 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    connection?.saveData === true ||
    (Number.isFinite(navigator.deviceMemory) && navigator.deviceMemory <= 4) ||
    (Number.isFinite(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4)
  )
}

export default class ThreeDCanvasBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { unavailable: !supportsWebGL() || shouldUseLightweightVisual() }
  }

  static getDerivedStateFromError() {
    return { unavailable: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn('3D visual unavailable; using static fallback:', error)
    }
  }

  render() {
    if (!this.state.unavailable) return this.props.children

    return (
      <div
        className="relative flex h-full min-h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-benaa-dark via-[#06241b] to-slate-950 px-6 text-center"
        role="img"
        aria-label={this.props.label || 'Static architectural brand visual'}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4a017_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-majd-light/30 bg-white/10 shadow-2xl backdrop-blur-sm">
            <Building2 className="h-10 w-10 text-majd-light" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-extrabold tracking-wide text-white">AL BENAA &amp; AL MAJD</p>
          <p className="mt-1 text-xs font-semibold text-white/65 font-arabic">البناء بثقة، والتجارة برؤية عالمية</p>
        </div>
      </div>
    )
  }
}
