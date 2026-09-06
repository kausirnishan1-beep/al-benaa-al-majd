import * as THREE from 'three'

/**
 * =======================================================================
 * THREE.JS STRUCTURED 3D COLOR PALETTE & TOKENS
 * =======================================================================
 * Separated cleanly into 3 distinct logical domains:
 * 1. BRAND: Corporate Identity & Accents (Benaa Green, Majd Gold, Teal, Amber)
 * 2. MATERIALS: Physical Architectural Shaders (Glass, Steel, Concrete, Ground)
 * 3. ENVIRONMENT: Atmospheric Sky, Sun & Studio Lighting
 * =======================================================================
 */

// 1. BRAND CORPORATE IDENTITY
export const BRAND_COLORS = {
  BENAA: {
    primary: 0x0f4c3a,
    light: 0x1a6b52,
    dark: 0x0a3528,
    deepDark: 0x051b14,
  },
  MAJD: {
    primary: 0xb8860b,
    light: 0xd4a017,
    dark: 0x8b6508,
    core: 0x402e03,
  },
  TEAL: {
    primary: 0x14b8a6, // Muted refined technical teal
    light: 0x2dd4bf,   // Subtle data packet pulse
    dark: 0x0f766e,    // Connection corridor
  },
  AMBER: {
    primary: 0xf59e0b, // Micro-highlight only
    light: 0xfbbf24,
    dark: 0xd97706,
  },
}

// 2. PHYSICAL ARCHITECTURAL MATERIALS
export const MATERIAL_COLORS = {
  glass: {
    tint: 0x143b30,       // Architectural emerald-slate tint
    emissive: 0x051b14,   // Deep internal body absorb
    neutralTint: 0x1e293b,
  },
  steel: {
    darkTitanium: 0x1e293b,
    mullion: 0x1e293b,
    rebar: 0x94a3b8,
    cable: 0xffffff,
  },
  concrete: {
    fairFaced: 0xe2e8f0,
    podium: 0xcfd8dc,
    slab: 0x24332e,
  },
  ground: {
    slate: 0x1e293b,
    foundation: 0x11211c,
    plazaDark: 0x0f172a,
    gridPrimary: 0x475569,
    gridDark: 0x0f172a,
  },
  interior: {
    warmIlluminatedFloor: 0xfef3c7,
    floorGlow: 0xd4a017,
  },
  markers: {
    beaconRed: 0xff3b30,
    googlePinRed: 0xee1b24,
    googlePinEmissive: 0x5a0b0f,
  },
}

// 3. ATMOSPHERIC ENVIRONMENT & LIGHTING
export const ENVIRONMENT_COLORS = {
  sky: {
    zenithGreen: '#0a3528',
    slateAtmosphere: '#1e293b',
    horizonAmbient: '#e2e8f0',
    horizonWarmSun: '#fef08a',
    distantSkyline: '#334155',
    graniteGround: '#1e293b',
    deepFoundation: '#0f172a',
  },
  sun: {
    keyLight: 0xfffbeb,
    glintWhite: '#ffffff',
    glintWarm: '#fffbeb',
    glintHalo: 'rgba(254, 240, 138, 0.45)',
  },
  lighting: {
    hemiSky: 0xfffaed,
    hemiGround: 0x1e293b,
    warmRim: 0xfffaed,
    ambientStudio: 0xfffaed,
    ambientWhite: 0xffffff,
    benaaBounce: 0x1a6b52,
    majdBounce: 0xd4a017,
    tealBounce: 0x14b8a6,
    pinRedPoint: 0xef4444,
  },
}

// Backward compatibility helper mapping
export const THREE_COLORS = {
  BENAA: BRAND_COLORS.BENAA,
  MAJD: BRAND_COLORS.MAJD,
  TEAL: BRAND_COLORS.TEAL,
  AMBER: BRAND_COLORS.AMBER,
  NEUTRALS: {
    white: 0xffffff,
    warmWhite: 0xfffaed,
    concrete: MATERIAL_COLORS.concrete.slab,
    podium: MATERIAL_COLORS.ground.foundation,
    beaconRed: MATERIAL_COLORS.markers.beaconRed,
  },
  LIGHTS: {
    ambient: ENVIRONMENT_COLORS.lighting.ambientWhite,
    sun: ENVIRONMENT_COLORS.lighting.hemiSky,
    benaaPoint: ENVIRONMENT_COLORS.lighting.benaaBounce,
    majdPoint: ENVIRONMENT_COLORS.lighting.majdBounce,
  },
}

export const THREE_COLOR_INSTANCES = {
  teal: new THREE.Color(BRAND_COLORS.TEAL.primary),
  gold: new THREE.Color(BRAND_COLORS.MAJD.light),
  green: new THREE.Color(BRAND_COLORS.BENAA.primary),
}
