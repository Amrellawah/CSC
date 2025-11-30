import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Creative Sparking Contracting - Get In Touch',
  description: 'Contact Creative Sparking Contracting for luxury interior design and furniture services. Get in touch to discuss your project and bring your vision to life.',
  openGraph: {
    title: 'Contact Us - Creative Sparking Contracting',
    description: 'Contact CSC for luxury interior design and furniture services. Get in touch to discuss your project.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Creative Sparking Contracting',
    description: 'Contact CSC for luxury interior design and furniture services.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



