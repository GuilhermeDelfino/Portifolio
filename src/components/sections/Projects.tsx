import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HiExternalLink, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from '@/i18n/LanguageContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { SkillBadge } from '@/components/ui/SkillBadge'

const ProjectsSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1rem;

  @media (min-width: 480px) {
    padding: 3.5rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`

const Content = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.6s ease, transform 0.6s ease;
`

/* ── Desktop grid ── */
const Grid = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

/* ── Mobile carousel ── */
const CarouselWrapper = styled.div`
  margin-top: 2rem;

  @media (min-width: 640px) {
    display: none;
  }
`

const CarouselViewport = styled.div`
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`

const CarouselTrack = styled.div<{ $index: number; $offset: number; $dragging: boolean }>`
  display: flex;
  align-items: stretch;
  transition: ${({ $dragging }) => ($dragging ? 'none' : 'transform 0.35s ease')};
  transform: translateX(calc(${({ $index }) => $index * -100}% + ${({ $offset }) => $offset}px));
`

const CarouselSlide = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;

  & > * {
    flex: 1;
  }
`

const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`

const Dots = styled.div`
  display: flex;
  gap: 0.4rem;
`

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.25rem' : '0.5rem')};
  height: 0.5rem;
  border-radius: 9999px;
  border: none;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
`

/* ── Shared card styles ── */
const ProjectCard = styled(Card)<{ $hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  overflow: hidden;
  justify-content: ${({ $hasImage }) => ($hasImage ? 'flex-start' : 'center')};
`

const ImageButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: zoom-in;
`

const ProjectImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ProjectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
`

const CardBody = styled.div<{ $hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem 1.5rem;
  flex: ${({ $hasImage }) => ($hasImage ? 1 : '0 1 auto')};
`

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`

const ProjectTitle = styled.h3`
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`

const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  flex: 1;
`

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
`

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  cursor: zoom-out;
`

const LightboxImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
`

const CloseButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`

interface Project {
  titleKey: string
  descriptionKey: string
  url: string
  liveUrl?: string
  liveLabel?: string
  image?: string
  technologies: string[]
}

const projects: Project[] = [
  {
    titleKey: 'projects.javaProfile.title',
    descriptionKey: 'projects.javaProfile.description',
    url: 'https://github.com/GuilhermeDelfino/java-profile',
    liveUrl: 'https://api.guilherme-narciso.dev/java-profile/swagger-ui/index.html',
    liveLabel: 'API Docs',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'AWS S3', 'JWT', 'Docker', 'Prometheus'],
    image: "/projects/java-profile.png",
  },
  {
    titleKey: 'projects.microservices.title',
    descriptionKey: 'projects.microservices.description',
    url: 'https://github.com/GuilhermeDelfino/MicroservicesJava',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Clean Architecture', 'DDD', 'SAGA', 'Outbox', 'PostgreSQL'],
  },
]

function ProjectCardContent({ project, onImageClick, t }: {
  project: Project
  onImageClick: (src: string) => void
  t: (key: string) => string
}) {
  return (
    <ProjectCard $hasImage={!!project.image}>
      {project.image && (
        <ImageButton onClick={() => onImageClick(project.image!)}>
          <ProjectImage>
            <ProjectImg src={project.image} alt={t(project.titleKey)} />
          </ProjectImage>
        </ImageButton>
      )}
      <CardBody $hasImage={!!project.image}>
        <ProjectHeader>
          <ProjectTitle>{t(project.titleKey)}</ProjectTitle>
          <Links>
            {project.liveUrl && (
              <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {project.liveLabel ?? 'Demo'} <HiExternalLink />
              </ProjectLink>
            )}
            <ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
              GitHub <HiExternalLink />
            </ProjectLink>
          </Links>
        </ProjectHeader>
        <Description>{t(project.descriptionKey)}</Description>
        <TechRow>
          {project.technologies.map(tech => (
            <SkillBadge key={tech}>{tech}</SkillBadge>
          ))}
        </TechRow>
      </CardBody>
    </ProjectCard>
  )
}

export function Projects() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [current, setCurrent] = useState(0)
  const [dragStartX, setDragStartX] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX)
    setDragOffset(0)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX === null) return
    setDragOffset(e.clientX - dragStartX)
  }

  const handlePointerUp = () => {
    if (dragStartX === null) return
    const threshold = 50
    if (dragOffset < -threshold && current < projects.length - 1) setCurrent(c => c + 1)
    else if (dragOffset > threshold && current > 0) setCurrent(c => c - 1)
    setDragStartX(null)
    setDragOffset(0)
  }

  useEffect(() => {
    if (!lightboxSrc) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightboxSrc])

  return (
    <ProjectsSection id="projects">
      <Inner>
        <Content ref={ref as React.RefObject<HTMLDivElement>} $visible={isVisible}>
          <SectionTitle>{t('projects.title')}</SectionTitle>

          {/* Mobile carousel */}
          <CarouselWrapper>
            <CarouselViewport
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
            <CarouselTrack $index={current} $offset={dragOffset} $dragging={dragStartX !== null}>
              {projects.map(project => (
                <CarouselSlide key={project.titleKey}>
                  <ProjectCardContent project={project} onImageClick={setLightboxSrc} t={t} />
                </CarouselSlide>
              ))}
            </CarouselTrack>
            </CarouselViewport>

            <CarouselControls>
              <ArrowButton onClick={() => setCurrent(c => c - 1)} disabled={current === 0} aria-label="Previous">
                <HiChevronLeft />
              </ArrowButton>
              <Dots>
                {projects.map((_, i) => (
                  <Dot key={i} $active={i === current} onClick={() => setCurrent(i)} aria-label={`Go to project ${i + 1}`} />
                ))}
              </Dots>
              <ArrowButton onClick={() => setCurrent(c => c + 1)} disabled={current === projects.length - 1} aria-label="Next">
                <HiChevronRight />
              </ArrowButton>
            </CarouselControls>
          </CarouselWrapper>

          {/* Desktop grid */}
          <Grid>
            {projects.map(project => (
              <ProjectCardContent key={project.titleKey} project={project} onImageClick={setLightboxSrc} t={t} />
            ))}
          </Grid>
        </Content>
      </Inner>

      {lightboxSrc && (
        <Lightbox onClick={() => setLightboxSrc(null)}>
          <CloseButton onClick={() => setLightboxSrc(null)} aria-label="Close preview">
            <HiX />
          </CloseButton>
          <LightboxImg
            src={lightboxSrc}
            alt="Project preview"
            onClick={e => e.stopPropagation()}
          />
        </Lightbox>
      )}
    </ProjectsSection>
  )
}
