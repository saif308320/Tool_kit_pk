import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('toolkitpk_lang') || 'en')

  useEffect(() => {
    document.body.classList.remove('lang-en', 'lang-ur')
    document.body.classList.add(lang === 'ur' ? 'lang-ur' : 'lang-en')
    localStorage.setItem('toolkitpk_lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
