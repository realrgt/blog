'use client'

import React from 'react'
import Link from '@/components/mdxcomponents/Link'
import Tag from '@/components/tag'
import { formatDate } from 'pliny/utils/formatDate'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

interface PostListProps {
  posts: Post[]
  locale: LocaleTypes
  maxDisplay: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const PostList: React.FC<PostListProps> = ({ posts, locale, maxDisplay }) => {
  const { t } = useTranslation(locale, 'home')

  return (
    <ul className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
      {!posts.length && <li>{t('noposts')}</li>}
      {posts.slice(0, maxDisplay).map((post, index) => {
        const { slug, date, title, summary, tags } = post
        const decorativeImages = [
          '/static/images/ocean.jpeg',
          '/static/images/canada/lake.jpg',
          '/static/images/canada/mountains.jpg',
          '/static/images/canada/maple.jpg',
          '/static/images/canada/toronto.jpg',
        ]
        const imageIndex = index % decorativeImages.length
        return (
          <motion.li
            key={slug}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.3, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            className="py-6"
          >
            <article className="rounded-xl border border-gray-200/60 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:shadow-primary-glow dark:border-gray-700/60 dark:bg-gray-800/80 dark:hover:border-primary-500/30">
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">{t('pub')}</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/${locale}/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <ul className="flex flex-wrap">
                          {tags.map((tag: string) => (
                            <li key={tag}>
                              <Tag text={tag} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative h-24 w-32 flex-shrink-0 md:h-20 md:w-28">
                        <Image
                          src={decorativeImages[imageIndex]}
                          alt="Decorative image"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/${locale}/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`${t('more')}"${title}"`}
                    >
                      {t('more')} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </motion.li>
        )
      })}
    </ul>
  )
}

export default PostList
