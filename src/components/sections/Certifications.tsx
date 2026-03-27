import styled from 'styled-components'
import { FaAws, FaMicrosoft, FaExternalLinkAlt } from 'react-icons/fa'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'

const CertSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`

const Content = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.6s ease, transform 0.6s ease;
`

const Grid = styled.div`
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const CertCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CardTop = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
`

const IconWrapper = styled.div<{ $color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`

const CertName = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`

const Issuer = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`

const CertDate = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const CredentialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary}50;
  border-radius: 0.375rem;
  padding: 0.35rem 0.75rem;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 0.75rem;
  }
`

interface Cert {
  icon: React.ReactNode
  color: string
  name: string
  issuer: string
  date: string
  credentialUrl: string
  credentialLabel: string
}

export function Certifications() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const certs: Cert[] = [
    {
      icon: <FaAws />,
      color: '#FF9900',
      name: t('certifications.aws.name'),
      issuer: t('certifications.aws.issuer'),
      date: t('certifications.aws.date'),
      credentialUrl: 'https://www.credly.com/badges/bebcc624-4637-46c9-8ec8-13a12b2a8c4f',
      credentialLabel: t('certifications.view'),
    },
    {
      icon: <FaMicrosoft />,
      color: '#00A4EF',
      name: t('certifications.azure.name'),
      issuer: t('certifications.azure.issuer'),
      date: t('certifications.azure.date'),
      credentialUrl: 'https://learn.microsoft.com/en-us/users/narcisoguilherme-8459/credentials/f7bee6f4469289f2?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      credentialLabel: t('certifications.view'),
    },
  ]

  return (
    <CertSection id="certifications">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('certifications.title')}</SectionTitle>
          <Grid>
            {certs.map((cert, i) => (
              <CertCard key={i}>
                <CardTop>
                  <IconWrapper $color={cert.color}>{cert.icon}</IconWrapper>
                  <div>
                    <CertName>{cert.name}</CertName>
                    <Issuer>{cert.issuer}</Issuer>
                    <CertDate>{cert.date}</CertDate>
                  </div>
                </CardTop>
                <CredentialLink href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt />
                  {cert.credentialLabel}
                </CredentialLink>
              </CertCard>
            ))}
          </Grid>
        </Content>
      </Inner>
    </CertSection>
  )
}
