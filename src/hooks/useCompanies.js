import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabaseClient.js'

const DEFAULT_COMPANIES = [
  {
    id: 'benaa',
    name: 'AL BENAA AL RAHAB CONTRACTING EST.',
    nameAr: 'مؤسسة البناء الرحاب للمقاولات',
    tagline: 'General Contracting & Engineering Excellence',
    taglineAr: 'مقاولات عامة وتميز هندسي وإنشائي متكامل',
    description: 'Specializing in residential and commercial construction, architectural renovation, structural maintenance, and certified project management across Saudi Arabia.',
    descriptionAr: 'متخصصون في البناء السكني والتجاري، وأعمال الترميم المعماري، والصيانة الهيكلية، وإدارة المشاريع المعتمدة في كافة أنحاء المملكة.',
    color: 'benaa',
    logo: '/logo/al-benaa-logo.svg',
    path: '/benaa',
  },
  {
    id: 'majd',
    name: 'AL MAJD LINES FOR TRADE & IMPORT',
    nameAr: 'مؤسسة خطوط المجد للتجارة والاستيراد',
    tagline: 'Global Trade & Logistics Solutions',
    taglineAr: 'تجارة عامة وحلول استيراد وسلاسل إمداد دولية',
    description: 'Providing comprehensive import & export, international product sourcing, wholesale commercial distribution, and agile freight logistics connecting global suppliers to Saudi markets.',
    descriptionAr: 'تقديم خدمات متكاملة في الاستيراد والتصدير، وتوريد المنتجات العالمية، والتوزيع التجاري، والخدمات اللوجستية التي تربط الموردين العالميين بالسوق السعودي.',
    color: 'majd',
    logo: '/logo/al-majd-logo.svg',
    path: '/majd',
  },
]

export function useCompanies() {
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('companies')
        .select('*')
        .order('id', { ascending: true })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((c) => ({
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
        setCompanies(mapped)
      } else {
        setCompanies([])
      }
    } catch (err) {
      console.error('Supabase companies fetch error:', err)
      setCompanies([])
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

  return { companies, loading, error, getCompany, refreshCompanies: fetchCompanies }
}
