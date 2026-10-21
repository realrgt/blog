'use client'

import { useState, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'

interface BlogStatsProps {
  slug: string
  className?: string
  showLabels?: boolean
}

interface StatsData {
  views: number
}

function markViewedInSession(slug: string): boolean {
  const key = `blog-viewed:${slug}`
  try {
    if (sessionStorage.getItem(key)) return false
    sessionStorage.setItem(key, '1')
  } catch {
    // Without storage the view is still counted, just not deduplicated.
  }
  return true
}

export default function BlogStats({ slug, className = '', showLabels = true }: BlogStatsProps) {
  const [stats, setStats] = useState<StatsData>({ views: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStatsAndRecordView = async () => {
      try {
        const encodedSlug = encodeURIComponent(slug)
        // Both translations share the slug, so one view per session covers
        // language switches, reloads and Strict Mode's double effect.
        const response = markViewedInSession(slug)
          ? await fetch(`/api/blog/${encodedSlug}/view`, { method: 'POST' })
          : await fetch(`/api/blog/${encodedSlug}/stats`)
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching blog stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatsAndRecordView()
  }, [slug])

  if (isLoading) {
    return (
      <div className={`flex items-center gap-6 ${className}`}>
        <div className="flex items-center gap-1">
          <EyeIcon className="h-5 w-5 animate-pulse text-gray-400" />
          <span className="text-sm text-gray-500">--</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {/* Views Counter */}
      <div className="flex items-center gap-2 px-3 py-2 text-gray-500 dark:text-gray-400">
        <EyeIcon className="h-5 w-5" />
        <span className="text-sm font-medium">{stats.views}</span>
        {showLabels && (
          <span className="hidden text-sm sm:inline">{stats.views === 1 ? 'View' : 'Views'}</span>
        )}
      </div>
    </div>
  )
}
