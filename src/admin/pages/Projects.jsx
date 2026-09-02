import { useState } from 'react'
import { Plus, Edit2, Trash2, Layers, ExternalLink, Image as ImageIcon, CheckCircle2 } from 'lucide-react'
import { useProjects } from '../hooks/useProjects.js'
import DataTable from '../components/DataTable.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject, loading } = useProjects()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [companyFilter, setCompanyFilter] = useState('all') // 'all' | 'benaa' | 'majd'

  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    company: 'benaa',
    category: 'construction',
    badge: 'Al-Benaa Construction',
    badgeAr: 'شركة البناء',
    image: '',
    description: '',
    descriptionAr: '',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    year: '2026',
    isFeatured: true,
  })

  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleOpenAdd = () => {
    setEditingProject(null)
    setFormError('')
    setFormData({
      title: '',
      titleAr: '',
      company: 'benaa',
      category: 'construction',
      badge: 'AL BENAA AL RAHAB CONTRACTING EST.',
      badgeAr: 'مؤسسة البناء الرحاب للمقاولات',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      description: '',
      descriptionAr: '',
      location: 'Riyadh, Saudi Arabia',
      locationAr: 'الرياض، المملكة العربية السعودية',
      year: new Date().getFullYear().toString(),
      isFeatured: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (project) => {
    setEditingProject(project)
    setFormError('')
    setFormData({
      title: project.title || '',
      titleAr: project.titleAr || project.title_ar || '',
      company: project.company || 'benaa',
      category: project.category || 'construction',
      badge: project.badge || 'AL BENAA AL RAHAB CONTRACTING EST.',
      badgeAr: project.badgeAr || project.badge_ar || 'مؤسسة البناء الرحاب للمقاولات',
      image: project.image || '',
      description: project.description || '',
      descriptionAr: project.descriptionAr || project.description_ar || '',
      location: project.location || 'Riyadh, Saudi Arabia',
      locationAr: project.locationAr || project.location_ar || 'الرياض، المملكة العربية السعودية',
      year: project.year || '2026',
      isFeatured: project.isFeatured ?? true,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setFormError('')

    const res = editingProject
      ? await updateProject(editingProject.id, formData)
      : await addProject(formData)

    setIsSaving(false)
    if (res?.success === false) {
      setFormError(res.error || 'Failed to save project in database.')
      return
    }
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      const res = await deleteProject(deleteTargetId)
      if (res?.success === false) {
        alert(`Error deleting project: ${res.error}`)
      }
      setDeleteTargetId(null)
    }
  }

  const filteredData = projects.filter((p) => {
    if (companyFilter === 'all') return true
    return p.company === companyFilter
  })

  const columns = [
    {
      header: 'Project / المشروع',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.title}
            className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{row.title}</p>
            <p className="text-[11px] text-gray-500 font-arabic truncate">{row.titleAr}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Company / الشركة',
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
            row.company === 'benaa'
              ? 'bg-benaa/10 text-benaa'
              : 'bg-majd/10 text-majd-dark'
          }`}
        >
          {row.company === 'benaa' ? 'Al-Benaa' : 'Al-Majd'}
        </span>
      ),
    },
    {
      header: 'Category / التصنيف',
      render: (row) => (
        <span className="capitalize text-gray-600 font-semibold text-xs">
          {row.category.replace('-', ' ')}
        </span>
      ),
    },
    {
      header: 'Location & Year',
      render: (row) => (
        <div className="text-xs text-gray-600">
          <p>{row.location}</p>
          <span className="text-[11px] text-gray-400 font-mono">{row.year}</span>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-benaa leading-tight">
            Project Portfolio & Contracts
          </h2>
          <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
            إدارة كافة المشاريع المنفذة وعقود التوريد وإضافتها للموقع
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-benaa text-white text-xs font-bold hover:bg-benaa-light transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project / إضافة مشروع جديد</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        searchKey="title"
        searchPlaceholder="Search project name, location... / بحث باسم المشروع..."
        filterComponent={
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setCompanyFilter('all')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                companyFilter === 'all'
                  ? 'bg-benaa text-white border-benaa'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setCompanyFilter('benaa')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                companyFilter === 'benaa'
                  ? 'bg-benaa text-white border-benaa'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              AL BENAA AL RAHAB
            </button>
            <button
              type="button"
              onClick={() => setCompanyFilter('majd')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                companyFilter === 'majd'
                  ? 'bg-majd text-white border-majd'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              AL MAJD LINES
            </button>
          </div>
        }
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenEdit(row)}
              className="p-2 rounded-xl text-gray-500 hover:text-benaa hover:bg-gray-50 transition-colors"
              title="Edit Project"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTargetId(row.id)}
              className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="font-bold text-benaa text-lg">
                  {editingProject ? 'Edit Project / تعديل المشروع' : 'Add New Project / إضافة مشروع جديد'}
                </h3>
                <p className="text-xs text-gray-500 font-arabic">
                  سيتم نشر المشروع فوراً على الموقع العام وسلايدر المشاريع
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Company / الشركة
                  </label>
                  <select
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company: e.target.value,
                        badge: e.target.value === 'benaa' ? 'AL BENAA AL RAHAB CONTRACTING EST.' : 'AL MAJD LINES FOR TRADE & IMPORT',
                        badgeAr: e.target.value === 'benaa' ? 'مؤسسة البناء الرحاب للمقاولات' : 'مؤسسة خطوط المجد للتجارة والاستيراد',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                  >
                    <option value="benaa">AL BENAA AL RAHAB (مؤسسة البناء الرحاب)</option>
                    <option value="majd">AL MAJD LINES (مؤسسة خطوط المجد)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category / تصنيف العمل
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                  >
                    <option value="construction">Construction / الإنشاءات</option>
                    <option value="renovation">Renovation / التجديد والترميم</option>
                    <option value="import-export">Import & Export / الاستيراد والتصدير</option>
                    <option value="logistics">Logistics / اللوجستيات</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Project Title (English)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Riyadh Residential Compound - Phase 2"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  اسم المشروع (باللغة العربية)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  placeholder="مثال: مجمع سكني فاخر - المرحلة الثانية - الرياض"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Location / الموقع
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Riyadh, Saudi Arabia"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Completion Year / سنة الإنجاز
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                  />
                </div>
              </div>

              {/* Image Uploader */}
              <ImageUploader
                value={formData.image}
                onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                label="Project Photo / صورة المشروع"
              />

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key project specifications, surface area, or contract details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  تفاصيل المشروع (باللغة العربية)
                </label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  placeholder="مواصفات التنفيذ ونطاق العمل الإنشائي أو التوريد..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredProj"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-benaa focus:ring-benaa w-4 h-4"
                />
                <label htmlFor="featuredProj" className="text-xs font-bold text-gray-700">
                  Show in Homepage Slider / إظهار في سلايدر الصفحة الرئيسية
                </label>
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
                  {isSaving ? 'Saving / جاري الحفظ...' : editingProject ? 'Save Project / حفظ التعديلات' : 'Publish Project / نشر المشروع'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Project / حذف المشروع"
        message="Are you sure you want to remove this project? It will no longer appear on the website. / هل أنت متأكد من رغبتك في حذف هذا المشروع نهائياً؟"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
