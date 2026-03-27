import styled from 'styled-components'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useTranslation } from '@/i18n/LanguageContext'

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 1.5rem;
  text-align: center;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`

const FooterText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <FooterWrapper>
      <SocialLinks>
        <SocialLink href="https://github.com/GuilhermeDelfino" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/guilherme-narciso" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialLink>
        <SocialLink href="mailto:guilhermedelfino25@gmail.com" aria-label="Email">
          <FaEnvelope />
        </SocialLink>
      </SocialLinks>
      <FooterText>{t('footer.built')}</FooterText>
      <FooterText>© {year} Guilherme Delfino Narciso · {t('footer.rights')}</FooterText>
    </FooterWrapper>
  )
}
