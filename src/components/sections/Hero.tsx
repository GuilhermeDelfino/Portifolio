import styled, { keyframes } from 'styled-components'
import { FaArrowDown } from 'react-icons/fa'
import { useTranslation } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 1.5rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 70%;
    background: ${({ theme }) => theme.colors.primary}10;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
`

const HeroInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    gap: 2rem;
    text-align: center;
  }
`

const HeroText = styled.div`
  flex: 1;
`

const PhotoWrapper = styled.div`
  flex-shrink: 0;
  animation: ${fadeInUp} 0.6s ease 0.2s both;

  @media (max-width: 767px) {
    align-self: center;
  }
`

const ProfilePhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.primary}20;

  @media (min-width: 768px) {
    width: 240px;
    height: 240px;
  }

  @media (min-width: 1024px) {
    width: 280px;
    height: 280px;
  }
`

const Greeting = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  animation: ${fadeInUp} 0.6s ease both;
`

const Name = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
  animation: ${fadeInUp} 0.6s ease 0.1s both;
`

const Role = styled.h2`
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.6s ease 0.2s both;
`

const Tagline = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: ${fadeInUp} 0.6s ease 0.3s both;
`

const CTAs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  animation: ${fadeInUp} 0.6s ease 0.4s both;

  @media (max-width: 767px) {
    justify-content: center;
  }
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  animation: ${fadeInUp} 0.6s ease 0.8s both;
  cursor: pointer;

  svg {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }

  @media (max-height: 600px) {
    display: none;
  }
`

export function Hero() {
  const { t, language } = useTranslation()
  const cvFile = language === 'pt' ? '/CV_Guilherme_Narciso_PT.pdf' : '/CV_Guilherme_Narciso_EN.pdf'

  return (
    <HeroSection id="home">
      <HeroInner>
        <HeroText>
          <Greeting>{t('hero.greeting')}</Greeting>
          <Name>{t('hero.name')}</Name>
          <Role>{t('hero.role')}</Role>
          <Tagline>{t('hero.tagline')}</Tagline>
          <CTAs>
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t('hero.cta.contact')}
            </Button>
            <Button variant="outline" size="lg" href={cvFile} download>
              {t('hero.cta.cv')}
            </Button>
          </CTAs>
        </HeroText>

        <PhotoWrapper>
          <ProfilePhoto src="/profile.jpg" alt="Guilherme Narciso" />
        </PhotoWrapper>
      </HeroInner>

      <ScrollHint onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}>
        <FaArrowDown />
      </ScrollHint>
    </HeroSection>
  )
}
