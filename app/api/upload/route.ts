import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

// Helper to check authentication
function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request)
  if (!token) return false
  const decoded = verifyToken(token)
  return decoded !== null
}

// Allowed image MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Get file extension
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `${uuidv4()}.${extension}`
    
    // Save to public/portfolio folder
    const publicPath = join(process.cwd(), 'public', 'portfolio')
    const filepath = join(publicPath, filename)

    await writeFile(filepath, buffer)

    // Return the public URL
    const publicUrl = `/portfolio/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}


