import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Creative Sparking Contracting - Luxury Interior Design Projects',
  description: 'Explore our portfolio of luxury interior design and furniture projects. Featured work including hotels, restaurants, villas, palaces, and commercial spaces.',
  openGraph: {
    title: 'Portfolio - Creative Sparking Contracting',
    description: 'Explore our portfolio of luxury interior design and furniture projects including hotels, restaurants, and commercial spaces.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Creative Sparking Contracting',
    description: 'Explore our portfolio of luxury interior design and furniture projects.',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


