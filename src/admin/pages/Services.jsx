import { useState } from 'react'
import { Plus, Edit2, Trash2, Briefcase, CheckCircle2, Building2 } from 'lucide-react'
import { useServices } from '../hooks/useServices.js'
import DataTable from '../components/DataTable.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function Services() {
  const { services, addService, updateService, deleteService, loading } = useServices()

  const [activeCompany, setActiveCompany] = useState('benaa') // 'benaa' | 'majd'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    companyId: 'benaa',
    path: '',
    isActive: true,
  })

  const handleOpenAdd = () => {
    setEditingService(null)
    setFormData({
      title: '',
      titleAr: '',
      description: '',
      descriptionAr: '',
      companyId: activeCompany,
      path: `/${activeCompany}/service-${Date.now()}`,
      isActive: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      titleAr: service.titleAr || service.title_ar || '',
      description: service.description || '',
      descriptionAr: service.descriptionAr || service.description_ar || '',
      companyId: service.companyId || activeCompany,
      path: service.path || '',
      isActive: service.isActive ?? true,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingService) {
      await updateService(editingService.id, formData)
    } else {
      await addService(formData)
    }
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteService(deleteTargetId)
      setDeleteTargetId(null)
    }
  }

  const filteredServices = services.filter((s) => s.companyId === activeCompany)

  const columns = [
    {
      header: 'Service / الخدمة',
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.title}</p>
          <p className="text-[11px] text-gray-500 font-arabic">{row.titleAr}</p>
        </div>
      ),
    },
    {
      header: 'Description / الوصف',
      render: (row) => (
        <p className="text-xs text-gray-600 line-clamp-2 max-w-sm">
          {row.description}
        </p>
      ),
    },
    {
      header: 'Status / الحالة',
      render: (row) => (
        <span
          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
            row.isActive !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {row.isActive !== false ? 'Active ✅' : 'Disabled ⏸️'}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-benaa leading-tight">
            Corporate Services & Capabilities
          </h2>
          <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
            إدارة الخدمات الهندسية والإنشائية، وأنشطة التجارة العامة والاستيراد والتصدير
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-benaa text-white text-xs font-bold hover:bg-benaa-light transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service / إضافة خدمة</span>
        </button>
      </div>

      {/* Company Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl text-xs font-bold w-fit">
        <button
          type="button"
          onClick={() => setActiveCompany('benaa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeCompany === 'benaa'
              ? 'bg-benaa text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Al-Benaa Construction (شركة البناء)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCompany('majd')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeCompany === 'majd'
              ? 'bg-majd text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Al-Majd Trading (شركة المجد)</span>
        </button>
      </div>

      {/* Services Table */}
      <DataTable
        columns={columns}
        data={filteredServices}
        searchKey="title"
        searchPlaceholder="Search service name... / بحث باسم الخدمة..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenEdit(row)}
              className="p-2 rounded-xl text-gray-500 hover:text-benaa hover:bg-gray-50 transition-colors"
              title="Edit Service"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTargetId(row.id)}
              className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Service"
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
                  {editingService ? 'Edit Service / تعديل الخدمة' : 'Add New Service / إضافة خدمة جديدة'}
                </h3>
                <p className="text-xs text-gray-500 font-arabic">
                  {activeCompany === 'benaa' ? 'تابعة لشركة البناء للمقاولات' : 'تابعة لشركة المجد للتجارة'}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Service Title (English)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Turnkey Civil Construction"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  اسم وعنوان الخدمة (باللغة العربية)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  placeholder="مثال: تنفيذ المشاريع الإنشائية المتكاملة"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Scope of work, machinery deployed, safety standards..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  تفاصيل ونطاق العمل (باللغة العربية)
                </label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  placeholder="وصف تفصيلي للخدمة ومميزات التنفيذ..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="serviceActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-benaa focus:ring-benaa w-4 h-4"
                />
                <label htmlFor="serviceActive" className="text-xs font-bold text-gray-700">
                  Active Service (تفعيل وإظهار الخدمة في الموقع)
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
                  className="px-6 py-2.5 rounded-xl bg-benaa text-white text-xs font-bold hover:bg-benaa-light transition-all shadow-md"
                >
                  {editingService ? 'Save Changes / حفظ التعديلات' : 'Add Service / إضافة الخدمة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Service / حذف الخدمة"
        message="Are you sure you want to remove this service? / هل أنت متأكد من رغبتك في حذف هذه الخدمة نهائياً؟"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
