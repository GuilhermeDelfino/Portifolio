import styled from 'styled-components'
import { FaGraduationCap } from 'react-icons/fa'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'

const EducationSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
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

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const EduCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CardHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  flex-shrink: 0;
`

const Degree = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`

const School = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`

const Period = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const HighlightLabel = styled.p`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Bullet = styled.li`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export function Education() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const entries = [
    {
      degree: t('education.sptech.degree'),
      school: t('education.sptech.school'),
      period: t('education.sptech.period'),
      highlightLabel: t('education.sptech.highlight.label'),
      bullets: [
        t('education.sptech.highlight.b0'),
        t('education.sptech.highlight.b1'),
        t('education.sptech.highlight.b2'),
        t('education.sptech.highlight.b3'),
        t('education.sptech.highlight.b4'),
        t('education.sptech.highlight.b5'),
      ],
    },
    {
      degree: t('education.etec.degree'),
      school: t('education.etec.school'),
      period: t('education.etec.period'),
      highlightLabel: t('education.etec.highlight.label'),
      bullets: [
        t('education.etec.highlight.b0'),
        t('education.etec.highlight.b1'),
        t('education.etec.highlight.b2'),
        t('education.etec.highlight.b3'),
      ],
    },
  ]

  return (
    <EducationSection id="education">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('education.title')}</SectionTitle>
          <Grid>
            {entries.map((e, i) => (
              <EduCard key={i}>
                <CardHeader>
                  <Icon><FaGraduationCap /></Icon>
                  <div>
                    <Degree>{e.degree}</Degree>
                    <School>{e.school}</School>
                    <Period>{e.period}</Period>
                  </div>
                </CardHeader>
                <Divider />
                <div>
                  <HighlightLabel>{e.highlightLabel}</HighlightLabel>
                  <BulletList>
                    {e.bullets.map((b, j) => (
                      <Bullet key={j}>{b}</Bullet>
                    ))}
                  </BulletList>
                </div>
              </EduCard>
            ))}
          </Grid>
        </Content>
      </Inner>
    </EducationSection>
  )
}
