# Creative Sparking Contracting (CRC) - Luxury Furniture & Interior Design Website

A modern, luxury portfolio website for Creative Sparking Contracting (CRC), a premium furniture and interior design company. Built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Luxury aesthetic with Black/White/Dark Gray/Gold color scheme
- **Smooth Animations**: Framer Motion animations throughout
- **Custom Cursor**: Interactive cursor with rotating messages
- **Responsive Design**: Fully responsive across all devices
- **Portfolio Gallery**: Project showcase with categories and detailed views
- **Contact Form**: Functional contact form with validation
- **WhatsApp Integration**: Direct WhatsApp messaging button

## Pages

1. **Home** - Hero section with company tagline and quick intro
2. **About Us** - Company story, mission, vision, and why choose us
3. **Services** - Interior Design, Implementation, Custom Furniture, Wood Manufacturing
4. **Portfolio** - Categorized project gallery (Villas, Palaces, Restaurants, Commercial)
5. **Contact** - Contact form, phone, email, Google Maps, and WhatsApp button

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── about/          # About Us page
│   ├── contact/        # Contact page
│   ├── portfolio/      # Portfolio page
│   ├── services/       # Services page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── CustomCursor.tsx    # Custom cursor component
│   └── Navigation.tsx      # Navigation component
├── public/             # Static assets
└── ...config files
```

## Customization

### Colors

Edit `tailwind.config.js` to modify the luxury color palette:

```javascript
luxury: {
  black: '#000000',
  white: '#FFFFFF',
  darkGray: '#1A1A1A',
  gold: '#D4AF37',
  // ...
}
```

### Custom Cursor Messages

Edit `components/CustomCursor.tsx` to change the rotating messages:

```typescript
const messages = [
  'Discover CSC',
  'Crafting Timeless Spaces',
  'Request a Quote',
]
```

### Portfolio Projects

Update the `projects` array in `app/portfolio/page.tsx` with your actual project data.

### Contact Information

Update contact details in `app/contact/page.tsx`:
- Phone number
- Email address
- Physical address
- WhatsApp number
- Google Maps embed URL

## Image Placeholders

Replace placeholder image references with actual high-quality images:
- Hero images on each page
- Project images in portfolio
- Service and about page images

## Next Steps

1. Add actual project images and content
2. Connect contact form to email service (e.g., SendGrid, Resend)
3. Integrate with CMS for content management
4. Add blog section if needed
5. Implement e-commerce features for future expansion

## License

Private project for Creative Sparking Contracting (CRC)

## Support

For questions or support, please contact the development team.

