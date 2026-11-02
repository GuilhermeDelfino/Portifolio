import { useEffect, useState } from 'react'
import en from './locales/en.json'
import pt from './locales/pt.json'

import { LanguageContext, type Language } from './languageContextValue'

type Translations = Record<string, string>
const locales: Record<Language, Translations> = { en, pt }

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null
    if (saved === 'en' || saved === 'pt') return saved
    return navigator.language.startsWith('pt') ? 'pt' : 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const t = (key: string): string => locales[language][key] ?? locales['en'][key] ?? key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
