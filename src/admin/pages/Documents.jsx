import { useState } from 'react'
import { Plus, Edit2, Trash2, FileText, Download } from 'lucide-react'
import { useDocuments } from '../hooks/useDocuments.js'
import DataTable from '../components/DataTable.jsx'
import FileUploader from '../components/FileUploader.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function Documents() {
  const { documents, addDocument, updateDocument, deleteDocument } = useDocuments()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    fileUrl: '',
    tag: 'Official Document',
    sortOrder: 1,
  })

  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleOpenAdd = () => {
    setEditingDoc(null)
    setFormError('')
    setFormData({
      title: '',
      titleAr: '',
      description: '',
      descriptionAr: '',
      fileUrl: '/documents/company-profile.pdf',
      tag: 'Official Certificate',
      sortOrder: documents.length + 1,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc)
    setFormError('')
    setFormData({
      title: doc.title,
      titleAr: doc.titleAr || doc.title_ar || '',
      description: doc.description || '',
      descriptionAr: doc.descriptionAr || doc.description_ar || '',
      fileUrl: doc.fileUrl || doc.file_url || '',
      tag: doc.tag || 'Official Document',
      sortOrder: doc.sortOrder || 1,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setFormError('')

    const res = editingDoc
      ? await updateDocument(editingDoc.id, formData)
      : await addDocument(formData)

    setIsSaving(false)
    if (res?.success === false) {
      setFormError(res.error || 'Failed to save document in database.')
      return
    }
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      const res = await deleteDocument(deleteTargetId)
      if (res?.success === false) {
        alert(`Error deleting document: ${res.error}`)
      }
      setDeleteTargetId(null)
    }
  }

  const columns = [
    {
      header: 'Document Title / اسم المستند',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center font-bold flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.title}</p>
            <p className="text-[11px] text-gray-500 font-arabic">{row.titleAr}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Tag / التصنيف',
      render: (row) => (
        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-majd/10 text-majd-dark">
          {row.tag}
        </span>
      ),
    },
    {
      header: 'File Link / الملف',
      render: (row) => (
        <a
          href={row.fileUrl || '#'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-benaa hover:underline"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </a>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-benaa leading-tight">
            Compliance & Document Management
          </h2>
          <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
            إدارة وتحديث البروفايل التعريفي وسجل التراخيص والشهادات المعتمدة بالمملكة
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-benaa text-white text-xs font-bold hover:bg-benaa-light transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document / إضافة مستند</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={documents}
        searchKey="title"
        searchPlaceholder="Search document title... / بحث باسم المستند..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenEdit(row)}
              className="p-2 rounded-xl text-gray-500 hover:text-benaa hover:bg-gray-50 transition-colors"
              title="Edit Document"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTargetId(row.id)}
              className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="font-bold text-benaa text-lg">
                  {editingDoc ? 'Edit Document / تعديل المستند' : 'Add New Document / إضافة مستند'}
                </h3>
                <p className="text-xs text-gray-500 font-arabic">
                  سيظهر هذا المستند في صفحة الحوكمة والشهادات (/compliance)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Document Tag / التصنيف
                </label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. Certified License / PDF Brochure"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Title (English)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Saudi Commercial Registration (CR)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  عنوان المستند أو الشهادة (باللغة العربية)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  placeholder="مثال: السجل التجاري والتراخيص النظامية بالمملكة"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
                />
              </div>

              {/* File Uploader */}
              <FileUploader
                value={formData.fileUrl}
                onChange={(fileUrl) => setFormData({ ...formData, fileUrl })}
                label="PDF File or Document / ملف المستند"
              />

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief note about the licensing authority or validity..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  الوصف والتفاصيل (باللغة العربية)
                </label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  placeholder="تراخيص معتمدة وسارية من وزارة التجارة والاستثمار..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel / إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-benaa text-white text-xs font-bold hover:bg-benaa-light disabled:opacity-50 transition-all shadow-md"
                >
                  {isSaving ? 'Saving / جاري الحفظ...' : editingDoc ? 'Save Document / حفظ' : 'Add Document / حفظ المستند'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Document / حذف المستند"
        message="Are you sure you want to remove this document? / هل أنت متأكد من رغبتك في حذف هذا المستند؟"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
