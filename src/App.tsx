import { useEffect } from 'react'
import { ThemeProvider } from '@/theme/ThemeContext'
import { LanguageProvider, useTranslation } from '@/i18n/LanguageContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Education } from '@/components/sections/Education'
import { Certifications } from '@/components/sections/Certifications'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

function AppContent() {
  const { language } = useTranslation()

  useEffect(() => {
    document.title = language === 'pt'
      ? 'Guilherme Narciso · Engenheiro de Software'
      : 'Guilherme Narciso · Software Engineer'
  }, [language])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  )
}
