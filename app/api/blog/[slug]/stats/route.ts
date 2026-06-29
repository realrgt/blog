import { NextRequest, NextResponse } from 'next/server'
import { getPostStats } from '@/lib/blog-stats'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const stats = await getPostStats(decodedSlug)

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting blog stats:', error)
    return NextResponse.json({ error: 'Failed to get blog stats' }, { status: 500 })
  }
}
