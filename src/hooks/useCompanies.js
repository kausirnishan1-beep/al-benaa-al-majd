import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabaseClient.js'

const DEFAULT_COMPANIES = [
  {
    id: 'benaa',
    name: 'AL BENAA AL RAHAB CONTRACTING EST.',
    nameAr: 'مؤسسة البناء الرحاب للمقاولات',
    tagline: 'General Construction, Civil Contracting & Project Management',
    taglineAr: 'المقاولات العامة والإنشاءات والترميم وإدارة المشاريع',
    description: 'Specializing in residential compounds, commercial towers, structural rehabilitation, and full-lifecycle project management across Saudi Arabia.',
    descriptionAr: 'متخصصون في تنفيذ المشاريع السكنية والتجارية، أعمال التجديد والترميم، الصيانة الوقائية وإدارة المشاريع الهندسية المتكاملة.',
    color: 'benaa',
    logo: '/logo/al-benaa-logo.svg',
    path: '/benaa',
  },
  {
    id: 'majd',
    name: 'AL MAJD LINES FOR TRADE & IMPORT',
    nameAr: 'مؤسسة خطوط المجد للتجارة والاستيراد',
    tagline: 'International Trade, Import & Export & Logistics Solutions',
    taglineAr: 'التجارة العامة والاستيراد والتصدير وسلاسل الإمداد اللوجستية',
    description: 'Empowering Saudi infrastructure through premium construction material procurement, industrial machinery imports, and reliable global freight operations.',
    descriptionAr: 'متخصصون في الاستيراد والتصدير الدولي، التجارة العامة، توريد مواد البناء والمعدات الصناعية، وإدارة سلاسل الإمداد والخدمات اللوجستية المتكاملة.',
    color: 'majd',
    logo: '/logo/al-majd-logo.svg',
    path: '/majd',
  },
]

let companiesCache = null
let companiesRequest = null

function mapCompanies(data) {
  if (!data?.length) return DEFAULT_COMPANIES

  return data.map((c) => ({
    id: c.id,
    name: c.name || (c.id === 'benaa' ? 'AL BENAA AL RAHAB CONTRACTING EST.' : 'AL MAJD LINES FOR TRADE & IMPORT'),
    nameAr: c.name_ar || c.nameAr || '',
    tagline: c.tagline || '',
    taglineAr: c.tagline_ar || c.taglineAr || '',
    description: c.description || '',
    descriptionAr: c.description_ar || c.descriptionAr || '',
    color: c.color || (c.id === 'benaa' ? 'benaa' : 'majd'),
    logo: c.logo || (c.id === 'benaa' ? '/logo/al-benaa-logo.svg' : '/logo/al-majd-logo.svg'),
    path: c.path || `/${c.id}`,
  }))
}

async function loadCompanies(force = false) {
  if (!force && companiesCache) return companiesCache
  if (!force && companiesRequest) return companiesRequest

  companiesRequest = supabase
    .from('companies')
    .select('*')
    .order('id', { ascending: true })
    .then(({ data, error }) => {
      if (error) throw error
      companiesCache = mapCompanies(data)
      return companiesCache
    })
    .finally(() => {
      companiesRequest = null
    })

  return companiesRequest
}

export function useCompanies() {
  const [companies, setCompanies] = useState(() => companiesCache || DEFAULT_COMPANIES)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCompanies = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)
    try {
      setCompanies(await loadCompanies(force))
    } catch (err) {
      console.warn('Supabase companies fetch error, using resilient defaults:', err)
      setCompanies(companiesCache || DEFAULT_COMPANIES)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  const getCompany = useCallback(
    (id) => companies.find((c) => c.id === id) || null,
    [companies]
  )

  return {
    companies,
    loading,
    error,
    getCompany,
    refreshCompanies: () => fetchCompanies(true),
  }
}
