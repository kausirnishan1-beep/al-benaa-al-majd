import { useState, useEffect } from 'react'
import { Settings as SettingsIcon, Save, CheckCircle2, Phone, MapPin, Share2, BarChart3, Globe } from 'lucide-react'
import { useSettings } from '../hooks/useSettings.js'

export default function Settings() {
  const { settings, updateSettingGroup, loading } = useSettings()

  const [activeTab, setActiveTab] = useState('stats') // 'stats' | 'contact' | 'social' | 'general'
  const [formData, setFormData] = useState({ ...settings })
  const [savedSuccess, setSavedSuccess] = useState('')

  useEffect(() => {
    setFormData({ ...settings })
  }, [settings])

  const [saveError, setSaveError] = useState('')
  const [savingGroup, setSavingGroup] = useState('')

  const handleFieldChange = (group, field, value) => {
    setSavedSuccess('')
    setSaveError('')
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }))
  }

  const handleSaveGroup = async (groupKey) => {
    setSavedSuccess('')
    setSaveError('')
    const targetValue = formData[groupKey]
    if (!targetValue) return

    setSavingGroup(groupKey)
    const res = await updateSettingGroup(groupKey, targetValue)
    setSavingGroup('')
    if (res.success) {
      setSavedSuccess(groupKey)
      setTimeout(() => setSavedSuccess(''), 3500)
    } else {
      setSaveError(res.error || `Failed to save ${groupKey} settings in database.`)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-benaa leading-tight">
          System Settings & Dynamic Content
        </h2>
        <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
          تعديل الإحصائيات، بيانات التواصل، روابط السوشيال ميديا وعنوان المقر بالرياض
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-100 rounded-2xl text-xs font-bold w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'stats' ? 'bg-white text-benaa shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Statistics / الإحصائيات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'contact' ? 'bg-white text-benaa shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contact & Maps / التواصل</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'social' ? 'bg-white text-benaa shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social Media / التواصل الاجتماعي</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'general' ? 'bg-white text-benaa shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>General Branding / الهوية العامة</span>
        </button>
      </div>

      {/* TAB 1: STATISTICS */}
      {activeTab === 'stats' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-benaa text-base">Corporate Statistics & Counters</h3>
            <p className="text-xs text-gray-500 font-arabic">
              الأرقام والإحصائيات المعروضة في الصفحة الرئيسية
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Years of Experience / سنوات الخبرة
              </label>
              <input
                type="text"
                value={formData.stats?.yearsExperience || ''}
                onChange={(e) => handleFieldChange('stats', 'yearsExperience', e.target.value)}
                placeholder="15+"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Completed Projects / المشاريع المنجزة
              </label>
              <input
                type="text"
                value={formData.stats?.completedProjects || ''}
                onChange={(e) => handleFieldChange('stats', 'completedProjects', e.target.value)}
                placeholder="150+"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Global Trade Partners / شركاء التجارة
              </label>
              <input
                type="text"
                value={formData.stats?.tradePartners || ''}
                onChange={(e) => handleFieldChange('stats', 'tradePartners', e.target.value)}
                placeholder="45+"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Import/Export Logistics Hubs / المنافذ والموانئ
              </label>
              <input
                type="text"
                value={formData.stats?.exportHubs || ''}
                onChange={(e) => handleFieldChange('stats', 'exportHubs', e.target.value)}
                placeholder="12+"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>
          </div>

          <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
            {savedSuccess === 'stats' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Saved successfully! / تم حفظ الإحصائيات</span>
              </span>
            ) : saveError ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 animate-fade-in">
                <span>⚠️ {saveError}</span>
              </span>
            ) : <div />}

            <button
              type="button"
              disabled={savingGroup === 'stats'}
              onClick={() => handleSaveGroup('stats')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-benaa text-white font-bold text-xs hover:bg-benaa-light disabled:opacity-50 transition-all shadow-md flex-shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>{savingGroup === 'stats' ? 'Saving...' : 'Save Statistics'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: CONTACT & MAP */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-benaa text-base">Headquarters & Contact Details</h3>
            <p className="text-xs text-gray-500 font-arabic">
              أرقام الهواتف والواتساب والبريد الإلكتروني وعنوان الرياض ورابط خرائط جوجل
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Primary Phone Number / الهاتف الرئيسي
              </label>
              <input
                type="text"
                value={formData.contact?.phone || ''}
                onChange={(e) => handleFieldChange('contact', 'phone', e.target.value)}
                placeholder="+966 11 456 7890"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>WhatsApp Number / رقم الواتساب المباشر</span>
                <span className="text-[10px] font-normal text-emerald-600 font-arabic">يستخدم للزر العائم</span>
              </label>
              <input
                type="text"
                value={formData.contact?.whatsapp || ''}
                onChange={(e) => handleFieldChange('contact', 'whatsapp', e.target.value)}
                placeholder="+966 50 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/20 text-xs font-mono focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 font-bold text-emerald-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Alternative Mobile / رقم جوال إضافي
              </label>
              <input
                type="text"
                value={formData.contact?.phoneAlt || ''}
                onChange={(e) => handleFieldChange('contact', 'phoneAlt', e.target.value)}
                placeholder="+966 50 000 0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Corporate Inquiries Email
              </label>
              <input
                type="email"
                value={formData.contact?.email || ''}
                onChange={(e) => handleFieldChange('contact', 'email', e.target.value)}
                placeholder="info@albenaa-almajd.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Headquarters Address (English)
              </label>
              <input
                type="text"
                value={formData.contact?.addressEn || ''}
                onChange={(e) => handleFieldChange('contact', 'addressEn', e.target.value)}
                placeholder="King Fahd Road, Al Olaya, Riyadh, Kingdom of Saudi Arabia"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 font-arabic mb-1.5">
                عنوان المقر الرئيسي (باللغة العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={formData.contact?.addressAr || ''}
                onChange={(e) => handleFieldChange('contact', 'addressAr', e.target.value)}
                placeholder="طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Google Maps Embed URL / رابط تضمين الخريطة
              </label>
              <input
                type="text"
                value={formData.contact?.mapEmbedUrl || ''}
                onChange={(e) => handleFieldChange('contact', 'mapEmbedUrl', e.target.value)}
                placeholder="https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>
          </div>

          <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
            {savedSuccess === 'contact' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Saved successfully! / تم حفظ بيانات التواصل</span>
              </span>
            ) : saveError ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 animate-fade-in">
                <span>⚠️ {saveError}</span>
              </span>
            ) : <div />}

            <button
              type="button"
              disabled={savingGroup === 'contact'}
              onClick={() => handleSaveGroup('contact')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-benaa text-white font-bold text-xs hover:bg-benaa-light disabled:opacity-50 transition-all shadow-md flex-shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>{savingGroup === 'contact' ? 'Saving...' : 'Save Contact Info'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL MEDIA */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-benaa text-base">Official Social Media Channels</h3>
            <p className="text-xs text-gray-500 font-arabic">
              روابط منصات التواصل الاجتماعي للمجموعة
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.social?.linkedin || ''}
                onChange={(e) => handleFieldChange('social', 'linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                X (Twitter) URL
              </label>
              <input
                type="url"
                value={formData.social?.twitter || ''}
                onChange={(e) => handleFieldChange('social', 'twitter', e.target.value)}
                placeholder="https://x.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.social?.instagram || ''}
                onChange={(e) => handleFieldChange('social', 'instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.social?.facebook || ''}
                onChange={(e) => handleFieldChange('social', 'facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>
          </div>

          <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
            {savedSuccess === 'social' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Saved successfully! / تم حفظ الروابط</span>
              </span>
            ) : saveError ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 animate-fade-in">
                <span>⚠️ {saveError}</span>
              </span>
            ) : <div />}

            <button
              type="button"
              disabled={savingGroup === 'social'}
              onClick={() => handleSaveGroup('social')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-benaa text-white font-bold text-xs hover:bg-benaa-light disabled:opacity-50 transition-all shadow-md flex-shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>{savingGroup === 'social' ? 'Saving...' : 'Save Social Links'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: GENERAL BRANDING */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-benaa text-base">Group Brand Names & Slogan</h3>
            <p className="text-xs text-gray-500 font-arabic">
              الأسماء التجارية الرسمية، الشعار وشعار المجموعة
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Site Name (English)
              </label>
              <input
                type="text"
                value={formData.general?.siteNameEn || ''}
                onChange={(e) => handleFieldChange('general', 'siteNameEn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 font-arabic mb-1.5">
                اسم الموقع والمجموعة (باللغة العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={formData.general?.siteNameAr || ''}
                onChange={(e) => handleFieldChange('general', 'siteNameAr', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Group Tagline (English)
              </label>
              <input
                type="text"
                value={formData.general?.taglineEn || ''}
                onChange={(e) => handleFieldChange('general', 'taglineEn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 font-arabic mb-1.5">
                الشعار اللفظي للمجموعة (باللغة العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={formData.general?.taglineAr || ''}
                onChange={(e) => handleFieldChange('general', 'taglineAr', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-arabic focus:ring-2 focus:ring-benaa/30 focus:border-benaa text-right"
              />
            </div>
          </div>

          <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
            {savedSuccess === 'general' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Saved successfully! / تم الحفظ</span>
              </span>
            ) : saveError ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 animate-fade-in">
                <span>⚠️ {saveError}</span>
              </span>
            ) : <div />}

            <button
              type="button"
              disabled={savingGroup === 'general'}
              onClick={() => handleSaveGroup('general')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-benaa text-white font-bold text-xs hover:bg-benaa-light transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Branding</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
