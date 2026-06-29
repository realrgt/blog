import { Metadata } from 'next'
import InfiniteBlogList from '@/components/blog/InfiniteBlogList'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return genPageMetadata({
    title: 'Blog',
    params: { locale },
  })
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return <InfiniteBlogList posts={filteredPosts} locale={locale} title={t('all')} />
}
