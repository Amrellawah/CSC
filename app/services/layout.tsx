import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Creative Sparking Contracting - Luxury Interior Design & Furniture',
  description: 'Comprehensive luxury interior design and furniture services: Interior Design, Implementation, Custom Furniture, and Wood Manufacturing. Transform your spaces with CSC.',
  openGraph: {
    title: 'Our Services - Creative Sparking Contracting',
    description: 'Comprehensive luxury interior design and furniture services: Interior Design, Implementation, Custom Furniture, and Wood Manufacturing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Creative Sparking Contracting',
    description: 'Comprehensive luxury interior design and furniture services.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


