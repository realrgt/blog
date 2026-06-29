'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/mdxcomponents/Link'
import Tag from '@/components/tag'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import BlogStatsDisplay from './BlogStatsDisplay'
import { useBlogStats } from '@/hooks/useBlogStats'
// Using a simple SVG icon instead of Heroicons to avoid dependency
const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

interface InfiniteBlogListProps {
  posts: CoreContent<Blog>[]
  locale: LocaleTypes
  title: string
}

const POSTS_PER_LOAD = 6
const SEARCH_DEBOUNCE_MS = 300

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function InfiniteBlogList({ posts, locale, title }: InfiniteBlogListProps) {
  const { t } = useTranslation(locale, 'home')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [displayedPosts, setDisplayedPosts] = useState(POSTS_PER_LOAD)
  const [isLoading, setIsLoading] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)

  // Fetch blog stats for all posts
  const { stats: blogStats } = useBlogStats(locale)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  const TAGS_COLLAPSE_THRESHOLD = 20
  const tagsToRender = useMemo(
    () => (showAllTags ? allTags : allTags.slice(0, TAGS_COLLAPSE_THRESHOLD)),
    [allTags, showAllTags]
  )

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchLower) ||
          post.summary?.toLowerCase().includes(searchLower) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((selectedTag) => post.tags?.includes(selectedTag))
      )
    }

    return filtered
  }, [posts, searchTerm, selectedTags])

  // Get posts to display
  const postsToShow = filteredPosts.slice(0, displayedPosts)
  const hasMore = filteredPosts.length > displayedPosts

  // Load more posts
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedPosts((prev) => prev + POSTS_PER_LOAD)
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMore])

  // Reset displayed posts when search or tags change
  useEffect(() => {
    setDisplayedPosts(POSTS_PER_LOAD)
  }, [searchTerm, selectedTags])

  // Handle tag selection
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedTags([])
  }, [])

  // Debounced search handler
  useEffect(() => {
    const timer = setTimeout(() => {
      // Search logic is handled in the filteredPosts memo
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={t('searchposts')}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tag Filter */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tagsToRender.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
            {allTags.length > TAGS_COLLAPSE_THRESHOLD && (
              <button
                onClick={() => setShowAllTags((prev) => !prev)}
                className="rounded-full border border-dashed px-3 py-1 text-sm text-primary-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-primary-400 dark:hover:bg-gray-700"
                aria-expanded={showAllTags}
                aria-label={
                  showAllTags
                    ? (t('lesstags_aria') ?? 'Show fewer tags')
                    : (t('moretags_aria') ?? 'Show more tags')
                }
              >
                {showAllTags ? (t('lesstags') ?? 'Show less') : (t('moretags') ?? 'More tags')}
              </button>
            )}
          </div>

          {(searchTerm || selectedTags.length > 0) && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredPosts.length === 1
                  ? `1 ${t('postfound')}`
                  : `${filteredPosts.length} ${t('postsfound')}`}
                {selectedTags.length > 0 && (
                  <span className="ml-2">
                    {t('withtags')} {selectedTags.join(', ')}
                  </span>
                )}
              </p>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {t('clearfilters')}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {postsToShow.map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <motion.article
                key={slug}
                variants={item}
                className="group relative flex flex-col space-y-2 rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-lg dark:border-gray-700"
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      <Link
                        href={`/${locale}/blog/${slug}`}
                        className="transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400"
                      >
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags?.slice(0, 3).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <p className="line-clamp-3 text-gray-500 dark:text-gray-400">{summary}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(date, locale)}
                    </time>
                  </div>
                  <Link
                    href={`/${locale}/blog/${slug}`}
                    className="text-sm font-medium text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {t('more')} &rarr;
                  </Link>
                </div>
                <div>
                  <BlogStatsDisplay views={blogStats[`blog-stats:${slug}`]?.views || 0} size="sm" />
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* No posts found */}
        {filteredPosts.length === 0 && searchTerm && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">{t('noposts')}</p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-400"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>{t('loading')}</span>
                </div>
              ) : (
                t('more')
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
