import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'Creative Sparking Contracting - Luxury Furniture & Interior Design',
    template: '%s | Creative Sparking Contracting',
  },
  description: 'Crafting timeless spaces with luxury furniture and interior design excellence. 20+ years of experience in bespoke furniture manufacturing and premium interior design.',
  keywords: ['luxury furniture', 'interior design', 'custom furniture', 'wood manufacturing', 'luxury interior design', 'bespoke furniture', 'furniture design'],
  authors: [{ name: 'Creative Sparking Contracting' }],
  creator: 'Creative Sparking Contracting',
  publisher: 'Creative Sparking Contracting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Creative Sparking Contracting',
    title: 'Creative Sparking Contracting - Luxury Furniture & Interior Design',
    description: 'Crafting timeless spaces with luxury furniture and interior design excellence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Sparking Contracting - Luxury Furniture & Interior Design',
    description: 'Crafting timeless spaces with luxury furniture and interior design excellence',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-luxury-copper focus:text-luxury-cream focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-luxury-copper focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <Navigation />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}

