import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const STORAGE_KEY = 'app_language'

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'ar' || saved === 'en') return saved
      // Detect browser language
      const browserLang = navigator.language || navigator.userLanguage || ''
      return browserLang.toLowerCase().startsWith('ar') ? 'ar' : 'en'
    } catch {
      return 'en'
    }
  })

  const isRTL = language === 'ar'

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch (e) {
      console.warn('Unable to persist language preference:', e)
    }

    // Update document root HTML attributes dynamically
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    
    if (isRTL) {
      document.body.classList.add('rtl-mode')
    } else {
      document.body.classList.remove('rtl-mode')
    }
  }, [language, isRTL])

  const setLanguage = (lang) => {
    if (lang === 'ar' || lang === 'en') {
      setLanguageState(lang)
    }
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }

  /**
   * Helper translation function
   * @param {any} en - Content for English
   * @param {any} ar - Content for Arabic
   */
  const t = (en, ar) => (language === 'ar' ? (ar !== undefined ? ar : en) : en)

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRTL,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
