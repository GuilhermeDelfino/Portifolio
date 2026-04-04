import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '@/theme/ThemeContext'
import { useTranslation } from '@/i18n/LanguageContext'

const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 4rem;
  background: ${({ theme }) => theme.colors.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadows.nav};
  transition: background 0.3s ease;
`

const NavInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }
`

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
  flex-shrink: 0;
`

const Backdrop = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed;
    inset: 4rem 0 0 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 98;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
    transition: opacity 0.3s ease;
  }
`

const NavLinks = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`

const MobileMenu = styled.nav<{ $open: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    transform: translateY(${({ $open }) => ($open ? '0' : '-100%')});
    transition: transform 0.3s ease;
    padding: 1rem;
    z-index: 99;
    overflow-y: auto;
  }
`

const NavLink = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s, background 0.2s;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  @media (max-width: 767px) {
    font-size: 1.125rem;
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    text-align: center;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s;
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

const LangButton = styled(IconButton)`
  font-size: 0.7rem;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 0.5px;
  min-width: 2rem;
`

const HamburgerButton = styled(IconButton)`
  @media (min-width: 768px) {
    display: none;
  }
`

const navItems = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.education', href: '#education' },
  { key: 'nav.certifications', href: '#certifications' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
]

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { t, language, setLanguage } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <Nav>
        <NavInner>
          <Logo href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            GN
          </Logo>

          {/* Desktop links — hidden on mobile via media query */}
          <NavLinks>
            {navItems.map(item => (
              <NavLink key={item.key} onClick={() => handleNavClick(item.href)}>
                {t(item.key)}
              </NavLink>
            ))}
          </NavLinks>

          <Controls>
            <LangButton
              onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
              aria-label="Toggle language"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </LangButton>
            <IconButton onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <HiSun /> : <HiMoon />}
            </IconButton>
            <HamburgerButton
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </HamburgerButton>
          </Controls>
        </NavInner>
      </Nav>

      {/* Mobile menu — outside Nav to avoid backdrop-filter stacking context */}
      <MobileMenu $open={menuOpen}>
        {navItems.map(item => (
          <NavLink key={item.key} onClick={() => handleNavClick(item.href)}>
            {t(item.key)}
          </NavLink>
        ))}
      </MobileMenu>

      <Backdrop $open={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  )
}
