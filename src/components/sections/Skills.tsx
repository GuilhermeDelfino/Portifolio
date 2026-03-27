import { useState } from 'react'
import styled from 'styled-components'
import { HiChevronDown } from 'react-icons/hi'
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

/* Desktop: grid normal */
const DesktopGrid = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: grid;
    margin-top: 2.5rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Group = styled.div``

const GroupTitle = styled.h3`
  font-size: 0.75rem;
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

/* Mobile: accordion */
const MobileAccordion = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    display: none;
  }
`

const AccordionItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.625rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`

const AccordionHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};

  span {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  svg {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: transform 0.25s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});
    flex-shrink: 0;
    font-size: 1.125rem;
  }
`

const AccordionBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.25s ease;

  & > div {
    overflow: hidden;
  }
`

const AccordionContent = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

function MobileSkillGroup({ labelKey, items }: { labelKey: string; items: string[] }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <AccordionItem>
      <AccordionHeader $open={open} onClick={() => setOpen(o => !o)}>
        <span>{t(labelKey)}</span>
        <HiChevronDown />
      </AccordionHeader>
      <AccordionBody $open={open}>
        <div>
          <AccordionContent>
            {items.map(item => (
              <SkillBadge key={item}>{item}</SkillBadge>
            ))}
          </AccordionContent>
        </div>
      </AccordionBody>
    </AccordionItem>
  )
}

export function Skills() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <SkillsSection id="skills">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('skills.title')}</SectionTitle>

          {/* Mobile accordion */}
          <MobileAccordion>
            {skillGroups.map(group => (
              <MobileSkillGroup key={group.key} labelKey={group.labelKey} items={group.items} />
            ))}
          </MobileAccordion>

          {/* Desktop grid */}
          <DesktopGrid>
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
          </DesktopGrid>
        </Content>
      </Inner>
    </SkillsSection>
  )
}
