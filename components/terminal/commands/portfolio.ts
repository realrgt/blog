import experienceData from '@/data/experienceData'
import projectsData from '@/data/projectsData'

type Locale = 'en' | 'pt'

const helpText: Record<Locale, string> = {
  en: `Available commands:
  help        - Show this help message
  about       - About Ergito Vilanculos
  skills      - Technical skills
  projects    - View projects
  experience  - Work experience
  contact     - Contact information
  clear       - Clear terminal
  play snake  - Play Snake game
  play typing - Typing speed game
  play quiz   - Tech quiz game
  sudo hire-me - Hire me
  cat resume.pdf - View resume`,
  pt: `Comandos disponíveis:
  help           - Mostrar esta mensagem de ajuda
  about          - Sobre Ergito Vilanculos
  skills         - Habilidades técnicas
  projects       - Ver projetos
  experience     - Experiência profissional
  contact        - Informações de contato
  clear          - Limpar terminal
  play snake     - Jogar Snake
  play typing    - Jogo de velocidade de digitação
  play quiz      - Quiz de tecnologia
  sudo hire-me   - Contratar
  cat resume.pdf - Ver currículo`,
}

const aboutText: Record<Locale, string> = {
  en: `
> Ergito Vilanculos
> Senior Backend Engineer
> Distributed systems, microservices, databases

Senior Backend Engineer focused on designing reliable, scalable architectures and resilient distributed systems.
Experienced in microservices, API design, database modeling, event-driven workflows, and cloud-native infrastructure.
Skilled at building high-performance backend platforms with strong observability, security, and operational efficiency.

Based in Mozambique, working globally.
Languages: Node.js, C#, TypeScript, Javascript`,
  pt: `
> Ergito Vilanculos
> Engenheiro Backend Senior
> Sistemas distribuídos, microsserviços, bancos de dados

Engenheiro Backend Senior focado em projetar arquiteturas confiáveis, escaláveis e sistemas distribuídos resilientes.
Experiência com microsserviços, design de APIs, modelagem de bancos de dados, fluxos orientados a eventos e infraestrutura cloud-native.
Habilidade em construir plataformas backend de alto desempenho com boa observabilidade, segurança e eficiência operacional.

Baseado em Moçambique, atuando globalmente.
Linguagens: Node.js, C#, TypeScript, Javascript`,
}

const skillsText: Record<Locale, string> = {
  en: `
LANGUAGES    TypeScript | JavaScript | C# | SQL
BACKEND      Node.js | NestJS | Express | .NET | Serverless | REST
DATABASES    PostgreSQL | MySQL | MongoDB | Redis | DynamoDB | Sqlite
ARCHITECTURE Microservices | Event-driven | CQRS | APIs | Domain-driven design
CLOUD        AWS (ECS, Lambda, RDS, SQS, SNS) | Docker | Terraform
TOOLS        Git | CI/CD | Jest | Prisma | Sequelize | Entity Framework`,
  pt: `
LINGUAGENS   TypeScript | JavaScript | C# | SQL
BACKEND      Node.js | NestJS | Express | .NET | Serverless | REST
BANCOS       PostgreSQL | MySQL | MongoDB | Redis | DynamoDB | Sqlite
ARQUITETURA  Microsserviços | Event-driven | CQRS | APIs | Domain-driven design
CLOUD        AWS (ECS, Lambda, RDS, SQS, SNS) | Docker | Terraform
FERRAMENTAS  Git | CI/CD | Jest | Prisma | Sequelize | Entity Framework`,
}

const contactText: Record<Locale, string> = {
  en: `
Email:    ergitorubildo@gmail.com
GitHub:   github.com/realrgt
LinkedIn: linkedin.com/in/ergito-vilanculos`,
  pt: `
Email:    ergitorubildo@gmail.com
GitHub:   github.com/realrgt
LinkedIn: linkedin.com/in/ergito-vilanculos`,
}

function getExperienceText(locale: Locale): string {
  const experiences = experienceData[locale] || experienceData.en
  return experiences
    .map((exp) => `\n${exp.role} @ ${exp.company}\n${exp.period}\n${exp.technologies.join(' | ')}`)
    .join('\n')
}

function getProjectsText(locale: Locale): string {
  const projects = projectsData[locale] || projectsData.en
  return projects
    .map((p) => `\n> ${p.title}\n  ${p.description.substring(0, 80)}...\n  ${p.href}`)
    .join('\n')
}

export function executeCommand(
  command: string,
  locale: Locale
): { output: string; special?: string } {
  const cmd = command.trim().toLowerCase()

  switch (cmd) {
    case 'help':
      return { output: helpText[locale] }
    case 'about':
      return { output: aboutText[locale] }
    case 'skills':
      return { output: skillsText[locale] }
    case 'contact':
      return { output: contactText[locale] }
    case 'experience':
      return { output: getExperienceText(locale) }
    case 'projects':
      return { output: getProjectsText(locale) }
    case 'clear':
      return { output: '', special: 'clear' }
    case 'sudo hire-me':
      return {
        output:
          locale === 'pt'
            ? '> Processando... Acesso concedido! Envie uma mensagem :)\n> ergitorubildo@gmail.com'
            : "> Processing... Access granted! Let\'s talk :)\n> ergitorubildo@gmail.com",
      }
    case 'cat resume.pdf':
      return {
        output:
          locale === 'pt'
            ? '> Abrindo currículo... Acesse:\n> https://app.rezi.ai/s/Qz2Kx6ASqfyR4A7LQeCi'
            : '> Opening resume... Visit:\n> https://app.rezi.ai/s/Qz2Kx6ASqfyR4A7LQeCi',
        special: 'resume',
      }
    case 'play snake':
      return { output: '', special: 'snake' }
    case 'play typing':
      return { output: '', special: 'typing' }
    case 'play quiz':
      return { output: '', special: 'quiz' }
    default:
      return {
        output:
          locale === 'pt'
            ? `Comando não encontrado: ${command}\nDigite "help" para ver os comandos disponíveis.`
            : `Command not found: ${command}\nType "help" to see available commands.`,
      }
  }
}
