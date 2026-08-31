import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'
import { companies as fallbackCompanies } from '../../data/companies.js'

export function useCompany() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('companies')
        .select('*')

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((c) => ({
          id: c.id,
          name: c.name,
          nameAr: c.name_ar || c.nameAr,
          tagline: c.tagline,
          taglineAr: c.tagline_ar || c.taglineAr,
          description: c.description,
          descriptionAr: c.description_ar || c.descriptionAr,
          color: c.color || (c.id === 'benaa' ? 'benaa' : 'majd'),
          logo: c.logo || (c.id === 'benaa' ? '/logo/al-benaa-logo.svg' : '/logo/al-majd-logo.svg'),
          path: c.path || `/${c.id}`,
        }))
        setCompanies(mapped)
      } else {
        setCompanies(fallbackCompanies)
      }
    } catch (err) {
      console.warn('Supabase companies fetch error, using fallback:', err)
      setCompanies(fallbackCompanies)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  const updateCompany = async (id, updatedData) => {
    try {
      const payload = {
        name: updatedData.name,
        name_ar: updatedData.nameAr || updatedData.name_ar,
        tagline: updatedData.tagline,
        tagline_ar: updatedData.taglineAr || updatedData.tagline_ar,
        description: updatedData.description,
        description_ar: updatedData.descriptionAr || updatedData.description_ar,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateErr } = await supabase
        .from('companies')
        .update(payload)
        .eq('id', id)
        .select()

      if (updateErr) throw updateErr

      await fetchCompanies()
      return { success: true, data }
    } catch (err) {
      console.error('Error updating company:', err)
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
      )
      return { success: true, localOnly: true }
    }
  }

  return {
    companies,
    loading,
    error,
    refreshCompanies: fetchCompanies,
    updateCompany,
  }
}
