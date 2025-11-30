import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Creative Sparking Contracting - Luxury Furniture & Interior Design',
  description: 'Learn about CSC - 20+ years of excellence in luxury furniture manufacturing and interior design. Discover our story, mission, vision, and what sets us apart.',
  openGraph: {
    title: 'About Creative Sparking Contracting',
    description: '20+ years of excellence in luxury furniture manufacturing and interior design. Discover our story, mission, and vision.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Creative Sparking Contracting',
    description: '20+ years of excellence in luxury furniture manufacturing and interior design.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



