# Manga Portfolio Website

A manga-inspired personal portfolio website built with Next.js 14+, featuring a strictly monochrome visual theme with classic manga aesthetics including speech bubbles, panel-style layouts, halftone patterns, and ink wash effects.

## Tech Stack

- **Next.js 16.1.6** - React framework with App Router
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS v4** - Utility-first CSS framework with custom monochrome theme
- **Framer Motion** - Declarative animations for page transitions and scroll effects
- **Lenis** - Smooth scrolling library
- **shadcn/ui** - Accessible component primitives (to be added)

## Project Structure

```
manga-portfolio-website/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Dashboard page (/)
├── components/              # React components
│   ├── layout/             # Navigation, Footer, PageTransition
│   ├── manga/              # MangaPanel, SpeechBubble, etc.
│   ├── dashboard/          # Hero, FeaturedProjects
│   ├── about/              # About page components
│   ├── projects/           # Project grid and cards
│   ├── contact/            # Contact form and social links
│   └── ui/                 # shadcn/ui components
├── lib/                     # Utilities and helpers
│   ├── data/               # Static data files
│   ├── animations/         # Framer Motion variants
│   ├── utils/              # Utility functions
│   └── hooks/              # Custom React hooks
├── styles/                  # Global styles
│   └── globals.css         # Tailwind config and custom styles
├── types/                   # TypeScript type definitions
│   └── index.ts            # Core type definitions
└── public/                  # Static assets
```

## Design Philosophy

The design embraces manga storytelling conventions:

- **Panel-based layouts**: Content organized in rectangular panels mimicking manga pages
- **Sequential revelation**: Content animates into view panel-by-panel as users scroll
- **Monochrome palette**: Strict black, white, and grayscale color scheme
- **Manga typography**: Bold impactful headers with clean body text
- **Visual effects**: Halftone patterns, speed lines, ink effects, and speech bubbles

## Color Palette

The application uses a strictly monochrome color palette:

- **Black**: `#000000` (primary)
- **White**: `#FFFFFF` (secondary)
- **Gray 900**: `#1A1A1A`
- **Gray 800**: `#333333`
- **Gray 600**: `#666666`
- **Gray 400**: `#999999`
- **Gray 200**: `#E5E5E5`
- **Gray 50**: `#F5F5F5`

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Development

The project uses:

- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS v4** with CSS-based configuration
- **Path aliases** (`@/*`) for clean imports

### Key Features

1. **App Router**: File-based routing with layouts and nested routes
2. **Server Components**: Default server-side rendering for optimal performance
3. **Responsive Design**: Mobile-first approach with breakpoints at 640px and 1024px
4. **Smooth Animations**: Framer Motion for page transitions and scroll effects
5. **Type Safety**: Full TypeScript coverage with strict mode enabled

## Planned Routes

- `/` - Dashboard (hero + featured projects)
- `/about` - About page (bio, skills, timeline, interests)
- `/projects` - Projects listing with filtering
- `/projects/[slug]` - Individual project details
- `/contact` - Contact form and social links

## Next Steps

1. Set up page routes (about, projects, contact)
2. Implement manga visual components (MangaPanel, SpeechBubble, etc.)
3. Create layout components (Navigation, Footer)
4. Add Framer Motion animations
5. Integrate Lenis smooth scrolling
6. Set up shadcn/ui components
7. Add project data and content
8. Implement property-based testing

## License

Private project - All rights reserved
