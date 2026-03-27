export interface Theme {
  name: 'light' | 'dark'
  colors: {
    background: string
    surface: string
    surfaceAlt: string
    text: string
    textSecondary: string
    primary: string
    primaryHover: string
    accent: string
    border: string
    navBg: string
  }
  shadows: {
    card: string
    nav: string
  }
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#eef2f7',
    surface: '#f5f7fa',
    surfaceAlt: '#e8edf3',
    text: '#1a2332',
    textSecondary: '#4a5568',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    accent: '#6366f1',
    border: '#d1dae6',
    navBg: 'rgba(238, 242, 247, 0.88)',
  },
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
    nav: '0 1px 3px 0 rgb(0 0 0 / 0.06)',
  },
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceAlt: '#1a2234',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    accent: '#818cf8',
    border: '#334155',
    navBg: 'rgba(15, 23, 42, 0.85)',
  },
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
    nav: '0 1px 3px 0 rgb(0 0 0 / 0.3)',
  },
}
