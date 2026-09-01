import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../utils/supabaseClient.js'

const defaultDocuments = [
  {
    id: 1,
    title: 'Comprehensive Corporate Profile & Qualifications',
    titleAr: 'الملف التعريفي الشامل وسابقة الأعمال للمجموعة',
    description: 'Download our official company credentials, completed projects portfolio, and technical capabilities brochure.',
    descriptionAr: 'تحميل البروفايل الرسمي الشامل وسجل المشاريع المنجزة والقدرات الفنية والتنفيذية.',
    fileUrl: '/documents/company-profile.pdf',
    tag: 'PDF Brochure',
    sortOrder: 1,
  },
  {
    id: 2,
    title: 'Saudi Commercial Registration (CR) & Licensing',
    titleAr: 'السجل التجاري والتراخيص النظامية بالمملكة',
    description: 'Fully accredited and certified by the Saudi Ministry of Commerce for contracting, general trading, and import/export.',
    descriptionAr: 'تراخيص معتمدة وسارية من وزارة التجارة والاستثمار للمقاولات العامة والتجارة والاستيراد.',
    fileUrl: '#',
    tag: 'Certified License',
    sortOrder: 2,
  },
  {
    id: 3,
    title: 'Saudi Contractors Authority (SCA) Membership',
    titleAr: 'عضوية الهيئة السعودية للمقاولين',
    description: 'Classified commercial contractor complying with high industry classification and technical governance standards.',
    descriptionAr: 'عضوية وتصنيف معتمد لدى الهيئة السعودية للمقاولين لمشاريع البناء والتشييد.',
    fileUrl: '#',
    tag: 'Accreditation',
    sortOrder: 3,
  },
  {
    id: 4,
    title: 'ZATCA Tax & VAT Compliance Certificate',
    titleAr: 'شهادة الالتزام الضريبي والزكاة (هيئة الزكاة والضريبة والجمارك)',
    description: 'Full tax, customs, and electronic invoicing compliance certified by ZATCA.',
    descriptionAr: 'شهادة تسجيل وضريبة القيمة المضافة والفوترة الإلكترونية المعتمدة.',
    fileUrl: '#',
    tag: 'Tax Compliance',
    sortOrder: 4,
  },
]

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
          titleAr: d.title_ar || d.titleAr,
          description: d.description,
          descriptionAr: d.description_ar || d.descriptionAr,
          fileUrl: d.file_url || d.fileUrl,
          tag: d.tag,
          sortOrder: d.sort_order || d.sortOrder || 0,
        }))
        setDocuments(mapped)
      } else {
        setDocuments(defaultDocuments)
      }
    } catch (err) {
      console.warn('Supabase documents fetch error, using fallback:', err)
      setDocuments(defaultDocuments)
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
