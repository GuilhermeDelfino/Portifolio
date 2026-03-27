import { useState } from 'react'
import styled from 'styled-components'
import { FaGraduationCap } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'
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

const Grid = styled.div`
  margin-top: 2.5rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`

const EduCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  overflow: hidden;
`

const CardHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  width: 100%;

  @media (min-width: 768px) {
    cursor: default;
  }
`

const Icon = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
`

const Degree = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.125rem;
`

const School = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.125rem;
`

const Period = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const ChevronIcon = styled.div<{ $open: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.125rem;
  flex-shrink: 0;
  transition: transform 0.25s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});

  @media (min-width: 768px) {
    display: none;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0 1.25rem;

  @media (max-width: 767px) {
    display: none;
  }
`

const CollapsibleBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.25s ease;

  & > div { overflow: hidden; }

  @media (min-width: 768px) {
    display: block;
  }
`

const CardBody = styled.div`
  padding: 0.75rem 1.25rem 1.25rem;

  @media (min-width: 768px) {
    padding-top: 0.875rem;
  }
`

const HighlightLabel = styled.p`
  font-size: 0.7rem;
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
  font-size: 0.8125rem;
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

interface EduEntry {
  degree: string
  school: string
  period: string
  highlightLabel: string
  bullets: string[]
}

function EduCardItem({ entry }: { entry: EduEntry }) {
  const [open, setOpen] = useState(false)

  return (
    <EduCard>
      <CardHeader onClick={() => setOpen(o => !o)}>
        <Icon><FaGraduationCap /></Icon>
        <HeaderText>
          <Degree>{entry.degree}</Degree>
          <School>{entry.school}</School>
          <Period>{entry.period}</Period>
        </HeaderText>
        <ChevronIcon $open={open}><HiChevronDown /></ChevronIcon>
      </CardHeader>

      <Divider />

      <CollapsibleBody $open={open}>
        <div>
          <CardBody>
            <HighlightLabel>{entry.highlightLabel}</HighlightLabel>
            <BulletList>
              {entry.bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
            </BulletList>
          </CardBody>
        </div>
      </CollapsibleBody>
    </EduCard>
  )
}

export function Education() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const entries: EduEntry[] = [
    {
      degree: t('education.sptech.degree'),
      school: t('education.sptech.school'),
      period: t('education.sptech.period'),
      highlightLabel: t('education.sptech.highlight.label'),
      bullets: [0, 1, 2, 3, 4, 5].map(i => t(`education.sptech.highlight.b${i}`)),
    },
    {
      degree: t('education.etec.degree'),
      school: t('education.etec.school'),
      period: t('education.etec.period'),
      highlightLabel: t('education.etec.highlight.label'),
      bullets: [0, 1, 2, 3].map(i => t(`education.etec.highlight.b${i}`)),
    },
  ]

  return (
    <EducationSection id="education">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('education.title')}</SectionTitle>
          <Grid>
            {entries.map((e, i) => <EduCardItem key={i} entry={e} />)}
          </Grid>
        </Content>
      </Inner>
    </EducationSection>
  )
}
