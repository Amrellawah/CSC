import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Debug logging (remove in production)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const hasHash = !!process.env.ADMIN_PASSWORD_HASH
    const hashPreview = process.env.ADMIN_PASSWORD_HASH ? process.env.ADMIN_PASSWORD_HASH.substring(0, 20) + '...' : 'none'
    
    console.log('=== LOGIN ATTEMPT ===')
    console.log('Provided username:', username)
    console.log('Expected username:', adminUsername)
    console.log('Username match:', username === adminUsername)
    console.log('Password hash exists:', hasHash)
    console.log('Hash preview:', hashPreview)
    console.log('=====================')

    const isValid = await validateCredentials(username, password)

    if (!isValid) {
      console.log('❌ AUTHENTICATION FAILED')
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          hint: 'Check your username and password. Default: admin/admin'
        },
        { status: 401 }
      )
    }
    
    console.log('✅ AUTHENTICATION SUCCESSFUL')

    const token = generateToken(username)

    const response = NextResponse.json({ success: true, message: 'Login successful' })
    
    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

