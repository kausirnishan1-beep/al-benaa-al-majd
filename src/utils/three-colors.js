import * as THREE from 'three'

/**
 * =======================================================================
 * THREE.JS SINGLE SOURCE OF TRUTH COLOR PALETTE
 * =======================================================================
 * Adheres strictly to the corporate brand architecture:
 * AL BENAA: Deep Architectural Green
 * AL MAJD: Warm Royal Gold
 * TEAL: Technical / Data Accent (<5% surface)
 * AMBER: Secondary Warm Highlight
 * NEUTRALS: Concrete, Glass, White & Lighting
 */

export const THREE_COLORS = {
  BENAA: {
    primary: 0x0f4c3a,
    light: 0x1a6b52,
    dark: 0x0a3528,
    deepDark: 0x06241b,
    glass: 0x0e3a2f,
    wireframe: 0x1a6b52,
    emissive: 0x041a14,
  },
  MAJD: {
    primary: 0xb8860b,
    light: 0xd4a017,
    dark: 0x8b6508,
    core: 0x402e03,
    coreEmissive: 0x684b06,
    spire: 0x5a4103,
  },
  TEAL: {
    primary: 0x2dd4bf, // Shared technical accent / data pulses / structural highlights
    light: 0x5eead4,
    dark: 0x0f3e30,
  },
  AMBER: {
    primary: 0xf59e0b, // Secondary micro-accent / orbital rings
    light: 0xfbbf24,
    dark: 0xd97706,
  },
  NEUTRALS: {
    white: 0xffffff,
    ivory: 0xffe8a3,
    concrete: 0x24332e,
    podium: 0x14201c,
    foundation: 0x11211c,
    beaconRed: 0xff3b30,
    darkBackdrop: 0x06241b,
  },
  LIGHTS: {
    ambient: 0xffffff,
    sun: 0xffffff,
    key: 0xffffff,
    benaaPoint: 0x2dd4bf,
    majdPoint: 0xd4a017,
  },
}

export const THREE_COLOR_INSTANCES = {
  teal: new THREE.Color(THREE_COLORS.TEAL.primary),
  gold: new THREE.Color(THREE_COLORS.MAJD.light),
  green: new THREE.Color(THREE_COLORS.BENAA.primary),
}
