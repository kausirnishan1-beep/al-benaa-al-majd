import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const DEFAULT_SETTINGS = {
  general: {
    siteNameEn: 'AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT',
    siteNameAr: 'مؤسسة البناء الرحاب للمقاولات ومؤسسة خطوط المجد للتجارة والاستيراد',
    taglineEn: 'Building the Future, Connecting Global Markets',
    taglineAr: 'نبني المستقبل، ونربط الأسواق العالمية',
  },
  contact: {
    phone: '+966 11 456 7890',
    phoneAlt: '+966 50 123 4567',
    whatsapp: '+966501234567',
    email: 'info@albenaagroup.com',
    addressEn: 'King Fahd Road, Al Olaya, Riyadh, Kingdom of Saudi Arabia',
    addressAr: 'طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية',
    workingHoursEn: 'Sunday - Thursday: 8:00 AM - 5:00 PM',
    workingHoursAr: 'الأحد - الخميس: 8:00 ص - 5:00 م',
    mapEmbedUrl: 'https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed',
  },
  stats: {
    yearsExperience: '',
    completedProjects: '',
    tradePartners: '',
    exportHubs: '',
  },
  social: {
    facebook: '',
    linkedin: '',
    instagram: '',
    twitter: '',
  },
}

let settingsCache = null
let settingsRequest = null

function mergeSettingsRows(rows) {
  const merged = Object.fromEntries(
    Object.entries(DEFAULT_SETTINGS).map(([key, value]) => [key, { ...value }])
  )

  rows?.forEach((row) => {
    if (!row.key || !row.value) return

    let value = row.value
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value)
      } catch {
        return
      }
    }
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return

    merged[row.key] = { ...(merged[row.key] || {}), ...value }
  })

  const contact = merged.contact
  merged.contact = {
    ...DEFAULT_SETTINGS.contact,
    ...contact,
    phone: contact.phone?.trim() || DEFAULT_SETTINGS.contact.phone,
    phoneAlt: contact.phoneAlt?.trim() || DEFAULT_SETTINGS.contact.phoneAlt,
    whatsapp: contact.whatsapp?.trim() || contact.phoneAlt?.trim() || contact.phone?.trim() || DEFAULT_SETTINGS.contact.whatsapp,
    email: contact.email?.trim() || DEFAULT_SETTINGS.contact.email,
    addressEn: contact.addressEn?.trim() || DEFAULT_SETTINGS.contact.addressEn,
    addressAr: contact.addressAr?.trim() || DEFAULT_SETTINGS.contact.addressAr,
  }

  return merged
}

async function loadSettings(force = false) {
  if (!force && settingsCache) return settingsCache
  if (!force && settingsRequest) return settingsRequest

  settingsRequest = supabase
    .from('site_settings')
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error
      settingsCache = mergeSettingsRows(data)
      return settingsCache
    })
    .finally(() => {
      settingsRequest = null
    })

  return settingsRequest
}

export function useSettings() {
  const [settings, setSettings] = useState(() => settingsCache || DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSettings = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)
    try {
      setSettings(await loadSettings(force))
    } catch (err) {
      console.warn('Supabase settings fetch error, using default settings:', err)
      setError(err.message)
      setSettings(settingsCache || DEFAULT_SETTINGS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const updateSettingGroup = async (key, newValue) => {
    try {
      const { error: upsertErr } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value: newValue,
          updated_at: new Date().toISOString(),
        })

      if (upsertErr) throw upsertErr

      setSettings((prev) => ({
        ...prev,
        [key]: newValue,
      }))
      settingsCache = {
        ...(settingsCache || settings),
        [key]: newValue,
      }
      return { success: true }
    } catch (err) {
      console.error(`Error saving settings for ${key} in Supabase:`, err)
      return { success: false, error: err.message || `Failed to save settings for ${key} in Supabase database` }
    }
  }

  return {
    settings,
    loading,
    error,
    refreshSettings: () => fetchSettings(true),
    updateSettingGroup,
  }
}
