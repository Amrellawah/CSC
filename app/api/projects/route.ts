import { NextRequest, NextResponse } from 'next/server'
import { getProjects, createProject } from '@/lib/projects'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// Helper to check authentication
function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request)
  if (!token) return false
  const decoded = verifyToken(token)
  return decoded !== null
}

// GET all projects (public - for portfolio page)
export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST create new project (admin only)
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, description, category, images, featured, order } = body

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      )
    }

    const project = await createProject({
      title,
      description,
      category,
      images: images || [],
      featured: featured || false,
      order: order || 0,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}




