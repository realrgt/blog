type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'Squadra Digital',
      description: `The digital home of Squadra. Solutions, success stories, insights, podcasts, videos, and job openings come together in one bilingual experience, with smart filters that take every visitor straight to what matters. Behind the scenes, the marketing team builds pages and menus on its own, no developer required. Built with Next.js.`,
      imgSrc: '/static/images/squadra_site.png',
      href: 'https://squadra.com.br',
    },
    {
      title: 'Genius AI',
      description: `The showcase of Genius, Squadra's AI platform. Visitors can chat with an AI assistant that answers questions about the platform, and explore solutions, cases, events, insights, podcasts, and videos in Portuguese or English. A visual editor lets the team publish new pages in minutes. Built with Next.js.`,
      imgSrc: '/static/images/genius_ai.jpg',
      href: 'https://geniusai.com.br',
    },
    {
      title: 'Blog & Portfolio',
      description: `The website you are browsing right now, open source. Technical articles and career stories in English and Portuguese, with instant search, comments, view counts, a light and dark theme, and even an interactive terminal to explore. Built with Next.js.`,
      imgSrc: '/static/images/blog.png',
      href: 'https://github.com/realrgt/blog',
    },
    {
      title: 'Gestify',
      description: `A backend API built with .NET, PostgreSQL, Redis, Keycloak, and Docker. Implements authentication, caching, messaging, logging, and testing strategies. Applies Clean Architecture, CQRS, and Domain-Driven Design principles.`,
      imgSrc: '/static/images/gestify.png',
      href: 'https://github.com/realrgt/gestify',
    },
    {
      title: 'Mpesa SDK',
      description: `An open-source SDK for integrating with the M-Pesa Mozambique API, enabling payment operations in Dart applications. Implements C2B, B2B, B2C, Refund, and Transaction Status operations using HTTP protocol. Applies cryptographic and security best practices using the Pointy Castle library.`,
      imgSrc: '/static/images/mpesa_sdk_dart.png',
      href: 'https://github.com/realrgt/mpesa_sdk_dart',
    },
  ],

  pt: [
    {
      title: 'Squadra Digital',
      description: `A casa digital da Squadra. Soluções, cases, insights, podcasts, vídeos e vagas reunidos em uma experiência bilíngue, com filtros inteligentes que levam cada visitante direto ao que importa. Nos bastidores, o time de marketing monta páginas e menus sozinho, sem depender de desenvolvedores. Feito com Next.js.`,
      imgSrc: '/static/images/squadra_site.png',
      href: 'https://squadra.com.br',
    },
    {
      title: 'Genius AI',
      description: `A vitrine da Genius, a plataforma de IA da Squadra. O visitante conversa com um assistente de IA que tira dúvidas sobre a plataforma e explora soluções, cases, eventos, insights, podcasts e vídeos em português ou inglês. Um editor visual permite ao time publicar novas páginas em minutos. Feito com Next.js.`,
      imgSrc: '/static/images/genius_ai.jpg',
      href: 'https://geniusai.com.br',
    },
    {
      title: 'Blog & Portfólio',
      description: `O site que você está navegando agora, com código aberto. Artigos técnicos e histórias de carreira em português e inglês, com busca instantânea, comentários, contador de visualizações, tema claro e escuro e até um terminal interativo para explorar. Feito com Next.js.`,
      imgSrc: '/static/images/blog.png',
      href: 'https://github.com/realrgt/blog',
    },
    {
      title: 'Gestify',
      description: `Uma API backend construída com .NET, PostgreSQL, Redis, Keycloak e Docker. Implementa estratégias de autenticação, cache, mensageria, logging e testes. Aplica os princípios de Clean Architecture, CQRS e Domain-Driven Design.`,
      imgSrc: '/static/images/gestify.png',
      href: 'https://github.com/realrgt/gestify',
    },
    {
      title: 'Mpesa SDK',
      description: `Um SDK open-source para integração com a API M-Pesa Moçambique, permitindo operações de pagamento em aplicações Dart. Implementa operações C2B, B2B, B2C, Reembolso e Consulta de Estado de Transação via protocolo HTTP. Aplica boas práticas criptográficas e de segurança com a biblioteca Pointy Castle.`,
      imgSrc: '/static/images/mpesa_sdk_dart.png',
      href: 'https://github.com/realrgt/mpesa_sdk_dart',
    },
  ],
}

export default projectsData
