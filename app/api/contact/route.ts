import { NextRequest, NextResponse } from 'next/server'

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 minutes
    return true
  }

  if (limit.count >= 5) {
    // Max 5 submissions per 15 minutes
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Basic spam check (honeypot would be better, but this is a start)
    const spamKeywords = ['http://', 'https://', 'www.', 'click here', 'buy now']
    const messageLower = message.toLowerCase()
    if (spamKeywords.some(keyword => messageLower.includes(keyword) && message.length < 50)) {
      return NextResponse.json(
        { error: 'Message appears to be spam' },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, we'll log and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // In production, you would:
    // 1. Send email using Resend/SendGrid
    // 2. Optionally save to database
    // 3. Send notification to admin

    // Example with Resend (uncomment and configure):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'contact@creativesparking.com',
      to: 'info@creativesparking.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    */

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}


