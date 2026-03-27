export interface SkillGroup {
  key: string
  labelKey: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    key: 'languages',
    labelKey: 'skills.languages',
    items: ['Java', 'Go', 'TypeScript', 'JavaScript', 'Python', 'Kotlin', 'SQL'],
  },
  {
    key: 'frameworks',
    labelKey: 'skills.frameworks',
    items: ['Spring Boot', 'Quarkus', 'React', 'Next.js', 'Node.js', 'NestJS', 'GraphQL'],
  },
  {
    key: 'cloud',
    labelKey: 'skills.cloud',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'AKS', 'CI/CD'],
  },
  {
    key: 'data',
    labelKey: 'skills.data',
    items: ['PostgreSQL', 'MongoDB', 'ArangoDB', 'OracleDB', 'Redis', 'RabbitMQ', 'Kafka'],
  },
  {
    key: 'observability',
    labelKey: 'skills.observability',
    items: ['Graylog', 'Datadog', 'Azure Monitor'],
  },
  {
    key: 'tools',
    labelKey: 'skills.tools',
    items: ['Git', 'Maven', 'Gradle', 'Scrum', 'JUnit', 'Mockito'],
  },
]
