import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabaseClient.js'

export function usePublicServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((s) => ({
          id: s.id,
          companyId: s.company_id || s.companyId || (s.id.startsWith('majd') ? 'majd' : 'benaa'),
          title: s.title,
          titleAr: s.title_ar || s.titleAr || '',
          description: s.description || '',
          descriptionAr: s.description_ar || s.descriptionAr || '',
          path: s.path,
          icon: s.icon,
          isActive: s.is_active ?? true,
          sortOrder: s.sort_order || 0,
        }))
        setServices(mapped)
      } else {
        setServices([])
      }
    } catch (err) {
      console.error('Supabase services fetch error:', err)
      setServices([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const benaaServices = services.filter((s) => s.companyId === 'benaa')
  const majdServices = services.filter((s) => s.companyId === 'majd')

  const getServicesByCompany = useCallback(
    (companyId) => services.filter((s) => s.companyId === companyId),
    [services]
  )

  return {
    services,
    benaaServices,
    majdServices,
    loading,
    error,
    getServicesByCompany,
    refreshServices: fetchServices,
  }
}
