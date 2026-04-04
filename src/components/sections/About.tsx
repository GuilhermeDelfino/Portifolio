import { useState } from 'react'
import styled from 'styled-components'
import { HiChevronDown } from 'react-icons/hi'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { highlight } from '@/utils/highlight'

const AboutSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3.5rem 1rem;

  @media (min-width: 480px) {
    padding: 4rem 1.5rem;
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
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.6;

  @media (min-width: 480px) {
    font-size: 0.9375rem;
    margin-bottom: 2rem;
  }
`

const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: ${({ theme }) => theme.colors.primary}18;
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: 480px) {
    font-size: 0.8125rem;
    padding: 0.4rem 0.875rem;
  }
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
  margin-bottom: 0.75rem;

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

const CollapsibleList = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.25s ease;

  & > ul { overflow: hidden; }

  @media (min-width: 768px) {
    display: block;
  }
`

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 760px;
  padding: 0;
  list-style: none;
`

const BulletItem = styled.li`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.75;
  font-size: 0.9375rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  &::before {
    content: '▸';
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
`

const highlights = [
  { emoji: '🚀', labelKey: 'about.highlight.experience' },
  { emoji: '☕', labelKey: 'about.highlight.stack' },
  { emoji: '🌍', labelKey: 'about.highlight.international' },
  { emoji: '☁️', labelKey: 'about.highlight.cloud' },
]

const bulletKeys = ['about.p1', 'about.p2', 'about.p3', 'about.p4']

export function About() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [open, setOpen] = useState(false)

  return (
    <AboutSection id="about">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('about.title')}</SectionTitle>
          <Subtitle>{t('about.subtitle')}</Subtitle>

          <Highlights>
            {highlights.map(h => (
              <Chip key={h.labelKey}>
                {h.emoji} {t(h.labelKey)}
              </Chip>
            ))}
          </Highlights>

          <ToggleBtn onClick={() => setOpen(o => !o)} aria-expanded={open}>
            {open ? t('about.collapse') : t('about.expand')}
            <HiChevronDown />
          </ToggleBtn>

          <CollapsibleList $open={open}>
            <BulletList>
              {bulletKeys.map(key => (
                <BulletItem key={key}><span>{highlight(t(key))}</span></BulletItem>
              ))}
            </BulletList>
          </CollapsibleList>
        </Content>
      </Inner>
    </AboutSection>
  )
}
