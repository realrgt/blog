import siteMetadata from '@/data/siteMetadata'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type JsonLdType = 'website' | 'person' | 'blogPosting' | 'breadcrumb'

interface JsonLdProps {
  type: JsonLdType
  locale: LocaleTypes
  data?: Record<string, unknown>
}

function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author,
    jobTitle: 'Senior Backend Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'SCALIS',
    },
    url: siteMetadata.siteUrl,
    sameAs: [siteMetadata.github, siteMetadata.linkedin, siteMetadata.twitter].filter(Boolean),
    image: `${siteMetadata.siteUrl}/static/images/avatar.png`,
  }
}

function getBlogPostingSchema(data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    description: data.description,
    image: data.image || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
    url: data.url,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
    },
  }
}

function getBreadcrumbSchema(data: Record<string, unknown>) {
  const items = data.items as Array<{ name: string; url: string }>
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Note: JSON.stringify produces safe output for script tags - it escapes
// special characters like </script> and HTML entities, making it safe for
// embedding in <script type="application/ld+json"> without additional sanitization.
// All input data comes from trusted internal sources (siteMetadata, contentlayer).
export default function JsonLd({ type, locale, data = {} }: JsonLdProps) {
  let schema: Record<string, unknown>

  switch (type) {
    case 'website':
      schema = getWebsiteSchema()
      break
    case 'person':
      schema = getPersonSchema()
      break
    case 'blogPosting':
      schema = getBlogPostingSchema(data)
      break
    case 'breadcrumb':
      schema = getBreadcrumbSchema(data)
      break
    default:
      return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
