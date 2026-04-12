# Project Architecture Guide

This document explains how the project is organized, how folders relate to each other, and which component is responsible for each visible section.

## 1) High-Level Architecture

This is a Next.js App Router project with two rendering modes:

- Standard route rendering for non-horizontal routes.
- Horizontal panel rendering for primary routes: `/`, `/about`, `/projects`, `/contact`.

The root layout wires global providers and delegates page rendering to a shell component:

1. `app/layout.tsx` sets fonts, global styles, and metadata.
2. `HorizontalScrollProvider` exposes panel index state and navigation handlers.
3. `Navigation` reads route/panel state and controls navigation behavior.
4. `HorizontalAppShell` decides between horizontal panel mode vs regular page mode.

## 2) Folder Architecture

### app/

Route entry points (App Router pages and layout).

- `app/layout.tsx`: Root HTML/body, providers, global nav, shell.
- `app/page.tsx`: Home page composition (`HeroSection`, `FeaturedProjects`).
- `app/about/page.tsx`: About page composition.
- `app/projects/page.tsx`: Projects list page with URL-driven filtering.
- `app/projects/[slug]/page.tsx`: Dynamic project detail route.
- `app/contact/page.tsx`: Contact page composition.

Important note:
For the four primary routes, route page files exist, but active rendering is typically provided through horizontal panel wrappers in `components/horizontal-scroll/panels/` when horizontal mode is active.

### components/

UI and feature modules grouped by domain.

- `components/layout/`: Global frame concerns (`Navigation`, `Footer`, transitions, smooth scroll provider).
- `components/horizontal-scroll/`: Horizontal app shell, container, context/state, navigation controls, panel wrappers.
- `components/dashboard/`: Home sections (`HeroSection`, `FeaturedProjects`, `ProfileChroma`).
- `components/about/`: About sections (`IntroPanel`, `SkillsPanel`, `Timeline`, `InterestsPanel`).
- `components/projects/`: Project browsing/detail UI (`FilterTabs`, `ProjectGrid`, `ProjectCard`, `ProjectDetail`).
- `components/contact/`: Contact sections (`ContactIntro`, `ContactForm`, `SocialLinks`).
- `components/manga/`: Reusable visual language blocks (`ChapterHeader`, speech bubbles, patterns, manga UI primitives).
- `components/ui/`: Generic UI-level components.

### lib/

Cross-cutting logic and data sources.

- `lib/data/`: Static content providers for about, skills, timeline, projects, etc.
- `lib/animations/`: Framer Motion variants.
- `lib/hooks/`: Shared hooks (for example scroll animation hooks).
- `lib/utils/` and `lib/utils.ts`: Utility functions.

### styles/

- `styles/globals.css`: Global styles and Tailwind-driven design tokens/classes.

### types/

- `types/index.ts`: Shared type contracts (for example `Project`).

### public/

- Static assets (fonts and images).

### e2e/ and test files

- End-to-end tests in `e2e/`.
- Component/unit/property tests colocated with feature files (for example `*.test.tsx`, `*.properties.test.ts`).

## 3) Component Correlation Model

Think in layers:

1. Route layer (`app/.../page.tsx`)
   - Declares page-level intent.

2. Section composition layer (`components/*` feature folders)
   - Builds each page from section components.

3. Shared primitives layer (`components/manga`, `components/ui`)
   - Provides reusable presentation pieces.

4. Data layer (`lib/data/*`)
   - Supplies content to section components.

5. Behavior/state layer (`components/horizontal-scroll/*`, hooks)
   - Handles navigation mode, panel index, transitions, and interaction behavior.

## 4) Which Component Owns Which Section

## Home (`/`)

Primary owner chain:

- Route/page composition: `app/page.tsx`
- Horizontal wrapper owner: `components/horizontal-scroll/panels/HomePanel.tsx`
- Section owners:
  - Hero area: `components/dashboard/HeroSection.tsx`
  - Featured projects area: `components/dashboard/FeaturedProjects.tsx`

## About (`/about`)

Primary owner chain:

- Route/page composition: `app/about/page.tsx`
- Horizontal wrapper owner: `components/horizontal-scroll/panels/AboutPanel.tsx`
- Section owners:
  - Intro/bio section: `components/about/IntroPanel.tsx`
  - Skills section: `components/about/SkillsPanel.tsx`
  - Timeline section: `components/about/Timeline.tsx`
  - Interests section: `components/about/InterestsPanel.tsx`
