import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

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
      return { success: false, error: err.message || 'Failed to update company in Supabase database' }
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
