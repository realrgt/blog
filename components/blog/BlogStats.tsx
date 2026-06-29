'use client'

import { useState, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'

interface BlogStatsProps {
  slug: string
  locale: string
  className?: string
  showLabels?: boolean
}

interface StatsData {
  views: number
}

export default function BlogStats({
  slug,
  locale,
  className = '',
  showLabels = true,
}: BlogStatsProps) {
  const [stats, setStats] = useState<StatsData>({ views: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial stats and record view
  useEffect(() => {
    const fetchStatsAndRecordView = async () => {
      try {
        // First, record the view
        await fetch(`/api/blog/${encodeURIComponent(slug)}/view`, {
          method: 'POST',
        })

        // Then fetch the updated stats
        const response = await fetch(`/api/blog/${encodeURIComponent(slug)}/stats`)
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
  }, [slug, locale])

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
