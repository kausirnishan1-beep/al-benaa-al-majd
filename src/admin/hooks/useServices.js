import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'
import { benaaServices, majdServices } from '../../data/services.js'

const defaultServices = [...benaaServices, ...majdServices]

export function useServices() {
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
        .order('sort_order', { ascending: true })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((s) => ({
          id: s.id,
          companyId: s.company_id || s.companyId,
          title: s.title,
          titleAr: s.title_ar || s.titleAr,
          description: s.description,
          descriptionAr: s.description_ar || s.descriptionAr,
          path: s.path,
          icon: s.icon,
          isActive: s.is_active ?? true,
          sortOrder: s.sort_order || 0,
        }))
        setServices(mapped)
      } else {
        setServices(defaultServices)
      }
    } catch (err) {
      console.warn('Supabase services fetch error, using fallback:', err)
      setServices(defaultServices)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const addService = async (serviceData) => {
    try {
      const payload = {
        id: serviceData.id || `${serviceData.companyId}-${Date.now()}`,
        company_id: serviceData.companyId || 'benaa',
        title: serviceData.title,
        title_ar: serviceData.titleAr || serviceData.title_ar || '',
        description: serviceData.description || '',
        description_ar: serviceData.descriptionAr || serviceData.description_ar || '',
        path: serviceData.path || `/${serviceData.companyId}/${serviceData.id || 'service'}`,
        is_active: serviceData.isActive ?? true,
        sort_order: serviceData.sortOrder || (services.length + 1),
      }

      const { data, error: insertErr } = await supabase
        .from('services')
        .insert([payload])
        .select()

      if (insertErr) throw insertErr

      await fetchServices()
      return { success: true, data }
    } catch (err) {
      console.error('Error adding service:', err)
      return { success: false, error: err.message || 'Failed to save service in Supabase database' }
    }
  }

  const updateService = async (id, serviceData) => {
    try {
      const payload = {
        title: serviceData.title,
        title_ar: serviceData.titleAr || serviceData.title_ar,
        description: serviceData.description,
        description_ar: serviceData.descriptionAr || serviceData.description_ar,
        path: serviceData.path,
        is_active: serviceData.isActive ?? true,
        sort_order: serviceData.sortOrder,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateErr } = await supabase
        .from('services')
        .update(payload)
        .eq('id', id)
        .select()

      if (updateErr) throw updateErr

      await fetchServices()
      return { success: true, data }
    } catch (err) {
      console.error('Error updating service:', err)
      return { success: false, error: err.message || 'Failed to update service in Supabase database' }
    }
  }

  const deleteService = async (id) => {
    try {
      const { error: delErr } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (delErr) throw delErr

      setServices((prev) => prev.filter((s) => s.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting service:', err)
      return { success: false, error: err.message || 'Failed to delete service from Supabase database' }
    }
  }

  return {
    services,
    loading,
    error,
    refreshServices: fetchServices,
    addService,
    updateService,
    deleteService,
  }
}
