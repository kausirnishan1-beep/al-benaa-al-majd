import { useState } from 'react'
import { Plus, Edit2, Trash2, ShoppingBag, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import DataTable from '../components/DataTable.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

const categories = [
  { id: 'construction-materials', nameEn: 'Construction Materials', nameAr: 'مواد البناء الأساسية' },
  { id: 'industrial-equipment', nameEn: 'Industrial Machinery', nameAr: 'المعدات والآليات الصناعية' },
  { id: 'mep-supplies', nameEn: 'MEP & Electrical Supplies', nameAr: 'مستلزمات الكهرباء والكهروميكانيك' },
  { id: 'finishing', nameEn: 'Architectural Finishing', nameAr: 'مواد التشطيب والديكور' },
]

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    category: 'construction-materials',
    image: '',
    description: '',
    descriptionAr: '',
    isActive: true,
  })

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      nameAr: '',
      category: 'construction-materials',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      description: '',
      descriptionAr: '',
      isActive: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      nameAr: product.nameAr || product.name_ar || '',
      category: product.category || 'construction-materials',
      image: product.image || '',
      description: product.description || '',
      descriptionAr: product.descriptionAr || product.description_ar || '',
      isActive: product.isActive ?? true,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData)
    } else {
      await addProduct(formData)
    }
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteProduct(deleteTargetId)
      setDeleteTargetId(null)
    }
  }

  const filteredData = products.filter((p) => {
    if (categoryFilter === 'all') return true
    return p.category === categoryFilter
  })

  const columns = [
    {
      header: 'Product / المنتج',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{row.name}</p>
            <p className="text-[11px] text-gray-500 font-arabic truncate">{row.nameAr}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category / التصنيف',
      render: (row) => (
        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-majd/10 text-majd-dark capitalize">
          {row.category.replace('-', ' ')}
        </span>
      ),
    },
    {
      header: 'Status / الحالة',
      render: (row) => (
        <span
          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
            row.isActive !== false
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {row.isActive !== false ? 'In Catalog ✅' : 'Hidden ⏸️'}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-benaa leading-tight">
            Product Catalog & Supplies (Al-Majd)
          </h2>
          <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
            إدارة كتالوج المنتجات ومواد البناء والمعدات المستوردة لشركة المجد
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-majd text-white text-xs font-bold hover:bg-majd-light transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product / إضافة منتج</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        searchKey="name"
        searchPlaceholder="Search product name... / بحث باسم المنتج..."
        filterComponent={
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-majd/30 focus:border-majd"
          >
            <option value="all">All Categories (جميع التصنيفات)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameEn} ({c.nameAr})
              </option>
            ))}
          </select>
        }
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenEdit(row)}
              className="p-2 rounded-xl text-gray-500 hover:text-benaa hover:bg-gray-50 transition-colors"
              title="Edit Product"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTargetId(row.id)}
              className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Product"
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
                <h3 className="font-bold text-majd-dark text-lg">
                  {editingProduct ? 'Edit Product / تعديل المنتج' : 'Add New Product / إضافة منتج جديد'}
                </h3>
                <p className="text-xs text-gray-500 font-arabic">
                  سيظهر المنتج مباشرة في صفحة منتجات شركة المجد (/majd/products)
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
                  Category / تصنيف المنتج
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-majd/30 focus:border-majd"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameEn} ({c.nameAr})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Product Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. High-Tensile Rebar Steel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-majd/30 focus:border-majd"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  اسم المنتج (باللغة العربية)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="مثال: حديد تسليح عالي المقاومة ومطابق للمواصفات"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-majd/30 focus:border-majd text-right"
                />
              </div>

              {/* Image Uploader */}
              <ImageUploader
                value={formData.image}
                onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                label="Product Photo / صورة المنتج"
              />

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Product Description (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Technical specifications, standards compliance, packaging sizes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-majd/30 focus:border-majd"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-arabic mb-1">
                  وصف ومواصفات المنتج (باللغة العربية)
                </label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  placeholder="المواصفات القياسية وشهادات المطابقة..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-majd/30 focus:border-majd text-right"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="productActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-majd focus:ring-majd w-4 h-4"
                />
                <label htmlFor="productActive" className="text-xs font-bold text-gray-700">
                  Active Product in Catalog (إظهار المنتج في الكتالوج العام)
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
                  className="px-6 py-2.5 rounded-xl bg-majd text-white text-xs font-bold hover:bg-majd-light transition-all shadow-md"
                >
                  {editingProduct ? 'Save Product / حفظ التعديلات' : 'Add to Catalog / إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Product / حذف المنتج"
        message="Are you sure you want to remove this product from the commercial catalog? / هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً من الكتالوج؟"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
