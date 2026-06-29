'use client'

import { useState, useEffect } from 'react'

export interface BlogStatsMap {
  [slug: string]: {
    views: number
  }
}

export function useBlogStats(locale: string) {
  const [stats, setStats] = useState<BlogStatsMap>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/blog/stats`)

        if (!response.ok) {
          throw new Error('Failed to fetch blog stats')
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error('Error fetching blog stats:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [locale])

  return { stats, isLoading, error }
}
