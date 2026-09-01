import { useState } from 'react'
import { Building2, Save, CheckCircle2 } from 'lucide-react'
import { useCompany } from '../hooks/useCompany.js'

export default function Companies() {
  const { companies, updateCompany, loading } = useCompany()

  const [activeTab, setActiveTab] = useState('benaa') // 'benaa' | 'majd'
  const [formData, setFormData] = useState({})
  const [savedSuccess, setSavedSuccess] = useState('')

  const activeCompany = companies.find((c) => c.id === activeTab) || companies[0]

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...(prev[activeTab] || activeCompany),
        [field]: value,
      },
    }))
  }

  const currentValues = formData[activeTab] || activeCompany || {}

  const handleSave = async (e) => {
    e.preventDefault()
    setSavedSuccess('')
    const res = await updateCompany(activeTab, currentValues)
    if (res.success) {
      setSavedSuccess('Saved successfully / تم حفظ البيانات بنجاح!')
      setTimeout(() => setSavedSuccess(''), 3500)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-benaa leading-tight">
            Companies Profile & Overview
          </h2>
          <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
            تعديل بيانات ورؤية شركة البناء للإنشاءات وشركة المجد للتجارة العامة
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl text-xs font-bold w-fit">
        <button
          type="button"
          onClick={() => {
            setActiveTab('benaa')
            setSavedSuccess('')
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
            activeTab === 'benaa'
              ? 'bg-benaa text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>AL BENAA AL RAHAB (مؤسسة البناء الرحاب)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('majd')
            setSavedSuccess('')
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
            activeTab === 'majd'
              ? 'bg-majd text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>AL MAJD LINES (مؤسسة خطوط المجد)</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Official Company Name (English)
              </label>
              <input
                type="text"
                required
                value={currentValues.name || ''}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 font-arabic mb-1.5">
                اسم الشركة الرسمي (باللغة العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                required
                value={currentValues.nameAr || ''}
                onChange={(e) => handleFieldChange('nameAr', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tagline / Slogan (English)
              </label>
              <input
                type="text"
                value={currentValues.tagline || ''}
                onChange={(e) => handleFieldChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 font-arabic mb-1.5">
                الشعار اللفظي (باللغة العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={currentValues.taglineAr || ''}
                onChange={(e) => handleFieldChange('taglineAr', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Company Detailed Profile & Overview (English)
            </label>
            <textarea
              rows={4}
              value={currentValues.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 font-arabic mb-1.5">
              نبذة تعريفية شاملة عن الشركة (باللغة العربية)
            </label>
            <textarea
              rows={4}
              dir="rtl"
              value={currentValues.descriptionAr || ''}
              onChange={(e) => handleFieldChange('descriptionAr', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            {savedSuccess ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>{savedSuccess}</span>
              </span>
            ) : <div />}

            <button
              type="submit"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition-all ${
                activeTab === 'benaa'
                  ? 'bg-benaa hover:bg-benaa-light'
                  : 'bg-majd hover:bg-majd-light'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Save Company Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
