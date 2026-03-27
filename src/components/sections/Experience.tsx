import styled from 'styled-components'
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

const Timeline = styled.div`
  margin-top: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};

    @media (min-width: 768px) {
      left: 1.25rem;
    }
  }
`

const TimelineItem = styled.div`
  position: relative;
  padding-left: 3.5rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    padding-left: 4rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.35rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};

    @media (min-width: 768px) {
      left: 0.75rem;
    }
  }
`

const Company = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.125rem;
`

const Role = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
`

const Meta = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`

const SubProject = styled.div`
  margin-bottom: 1rem;
`

const SubProjectTitle = styled.p`
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.5rem;
`

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
`

const Bullet = styled.li`
  font-size: 0.9rem;
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

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
`

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
            {/* Netcracker */}
            <TimelineItem>
              <Company>{t('experience.netcracker.company')}</Company>
              <Role>{t('experience.netcracker.role')}</Role>
              <Meta>{t('experience.netcracker.period')} · {t('experience.netcracker.location')}</Meta>
              <BulletList>
                {netcrackerBullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
              </BulletList>
              <TechRow>
                {['Java', 'Go', 'Spring Boot', 'Kubernetes', 'ArangoDB', 'Kafka', 'Graylog', 'PostgreSQL'].map(t => (
                  <SkillBadge key={t}>{t}</SkillBadge>
                ))}
              </TechRow>
            </TimelineItem>

            {/* Accenture */}
            <TimelineItem>
              <Company>{t('experience.accenture.company')}</Company>
              <Role>{t('experience.accenture.role')}</Role>
              <Meta>{t('experience.accenture.period')} · {t('experience.accenture.location')}</Meta>

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

              <TechRow>
                {['Java', 'Spring Boot', 'Next.js', 'NestJS', 'GraphQL', 'RabbitMQ', 'MongoDB', 'Azure', 'OracleDB', 'Redis'].map(t => (
                  <SkillBadge key={t}>{t}</SkillBadge>
                ))}
              </TechRow>
            </TimelineItem>
          </Timeline>
        </Content>
      </Inner>
    </ExperienceSection>
  )
}
