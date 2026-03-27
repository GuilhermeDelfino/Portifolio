import styled, { css } from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;

  ${({ size = 'md' }) =>
    size === 'sm' && css`padding: 0.5rem 1rem; font-size: 0.875rem;`}
  ${({ size = 'md' }) =>
    size === 'md' && css`padding: 0.75rem 1.5rem; font-size: 1rem;`}
  ${({ size = 'lg' }) =>
    size === 'lg' && css`padding: 1rem 2rem; font-size: 1.125rem;`}

  ${({ variant = 'primary', theme }) =>
    variant === 'primary' &&
    css`
      background: ${theme.colors.primary};
      color: #fff;
      &:hover { background: ${theme.colors.primaryHover}; transform: translateY(-1px); }
    `}

  ${({ variant, theme }) =>
    variant === 'outline' &&
    css`
      background: transparent;
      color: ${theme.colors.primary};
      border: 2px solid ${theme.colors.primary};
      &:hover { background: ${theme.colors.primary}; color: #fff; transform: translateY(-1px); }
    `}

  ${({ variant, theme }) =>
    variant === 'ghost' &&
    css`
      background: transparent;
      color: ${theme.colors.textSecondary};
      &:hover { color: ${theme.colors.text}; background: ${theme.colors.surfaceAlt}; }
    `}
`
