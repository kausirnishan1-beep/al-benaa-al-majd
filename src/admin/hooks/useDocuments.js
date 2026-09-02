import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'



export function useDocuments() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDocuments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('documents')
        .select('*')
        .order('sort_order', { ascending: true })

      if (fetchErr) throw fetchErr

      if (data && data.length > 0) {
        const mapped = data.map((d) => ({
          id: d.id,
          title: d.title,
          titleAr: d.title_ar || d.titleAr || '',
          description: d.description || '',
          descriptionAr: d.description_ar || d.descriptionAr || '',
          fileUrl: d.file_url || d.fileUrl || '#',
          tag: d.tag || 'Document',
          sortOrder: d.sort_order || d.sortOrder || 0,
        }))
        setDocuments(mapped)
      } else {
        setDocuments([])
      }
    } catch (err) {
      console.error('Supabase documents fetch error:', err)
      setDocuments([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const addDocument = async (docData) => {
    try {
      const payload = {
        title: docData.title,
        title_ar: docData.titleAr || docData.title_ar || '',
        description: docData.description || '',
        description_ar: docData.descriptionAr || docData.description_ar || '',
        file_url: docData.fileUrl || docData.file_url || '#',
        tag: docData.tag || 'Document',
        sort_order: docData.sortOrder || (documents.length + 1),
      }

      const { data, error: insertErr } = await supabase
        .from('documents')
        .insert([payload])
        .select()

      if (insertErr) throw insertErr

      await fetchDocuments()
      return { success: true, data }
    } catch (err) {
      console.error('Error adding document to Supabase:', err)
      return { success: false, error: err.message || 'Failed to save document in Supabase database' }
    }
  }

  const updateDocument = async (id, docData) => {
    try {
      const payload = {
        title: docData.title,
        title_ar: docData.titleAr || docData.title_ar,
        description: docData.description,
        description_ar: docData.descriptionAr || docData.description_ar,
        file_url: docData.fileUrl || docData.file_url,
        tag: docData.tag,
        sort_order: docData.sortOrder,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateErr } = await supabase
        .from('documents')
        .update(payload)
        .eq('id', id)
        .select()

      if (updateErr) throw updateErr

      await fetchDocuments()
      return { success: true, data }
    } catch (err) {
      console.error('Error updating document in Supabase:', err)
      return { success: false, error: err.message || 'Failed to update document in Supabase database' }
    }
  }

  const deleteDocument = async (id) => {
    try {
      const { error: delErr } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (delErr) throw delErr

      setDocuments((prev) => prev.filter((p) => p.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting document from Supabase:', err)
      return { success: false, error: err.message || 'Failed to delete document from Supabase database' }
    }
  }

  return {
    documents,
    loading,
    error,
    refreshDocuments: fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
  }
}
