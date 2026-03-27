import styled from 'styled-components'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { skillGroups } from '@/data/skills'

const SkillsSection = styled.section`
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
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Group = styled.div``

const GroupTitle = styled.h3`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
`

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export function Skills() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <SkillsSection id="skills">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('skills.title')}</SectionTitle>
          <Grid>
            {skillGroups.map(group => (
              <Group key={group.key}>
                <GroupTitle>{t(group.labelKey)}</GroupTitle>
                <BadgeRow>
                  {group.items.map(item => (
                    <SkillBadge key={item}>{item}</SkillBadge>
                  ))}
                </BadgeRow>
              </Group>
            ))}
          </Grid>
        </Content>
      </Inner>
    </SkillsSection>
  )
}
