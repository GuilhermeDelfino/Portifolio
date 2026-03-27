import styled from 'styled-components'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'

const AboutSection = styled.section`
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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  font-size: 0.9375rem;
`

const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 720px;
`

const P = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  font-size: 1rem;
`

export function About() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <AboutSection id="about">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('about.title')}</SectionTitle>
          <Subtitle>Guilherme Delfino Narciso · São Paulo, Brasil</Subtitle>
          <Paragraphs>
            <P>{t('about.p1')}</P>
            <P>{t('about.p2')}</P>
            <P>{t('about.p3')}</P>
          </Paragraphs>
        </Content>
      </Inner>
    </AboutSection>
  )
}
