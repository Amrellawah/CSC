import { NextRequest, NextResponse } from 'next/server'
import { getProjectById, updateProject, deleteProject } from '@/lib/projects'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// Helper to check authentication
function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request)
  if (!token) return false
  const decoded = verifyToken(token)
  return decoded !== null
}

// GET single project (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const project = await getProjectById(id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT update project (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const body = await request.json()
    const { title, description, category, images, featured, order } = body

    const project = await updateProject(id, {
      title,
      description,
      category,
      images,
      featured,
      order,
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const success = await deleteProject(id)
    if (!success) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}




