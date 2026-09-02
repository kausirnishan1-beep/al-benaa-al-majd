import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

export function useSettings() {
  const [settings, setSettings] = useState({
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
      email: 'info@albenaa-almajd.com',
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
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('site_settings')
        .select('*')

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        setSettings((prev) => {
          const merged = { ...prev }
          data.forEach((row) => {
            if (row.key && row.value) {
              const val = typeof row.value === 'string' ? JSON.parse(row.value) : row.value
              merged[row.key] = {
                ...prev[row.key],
                ...val,
              }
              if (row.key === 'contact') {
                merged.contact = {
                  ...prev.contact,
                  ...val,
                  phone: val.phone || prev.contact.phone || '+966 11 456 7890',
                  phoneAlt: val.phoneAlt || prev.contact.phoneAlt || '+966 50 123 4567',
                  whatsapp: val.whatsapp || val.phoneAlt || val.phone || prev.contact.whatsapp || '+966501234567',
                  email: val.email || prev.contact.email || 'info@albenaa-almajd.com',
                  addressEn: val.addressEn || prev.contact.addressEn || 'King Fahd Road, Al Olaya, Riyadh, Kingdom of Saudi Arabia',
                  addressAr: val.addressAr || prev.contact.addressAr || 'طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية',
                }
              }
            }
          })
          return merged
        })
      }
    } catch (err) {
      console.warn('Supabase settings fetch error, using default settings:', err)
      setError(err.message)
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
    refreshSettings: fetchSettings,
    updateSettingGroup,
  }
}
