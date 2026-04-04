import styled from 'styled-components'

export const Mark = styled.mark`
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`

const TERMS = [
  // Companies & products
  'Netcracker Technology', 'Netcracker', 'Accenture', 'NEC',
  'Google Fiber', 'T-Mobile', 'Rogers', 'Telesat', 'Swisscom', 'Claro',
  'RaiaDrogasil', 'Circle K', 'Couche-Tard', 'Safe Food',
  // Languages
  'Java', 'Go', 'TypeScript', 'JavaScript', 'Python',
  // Frameworks & libraries
  'Spring Boot', 'Spring Security', 'NestJS', 'Next.js', 'React Native', 'GraphQL', 'Node.js', 'JUnit', 'Mockito',
  // Infrastructure
  'Kafka', 'RabbitMQ', 'Redis', 'PostgreSQL', 'MongoDB', 'OracleDB', 'ArangoDB', 'SQL Server', 'CosmosDB', 'CI/CD', 'Scrum',
  'Docker', 'Kubernetes', 'AKS', 'AWS S3', 'AWS', 'Azure',
  // Observability
  'Graylog', 'Prometheus', 'Grafana', 'Datadog', 'Azure Monitor',
  // Patterns & concepts
  'Clean Architecture', 'DDD', 'SAGA', 'Outbox', 'JWT', "API", 
  'RESTful API', 'REST', 'OpenAPI', 'Swagger',
  'microservices', 'event-driven',
  // Certifications
  'AWS Certified Cloud Practitioner', 'AZ-900',
  // Metrics
  '3M+', '47.6M', '17,000+', '2,800+', '~$2.7B', '$2.7B', '40s+', '6s', '10s+', '2s',
  '3+ years', '2+ years',
]

const escapedPattern = TERMS
  .sort((a, b) => b.length - a.length) // longer terms first to avoid partial matches
  .map(t => `(?<![a-zA-Z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9])`)
  .join('|')

const REGEX = new RegExp(`(${escapedPattern})`, 'gi')

export function highlight(text: string): React.ReactNode {
  const parts = text.split(REGEX)
  // split with a capturing group alternates: [text, match, text, match, ...]
  return parts.map((part, i) =>
    i % 2 === 1 ? <Mark key={i}>{part}</Mark> : part
  )
}
