import { NextResponse } from 'next/server'
import { getAllPostsStats } from '@/lib/blog-stats'

export async function GET() {
  try {
    const stats = await getAllPostsStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting all blog stats:', error)
    return NextResponse.json({ error: 'Failed to get blog stats' }, { status: 500 })
  }
}
