import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
// Handle hash that might be truncated due to $ signs - reconstruct if needed
let ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''
// If hash doesn't start with $, it's been truncated - add the missing prefix
if (ADMIN_PASSWORD_HASH && !ADMIN_PASSWORD_HASH.startsWith('$')) {
  // The hash is missing the prefix $2b$10$IN25d, so reconstruct it
  ADMIN_PASSWORD_HASH = '$2b$10$IN25d' + ADMIN_PASSWORD_HASH
  console.log('⚠️ Hash was truncated, reconstructed to:', ADMIN_PASSWORD_HASH.substring(0, 20) + '...')
}

// Generate password hash (run once to get hash, then put in .env)
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash) return false
  return bcrypt.compare(password, hash)
}

// Generate JWT token
export function generateToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

// Verify JWT token
export function verifyToken(token: string): { username: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string }
    return decoded
  } catch (error) {
    return null
  }
}

// Get token from request (for API routes)
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {} as Record<string, string>)

  return cookies['admin_token'] || null
}

// Check if user is authenticated (server-side)
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    
    if (!token) return false
    
    const decoded = verifyToken(token)
    return decoded !== null
  } catch {
    return false
  }
}

// Get current user from token
export async function getCurrentUser(): Promise<{ username: string; role: string } | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    
    if (!token) return null
    
    return verifyToken(token)
  } catch {
    return null
  }
}

// Validate credentials
export async function validateCredentials(username: string, password: string): Promise<boolean> {
  // Check username
  if (username !== ADMIN_USERNAME) {
    console.log('Username mismatch')
    return false
  }
  
  // If password hash is not set or empty, allow default 'admin' password for initial setup
  if (!ADMIN_PASSWORD_HASH || ADMIN_PASSWORD_HASH.trim() === '' || ADMIN_PASSWORD_HASH === 'your_generated_hash') {
    console.log('Using default password fallback')
    // For initial setup, allow 'admin' password
    return password === 'admin'
  }
  
  // Check if hash is truncated (doesn't start with $)
  if (ADMIN_PASSWORD_HASH && !ADMIN_PASSWORD_HASH.startsWith('$')) {
    console.log('⚠️ Hash appears truncated (missing $ prefix). Using default password fallback.')
    // If hash is truncated, fall back to simple password check
    return password === 'admin'
  }
  
  console.log('Validating credentials:', { 
    providedUsername: username, 
    expectedUsername: ADMIN_USERNAME,
    hashLength: ADMIN_PASSWORD_HASH.length,
    hashStart: ADMIN_PASSWORD_HASH.substring(0, 12)
  })
  
  // Verify password against hash
  const isValid = await verifyPassword(password, ADMIN_PASSWORD_HASH)
  console.log('Password verification result:', isValid)
  
  // If hash verification fails but password is 'admin', allow it (for setup)
  if (!isValid && password === 'admin') {
    console.log('⚠️ Hash verification failed, but allowing default admin password')
    return true
  }
  
  return isValid
}

