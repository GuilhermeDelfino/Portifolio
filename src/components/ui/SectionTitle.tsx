import styled from 'styled-components'

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    display: block;
    width: 3rem;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    margin-top: 0.5rem;
  }
`
