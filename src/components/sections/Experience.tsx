import { useState } from 'react'
import styled from 'styled-components'
import { HiChevronDown } from 'react-icons/hi'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillBadge } from '@/components/ui/SkillBadge'

const ExperienceSection = styled.section`
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

const Timeline = styled.div`
  margin-top: 2.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};

    @media (min-width: 768px) {
      left: 0.75rem;
    }
  }
`

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    padding-left: 3.5rem;
    margin-bottom: 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.35rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`

const Company = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.125rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const Role = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
`

const Meta = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.875rem;
`

const ToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  margin-bottom: 0.5rem;

  svg {
    transition: transform 0.2s;
  }

  &[aria-expanded='true'] svg {
    transform: rotate(180deg);
  }

  @media (min-width: 768px) {
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

const SubProject = styled.div`
  margin-bottom: 0.875rem;
`

const SubProjectTitle = styled.p`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.375rem;
`

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 0.375rem;
`

const Bullet = styled.li`
  font-size: 0.85rem;
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

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.875rem;
`

interface TimelineEntryProps {
  company: string
  role: string
  period: string
  location: string
  children: React.ReactNode
  technologies: string[]
}

function TimelineEntry({ company, role, period, location, children, technologies }: TimelineEntryProps) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <TimelineItem>
      <Company>{company}</Company>
      <Role>{role}</Role>
      <Meta>{period} · {location}</Meta>

      <ToggleBtn onClick={() => setOpen(o => !o)} aria-expanded={open}>
        {open ? t('experience.collapse') : t('experience.expand')}
        <HiChevronDown />
      </ToggleBtn>

      <CollapsibleBody $open={open}>
        <div>{children}</div>
      </CollapsibleBody>

      <TechRow>
        {technologies.map(tech => (
          <SkillBadge key={tech}>{tech}</SkillBadge>
        ))}
      </TechRow>
    </TimelineItem>
  )
}

export function Experience() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const netcrackerBullets = [0, 1, 2].map(i => t(`experience.netcracker.bullets.${i}`))
  const raiaBullets = [0, 1, 2].map(i => t(`experience.accenture.raiadrogasil.bullets.${i}`))
  const circleBullets = [0, 1].map(i => t(`experience.accenture.circlek.bullets.${i}`))

  return (
    <ExperienceSection id="experience">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('experience.title')}</SectionTitle>

          <Timeline>
            <TimelineEntry
              company={t('experience.netcracker.company')}
              role={t('experience.netcracker.role')}
              period={t('experience.netcracker.period')}
              location={t('experience.netcracker.location')}
              technologies={['Java', 'Go', 'Spring Boot', 'Kubernetes', 'ArangoDB', 'Kafka', 'Graylog', 'PostgreSQL']}
            >
              <BulletList>
                {netcrackerBullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
              </BulletList>
            </TimelineEntry>

            <TimelineEntry
              company={t('experience.accenture.company')}
              role={t('experience.accenture.role')}
              period={t('experience.accenture.period')}
              location={t('experience.accenture.location')}
              technologies={['Java', 'Spring Boot', 'Next.js', 'NestJS', 'GraphQL', 'RabbitMQ', 'MongoDB', 'Azure', 'OracleDB', 'Redis']}
            >
              <SubProject>
                <SubProjectTitle>{t('experience.accenture.sub.raiadrogasil')}</SubProjectTitle>
                <BulletList>
                  {raiaBullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
                </BulletList>
              </SubProject>
              <SubProject>
                <SubProjectTitle>{t('experience.accenture.sub.circlek')}</SubProjectTitle>
                <BulletList>
                  {circleBullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
                </BulletList>
              </SubProject>
            </TimelineEntry>
          </Timeline>
        </Content>
      </Inner>
    </ExperienceSection>
  )
}
