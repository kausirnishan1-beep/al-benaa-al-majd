import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabaseClient.js'

const DEFAULT_SERVICES = [
  {
    id: 'benaa-construction',
    companyId: 'benaa',
    title: 'Construction',
    titleAr: 'الإنشاءات',
    description: 'Turnkey residential compounds, commercial towers, and reinforced concrete structures.',
    descriptionAr: 'مجمعات سكنية وأبراج تجارية وهياكل خرسانية متكاملة.',
    path: '/benaa/construction',
    icon: 'Building2',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'benaa-renovation',
    companyId: 'benaa',
    title: 'Renovation',
    titleAr: 'الترميم والتجديد',
    description: 'Architectural remodeling, structural rehabilitation, and facade modernization.',
    descriptionAr: 'تطوير وترميم المباني وتحديث الواجهات والتشطيبات الداخلية.',
    path: '/benaa/renovation',
    icon: 'Hammer',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'benaa-maintenance',
    companyId: 'benaa',
    title: 'Maintenance',
    titleAr: 'الصيانة والتشغيل',
    description: 'Preventive maintenance programs and 24/7 electromechanical facility operations.',
    descriptionAr: 'برامج صيانة وقائية وإدارة المرافق والأنظمة الكهروميكانيكية.',
    path: '/benaa/maintenance',
    icon: 'Wrench',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'benaa-project-management',
    companyId: 'benaa',
    title: 'Project Management',
    titleAr: 'إدارة المشاريع',
    description: 'Full-lifecycle project management, supervision, and value engineering.',
    descriptionAr: 'إدارة دورة حياة المشروع والإشراف الميداني وضبط الجودة.',
    path: '/benaa/project-management',
    icon: 'ClipboardCheck',
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'majd-import-export',
    companyId: 'majd',
    title: 'Import & Export',
    titleAr: 'الاستيراد والتصدير',
    description: 'Cross-border trading, factory direct supplies, and SABER compliance.',
    descriptionAr: 'الاستيراد المباشر من المصانع العالمية والتخليص الجمركي المعتمد.',
    path: '/majd/import-export',
    icon: 'Globe2',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'majd-general-trading',
    companyId: 'majd',
    title: 'General Trading',
    titleAr: 'التجارة العامة',
    description: 'Wholesale distribution of certified construction materials and tools.',
    descriptionAr: 'توزيع وتوريد مواد البناء والمعدات الصناعية بالجملة.',
    path: '/majd/general-trading',
    icon: 'ShoppingBag',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'majd-product-sourcing',
    companyId: 'majd',
    title: 'Product Sourcing',
    titleAr: 'توريد المنتجات',
    description: 'Direct global manufacturer vetting, quality audits, and procurement.',
    descriptionAr: 'البحث عن المصانع العالمية وتدقيق الجودة والتفاوض المالي.',
    path: '/majd/product-sourcing',
    icon: 'PackageSearch',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'majd-logistics',
    companyId: 'majd',
    title: 'Logistics Solutions',
    titleAr: 'الخدمات اللوجستية',
    description: 'Multimodal freight forwarding, port customs clearance, and inland transport.',
    descriptionAr: 'الشحن البحري والجوي والتخزين والنقل البري المتكامل.',
    path: '/majd/logistics',
    icon: 'Truck',
    isActive: true,
    sortOrder: 4,
  },
]

export function usePublicServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES)
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
