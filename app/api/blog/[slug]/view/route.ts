import { NextRequest, NextResponse } from 'next/server'
import { incrementViews } from '@/lib/blog-stats'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const result = await incrementViews(decodedSlug)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}
