import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((p) => ({
          id: p.id,
          title: p.title,
          titleAr: p.title_ar || p.titleAr || '',
          company: p.company,
          category: p.category,
          badge: p.badge,
          badgeAr: p.badge_ar || p.badgeAr || '',
          image: p.image,
          description: p.description,
          descriptionAr: p.description_ar || p.descriptionAr || '',
          location: p.location,
          locationAr: p.location_ar || p.locationAr || '',
          year: p.year,
          isFeatured: p.is_featured ?? true,
        }))
        setProjects(mapped)
      } else {
        setProjects([])
      }
    } catch (err) {
      console.error('Supabase projects fetch error:', err)
      setProjects([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const addProject = async (projectData) => {
    try {
      const payload = {
        title: projectData.title,
        title_ar: projectData.titleAr || projectData.title_ar || '',
        company: projectData.company || 'benaa',
        category: projectData.category || 'construction',
        badge: projectData.badge || (projectData.company === 'benaa' ? 'AL BENAA AL RAHAB CONTRACTING EST.' : 'AL MAJD LINES FOR TRADE & IMPORT'),
        badge_ar: projectData.badgeAr || (projectData.company === 'benaa' ? 'مؤسسة البناء الرحاب للمقاولات' : 'مؤسسة خطوط المجد للتجارة والاستيراد'),
        image: projectData.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
        description: projectData.description || '',
        description_ar: projectData.descriptionAr || projectData.description_ar || '',
        location: projectData.location || 'Riyadh, Saudi Arabia',
        location_ar: projectData.locationAr || 'الرياض، المملكة العربية السعودية',
        year: projectData.year || new Date().getFullYear().toString(),
        is_featured: projectData.isFeatured ?? true,
      }

      const { data, error: insertErr } = await supabase
        .from('projects')
        .insert([payload])
        .select()

      if (insertErr) throw insertErr

      await fetchProjects()
      return { success: true, data }
    } catch (err) {
      console.error('Error adding project to Supabase:', err)
      return { success: false, error: err.message || 'Failed to save project in Supabase database' }
    }
  }

  const updateProject = async (id, projectData) => {
    try {
      const payload = {
        title: projectData.title,
        title_ar: projectData.titleAr || projectData.title_ar || '',
        company: projectData.company,
        category: projectData.category,
        badge: projectData.badge,
        badge_ar: projectData.badgeAr || projectData.badge_ar,
        image: projectData.image,
        description: projectData.description,
        description_ar: projectData.descriptionAr || projectData.description_ar,
        location: projectData.location,
        location_ar: projectData.locationAr || projectData.location_ar,
        year: projectData.year,
        is_featured: projectData.isFeatured,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateErr } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', id)
        .select()

      if (updateErr) throw updateErr

      await fetchProjects()
      return { success: true, data }
    } catch (err) {
      console.error('Error updating project:', err)
      return { success: false, error: err.message || 'Failed to update project in Supabase database' }
    }
  }

  const deleteProject = async (id) => {
    try {
      const { error: delErr } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (delErr) throw delErr

      setProjects((prev) => prev.filter((p) => p.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting project:', err)
      return { success: false, error: err.message || 'Failed to delete project from Supabase database' }
    }
  }

  return {
    projects,
    loading,
    error,
    refreshProjects: fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  }
}
