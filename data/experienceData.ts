type Experience = {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  logo?: string
}

type ExperienceData = {
  [locale: string]: Experience[]
}

const experienceData: ExperienceData = {
  en: [
    {
      company: 'Squadra Digital',
      role: 'Software Engineer',
      period: 'Oct 2021 - Present',
      description:
        'Working as a software engineer through Squadra Digital, a technology consulting firm, delivering backend and full-stack solutions for clients in the energy and finance sectors. Engaged in distributed systems design, API development, and cloud-native application delivery across multiple client engagements.',
      technologies: ['Node.js', 'TypeScript', 'C#', '.NET', 'AWS', 'Microservices', 'React', 'Next.js', 'Docker'],
    },
    {
      company: 'Raizen',
      role: 'Software Engineer',
      period: 'Aug 2022 - Jun 2026',
      description:
        'Designed and implemented scalable, testable, and maintainable Node.js backend services supporting over 10 million users. Reduced API latency from 60 s to 750 ms by converting critical synchronous flows into asynchronous operations and optimizing database queries. Contributed to the monolith-to-microservices migration of the campaign module by developing a dedicated micro-frontend and BFF (Backend-for-Frontend). Developed scalable, event-driven integrations using Amazon EventBridge, SQS, and SNS. Improved system reliability and reduced production incidents by 79%. Implemented observability strategies using New Relic, Kinesis, and CloudWatch.',
      technologies: ['Node.js', 'TypeScript', 'AWS', 'EventBridge', 'SQS', 'SNS', 'PostgreSQL', 'NewRelic', 'Kinesis', 'CloudWatch'],
    },
    {
      company: 'N26',
      role: 'Software Engineer',
      period: 'Oct 2021 - Sep 2022',
      description:
        'Developed backend APIs using Java and Spring Boot, as well as Node.js and TypeScript. Automated operational workflows, reducing manual effort by 30%. Improved Bitbucket CI/CD pipelines and deployment reliability by implementing CloudWatch alarms via AWS Lambda to trigger MS Teams alerts through webhooks. Contributed to software architecture decisions and technical design discussions. Created integrations with third-party services and internal platforms.',
      technologies: ['Java', 'Spring Boot', 'Node.js', 'TypeScript', 'AWS Lambda', 'CloudWatch', 'Datadog', 'Databricks', 'CI/CD', 'REST API'],
    },
    {
      company: 'Handza',
      role: 'Software Engineer',
      period: 'Aug 2020 - Sep 2021',
      description:
        'Led the development and testing of a mobile application for laboratory management. Applied Clean Architecture, SOLID, and TDD principles to ensure fast and high-quality deliveries. Developed REST APIs with Node.js and Express, along with frontend clients using Flutter and Angular. Integrated company projects with payment partners and mobile wallets to expand payment options.',
      technologies: ['Node.js', 'Express', 'Flutter', 'Angular', 'REST API', 'Clean Architecture'],
    },
    {
      company: 'Leeva Studio',
      role: 'Co-Founder & Software Engineer',
      period: 'Jan 2020 - Sep 2021',
      description:
        'Co-founded a startup delivering innovative technological solutions in the marketplace and urban mobility sectors for the Mozambican market. Architected and designed systems using context mapping to deliver adaptable and scalable solutions. Led backend development with Node.js, TypeScript, and MongoDB ensuring high-availability APIs. Implemented critical payment integrations with M-Pesa and e-Mola gateways. Developed cross-platform mobile applications with Flutter and Firebase.',
      technologies: ['Node.js', 'TypeScript', 'MongoDB', 'Flutter', 'Firebase', 'Angular', 'M-Pesa'],
    },
    {
      company: 'PROJENITY',
      role: 'IT & Software Engineering Intern',
      period: 'Aug 2019 - Dec 2019',
      description:
        'Analyzed customer needs and provided technical support, ensuring high client satisfaction and efficient issue resolution. Installed and maintained VoIP network infrastructures, optimizing communication stability and system performance. Contributed to software development projects, gaining hands-on experience in building systems and writing clean, scalable code. Collaborated across multidisciplinary teams to troubleshoot network challenges.',
      technologies: ['VoIP', 'Networking', 'Technical Support'],
    },
  ],
  pt: [
    {
      company: 'Squadra Digital',
      role: 'Engenheiro de Software',
      period: 'Out 2021 - Presente',
      description:
        'A trabalhar como engenheiro de software atraves da Squadra Digital, uma consultora tecnologica, entregando solucoes backend e full-stack para clientes nos sectores de energia e financas. Envolvido no design de sistemas distribuidos, desenvolvimento de APIs e entrega de aplicacoes cloud-native em multiplos projetos de clientes.',
      technologies: ['Node.js', 'TypeScript', 'C#', '.NET', 'AWS', 'Microsservicos', 'React', 'Next.js', 'Docker'],
    },
    {
      company: 'Raizen',
      role: 'Engenheiro de Software',
      period: 'Ago 2022 - Jun 2026',
      description:
        'Concebi e implementei servicos backend Node.js escalaveis, testaveis e faceis de manter, suportando mais de 10 milhoes de utilizadores. Reduzi a latencia da API de 60 s para 750 ms ao converter fluxos sincronos criticos em operacoes assincronas e otimizar consultas a base de dados. Contribui para a migracao do modulo de campanhas de monolito para microsservicos, desenvolvendo um micro-frontend dedicado e um BFF. Desenvolvi integracoes orientadas a eventos usando Amazon EventBridge, SQS e SNS. Melhorei a fiabilidade do sistema e reduzi os incidentes em producao em 79%. Implementei estrategias de observabilidade com New Relic, Kinesis e CloudWatch.',
      technologies: ['Node.js', 'TypeScript', 'AWS', 'EventBridge', 'SQS', 'SNS', 'PostgreSQL', 'NewRelic', 'Kinesis', 'CloudWatch'],
    },
    {
      company: 'N26',
      role: 'Engenheiro de Software',
      period: 'Out 2021 - Set 2022',
      description:
        'Desenvolvi APIs backend com Java e Spring Boot, alem de Node.js e TypeScript. Automatizei fluxos operacionais, reduzindo o esforco manual em 30%. Melhorei os pipelines de CI/CD no Bitbucket e a fiabilidade dos deployments implementando alarmes CloudWatch via AWS Lambda para disparar alertas no MS Teams atraves de webhooks. Contribui para decisoes de arquitetura de software e discussoes de design tecnico. Criei integracoes com servicos de terceiros e plataformas internas.',
      technologies: ['Java', 'Spring Boot', 'Node.js', 'TypeScript', 'AWS Lambda', 'CloudWatch', 'Datadog', 'Databricks', 'CI/CD', 'REST API'],
    },
    {
      company: 'Handza',
      role: 'Engenheiro de Software',
      period: 'Ago 2020 - Set 2021',
      description:
        'Liderei o desenvolvimento e testes de uma aplicacao movel para gestao laboratorial. Apliquei principios de Clean Architecture, SOLID e TDD para garantir entregas rapidas e de alta qualidade. Desenvolvi REST APIs com Node.js e Express, bem como clientes frontend com Flutter e Angular. Integrei projetos da empresa com parceiros de pagamento e carteiras moveis para expandir as opcoes de pagamento.',
      technologies: ['Node.js', 'Express', 'Flutter', 'Angular', 'REST API', 'Clean Architecture'],
    },
    {
      company: 'Leeva Studio',
      role: 'Co-Fundador & Engenheiro de Software',
      period: 'Jan 2020 - Set 2021',
      description:
        'Co-fundei uma startup que entregava solucoes tecnologicas inovadoras nos sectores de marketplace e mobilidade urbana para o mercado mocambicano. Arquitetei e desenhei a estrutura dos sistemas utilizando context mapping para solucoes adaptaveis e escalaveis. Liderei o desenvolvimento backend com Node.js, TypeScript e MongoDB garantindo APIs de alta disponibilidade. Implementei integracoes de pagamento criticas com os gateways M-Pesa e e-Mola. Desenvolvi aplicacoes moveis multiplataforma com Flutter e Firebase.',
      technologies: ['Node.js', 'TypeScript', 'MongoDB', 'Flutter', 'Firebase', 'Angular', 'M-Pesa'],
    },
    {
      company: 'PROJENITY',
      role: 'Estagiario de TI e Engenharia de Software',
      period: 'Ago 2019 - Dez 2019',
      description:
        'Analisei necessidades de clientes e prestei suporte tecnico, garantindo elevados niveis de satisfacao e resolucao eficiente de problemas. Instalei e mantive infraestruturas de rede VoIP, otimizando a estabilidade de comunicacoes e o desempenho do sistema. Contribui para projetos de desenvolvimento de software, adquirindo experiencia pratica na construcao de sistemas e escrita de codigo limpo e escalavel. Colaborei em equipas multidisciplinares para resolucao de desafios de rede e apoio a implantacao de tecnologia interna.',
      technologies: ['VoIP', 'Redes', 'Suporte Tecnico'],
    },
  ],
}

export default experienceData