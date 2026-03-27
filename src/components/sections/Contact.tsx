import { useState } from 'react'
import styled from 'styled-components'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaFileAlt, FaWhatsapp } from 'react-icons/fa'
import { HiClipboardCopy, HiCheck, HiExternalLink } from 'react-icons/hi'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'

const ContactSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1rem;

  @media (min-width: 480px) {
    padding: 5rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`

const Content = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.6s ease, transform 0.6s ease;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.75rem 0 2rem;
  max-width: 500px;
  line-height: 1.7;
  font-size: 0.9375rem;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  max-width: 580px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`

const ContactCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}15;
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.625rem;
`

const ContactIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
`

const ContactInfo = styled.div`
  min-width: 0;
  flex: 1;
`

const ContactLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.125rem;
`

const ContactValue = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Actions = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`

const ActionBtn = styled.a<{ $green?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    border-color: ${({ $green }) => ($green ? '#25d366' : 'inherit')};
    color: ${({ $green }) => ($green ? '#25d366' : 'inherit')};
    background: ${({ $green }) => ($green ? '#25d36610' : 'inherit')};
  }

  &:not([data-green]):hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`

const CopiedBtn = styled(ActionBtn)`
  border-color: #22c55e !important;
  color: #22c55e !important;
  background: #22c55e10 !important;
  pointer-events: none;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}15;
  }
`

function CopyContactCard({
  label, value, icon, directUrl, directIcon, directLabel, isWhatsApp,
}: {
  label: string; value: string; icon: React.ReactNode
  directUrl: string; directIcon: React.ReactNode; directLabel: string; isWhatsApp?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ContactCard>
      <CardTop>
        <ContactIcon>{icon}</ContactIcon>
        <ContactInfo>
          <ContactLabel>{label}</ContactLabel>
          <ContactValue title={value}>{value}</ContactValue>
        </ContactInfo>
      </CardTop>
      <Actions>
        {copied ? (
          <CopiedBtn as="span"><HiCheck /> Copiado!</CopiedBtn>
        ) : (
          <ActionBtn as="button" onClick={handleCopy}>
            <HiClipboardCopy /> Copiar
          </ActionBtn>
        )}
        <ActionBtn
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          $green={isWhatsApp}
          data-green={isWhatsApp ? true : undefined}
          style={isWhatsApp ? {} : undefined}
        >
          {directIcon} {directLabel}
        </ActionBtn>
      </Actions>
    </ContactCard>
  )
}

export function Contact() {
  const { t, language } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const cvFile = language === 'pt' ? '/CV_Guilherme_Narciso_PT.pdf' : '/CV_Guilherme_Narciso_EN.pdf'
  const phone = '5511972595523'

  return (
    <ContactSection id="contact">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('contact.title')}</SectionTitle>
          <Subtitle>{t('contact.subtitle')}</Subtitle>

          <ContactGrid>
            <CopyContactCard
              label={t('contact.email')}
              value="guilhermedelfino25@gmail.com"
              icon={<FaEnvelope />}
              directUrl="mailto:guilhermedelfino25@gmail.com"
              directIcon={<HiExternalLink />}
              directLabel="Email"
            />
            <CopyContactCard
              label={t('contact.phone')}
              value="+55 11 97259-5523"
              icon={<FaPhone />}
              directUrl={`https://wa.me/${phone}`}
              directIcon={<FaWhatsapp />}
              directLabel="WhatsApp"
              isWhatsApp
            />
            <ContactItem href="https://linkedin.com/in/guilherme-narciso" target="_blank" rel="noopener noreferrer">
              <ContactIcon><FaLinkedin /></ContactIcon>
              <ContactInfo>
                <ContactLabel>{t('contact.linkedin')}</ContactLabel>
                <ContactValue>guilherme-narciso</ContactValue>
              </ContactInfo>
            </ContactItem>
            <ContactItem href="https://github.com/GuilhermeDelfino" target="_blank" rel="noopener noreferrer">
              <ContactIcon><FaGithub /></ContactIcon>
              <ContactInfo>
                <ContactLabel>{t('contact.github')}</ContactLabel>
                <ContactValue>GuilhermeDelfino</ContactValue>
              </ContactInfo>
            </ContactItem>
            <ContactItem href={cvFile} download style={{ gridColumn: '1 / -1' }}>
              <ContactIcon><FaFileAlt /></ContactIcon>
              <ContactInfo>
                <ContactLabel>{t('contact.cv')}</ContactLabel>
                <ContactValue>{t('contact.cv.download')}</ContactValue>
              </ContactInfo>
            </ContactItem>
          </ContactGrid>
        </Content>
      </Inner>
    </ContactSection>
  )
}
