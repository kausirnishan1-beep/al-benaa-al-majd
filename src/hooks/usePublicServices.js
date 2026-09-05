import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabaseClient.js'

const DEFAULT_SERVICES = [
  {
    id: 'benaa-construction',
    companyId: 'benaa',
    title: 'General Construction & Contracting',
    titleAr: 'المقاولات العامة والإنشاءات',
    description: 'Turnkey residential and commercial construction adhering strictly to certified engineering standards and Saudi Building Code.',
    descriptionAr: 'تنفيذ المباني السكنية والتجارية وتسليم المفتاح وفق كود البناء السعودي.',
    path: '/benaa/construction',
    icon: 'Building2',
  },
  {
    id: 'benaa-renovation',
    companyId: 'benaa',
    title: 'Architectural Renovation & Remodeling',
    titleAr: 'الترميم المعماري والتجديد',
    description: 'Comprehensive structural restoration, interior modernization, and facade enhancement for historical and contemporary properties.',
    descriptionAr: 'أعمال الترميم والتطوير المعماري وتحديث الواجهات والمباني.',
    path: '/benaa/renovation',
    icon: 'Hammer',
  },
  {
    id: 'majd-import-export',
    companyId: 'majd',
    title: 'Global Import & Export Solutions',
    titleAr: 'الاستيراد والتصدير الدولي',
    description: 'Seamless cross-border trading operations with streamlined customs clearance and end-to-end documentation handling.',
    descriptionAr: 'حلول متكاملة في عمليات الاستيراد والتصدير والتخليص الجمركي.',
    path: '/majd/import-export',
    icon: 'Globe',
  },
  {
    id: 'majd-logistics',
    companyId: 'majd',
    title: 'Agile Freight & Logistics',
    titleAr: 'الخدمات اللوجستية والشحن',
    description: 'Multi-modal international shipping, secure regional warehousing, and reliable freight distribution network.',
    descriptionAr: 'خدمات الشحن الدولي والتخزين والتوزيع اللوجستي السريع.',
    path: '/majd/logistics',
    icon: 'Truck',
  },
]

export function usePublicServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES)
  const [loading, setLoading] = useState(false)
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