- Data sources:
  - `lib/data/about.ts`
  - `lib/data/skills.ts`
  - `lib/data/timeline.ts`
  - `lib/data/interests.ts`

## Projects (`/projects`)

Primary owner chain:

- Route/page composition: `app/projects/page.tsx`
- Horizontal wrapper owner: `components/horizontal-scroll/panels/ProjectsPanel.tsx`
- Section owners:
  - Page/chapter header: `components/manga/ChapterHeader.tsx`
  - Category filtering UI:
    - Route mode: `components/projects/FilterTabs.tsx` (URL search params driven)
    - Horizontal panel mode: local filter tab buttons inside `components/horizontal-scroll/panels/ProjectsPanel.tsx`
  - Project list grid: `components/projects/ProjectGrid.tsx`
  - Project card tile: `components/projects/ProjectCard.tsx`
  - Empty states: `components/manga/SpeechBubble.tsx` + page/panel logic
- Data source:
  - `lib/data/projects.ts`

## Project Detail (`/projects/[slug]`)

Primary owner chain:

- Route owner: `app/projects/[slug]/page.tsx`
- Detail section owner: `components/projects/ProjectDetail.tsx`
- Data source + static params:
  - `lib/data/projects.ts` via `getProjects()` and `getProjectBySlug()`

## Contact (`/contact`)

Primary owner chain:

- Route/page composition: `app/contact/page.tsx`
- Horizontal wrapper owner: `components/horizontal-scroll/panels/ContactPanel.tsx`
- Section owners:
  - Header: `components/manga/ChapterHeader.tsx`
  - Intro section: `components/contact/ContactIntro.tsx`
  - Form section: `components/contact/ContactForm.tsx`
  - Social/contact links section: `components/contact/SocialLinks.tsx`

## 5) Horizontal Navigation and Rendering Flow

Key files:

- `components/horizontal-scroll/HorizontalAppShell.tsx`
- `components/horizontal-scroll/panels.ts`
- `components/horizontal-scroll/HorizontalScrollContainer.tsx`
- `components/horizontal-scroll/HorizontalScrollContext.tsx`
- `components/layout/Navigation.tsx`

Flow summary:

1. `HorizontalAppShell` checks current pathname.
2. If route is one of the primary routes, it renders `HorizontalScrollContainer` with `PANELS` config.
3. `PANELS` maps panel ids to wrapper components (`HomePanel`, `AboutPanel`, `ProjectsPanel`, `ContactPanel`).
4. `Navigation` uses `useHorizontalScroll()` to:
   - mark active nav item by panel index in horizontal mode
   - call `scrollToPanel(index)` instead of default link navigation when ready
5. `HorizontalScrollContainer` manages wheel/touch/key behavior, active index, and panel transitions.

## 6) Practical Ownership Lookup

If you need to modify a specific section, start here:

- Top navigation behavior: `components/layout/Navigation.tsx`
- Home hero: `components/dashboard/HeroSection.tsx`
- Home featured projects strip: `components/dashboard/FeaturedProjects.tsx`
- About intro/skills/timeline/interests: `components/about/*`
- Projects filtering logic:
  - Route URL filter mode: `app/projects/page.tsx` + `components/projects/FilterTabs.tsx`
  - Horizontal panel local state mode: `components/horizontal-scroll/panels/ProjectsPanel.tsx`
- Projects cards/grid: `components/projects/ProjectCard.tsx`, `components/projects/ProjectGrid.tsx`
- Project detail content: `components/projects/ProjectDetail.tsx`
- Contact form and social blocks: `components/contact/ContactForm.tsx`, `components/contact/SocialLinks.tsx`
- Content updates only (no layout changes): `lib/data/*`

## 7) Testing Architecture (Quick Map)

Testing follows colocated patterns:

- Component tests next to components: `*.test.tsx`
- Examples/snapshots/stories-like fixtures: `*.example.tsx`
- Horizontal-scroll behavior tests in `components/horizontal-scroll/`
- E2E/smoke tests in `e2e/`

This setup keeps feature code, examples, and tests close together, improving maintainability and faster debugging.
