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
