import { Languages } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function LanguageSwitcher({ className = '', mobile = false }) {
  const { language, toggleLanguage } = useLanguage()

  if (mobile) {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`w-full min-h-[44px] py-2.5 px-3 flex items-center justify-between rounded-xl border border-gray-200 hover:border-benaa/30 text-xs font-bold text-gray-700 hover:text-benaa hover:bg-gray-50 transition-all active:scale-98 ${className}`}
        aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-benaa" />
          <div className="text-left rtl:text-right">
            <span className="block leading-tight font-sans">
              Language / اللغة
            </span>
            <span className="block text-[10px] text-gray-500 font-arabic leading-tight">
              {language === 'en' ? 'التبديل إلى العربية (RTL)' : 'Switch to English (LTR)'}
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-benaa/10 text-benaa font-mono">
          {language === 'en' ? 'EN ➔ عربي' : 'عربي ➔ EN'}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-benaa/40 text-xs font-bold text-gray-700 hover:text-benaa hover:bg-benaa/5 transition-all focus:outline-none focus:ring-2 focus:ring-benaa/20 active:scale-95 ${className}`}
      title={language === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
      aria-label={`Current language: ${language === 'en' ? 'English' : 'Arabic'}. Click to switch.`}
    >
      <Languages className="w-3.5 h-3.5 text-benaa shrink-0" />
      <div className="flex items-center gap-1">
        <span className={language === 'en' ? 'text-benaa font-extrabold' : 'text-gray-400'}>
          EN
        </span>
        <span className="text-gray-300 text-[10px]">|</span>
        <span className={`font-arabic ${language === 'ar' ? 'text-benaa font-extrabold' : 'text-gray-400'}`}>
          عربي
        </span>
      </div>
    </button>
  )
}
