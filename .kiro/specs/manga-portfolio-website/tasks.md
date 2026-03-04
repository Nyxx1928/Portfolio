# Implementation Plan: Manga Portfolio Website

## Overview

This implementation plan breaks down the manga-inspired portfolio website into discrete coding tasks. The site uses Next.js 14+ with App Router, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scroll. The implementation follows a sequential approach: setup → infrastructure → components → data → animations → testing → optimization.

## Tasks

- [ ] 1. Project setup and configuration
  - [x] 1.1 Initialize Next.js 14+ project with TypeScript and App Router
    - Run `npx create-next-app@latest` with TypeScript, ESLint, Tailwind CSS, and App Router options
    - Configure project structure with app/, components/, lib/, styles/, types/, and public/ directories
    - _Requirements: 1.1_
  
  - [x] 1.2 Configure Tailwind CSS with monochrome manga theme
    - Create tailwind.config.ts with custom manga color palette (black, white, grayscale)
    - Add custom spacing, border widths, shadows, and animation keyframes
    - Define manga-specific utility classes (manga-panel, manga-button, stat-bar, etc.)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 1.3 Set up global styles and CSS variables
    - Create styles/globals.css with Tailwind directives and custom component classes
    - Define font variables for heading, body, and mono fonts
    - Add manga-specific CSS classes (speech-bubble, halftone-overlay, chapter-header, etc.)
    - _Requirements: 21.1, 21.2, 21.3_
  
  - [x] 1.4 Install and configure dependencies
    - Install Framer Motion, Lenis, shadcn/ui, React Hook Form, and fast-check
    - Configure Next.js config for image optimization and build settings
    - Set up TypeScript types and interfaces in types/index.ts
    - _Requirements: 23.3, 24.3, 25.1_
  
  - [x] 1.5 Set up testing infrastructure
    - Install Jest, React Testing Library, and @testing-library/jest-dom
    - Create jest.config.js and jest.setup.js files
    - Configure test scripts in package.json
    - _Requirements: N/A (testing infrastructure)_

- [ ] 2. Core layout and navigation infrastructure
  - [x] 2.1 Create root layout with providers
    - Implement app/layout.tsx with HTML structure, font loading, and metadata
    - Integrate Lenis smooth scroll hook in root layout
    - Add Navigation and Footer components to layout
    - _Requirements: 1.1, 25.1, 25.2_
  
  - [x] 2.2 Implement Navigation component
    - Create components/layout/Navigation.tsx with fixed positioning
    - Add navigation links for all four pages (Home, About, Projects, Contact)
    - Implement active state indication based on current route
    - Add mobile hamburger menu for viewports < 640px
    - Style with manga chapter tab aesthetic
    - _Requirements: 1.2, 1.3, 17.3_
  
  - [ ]* 2.3 Write property test for Navigation fixed positioning
    - **Property 1: Navigation Fixed Positioning**
    - **Validates: Requirements 1.3**
  
  - [x] 2.4 Implement PageTransition component
    - Create components/layout/PageTransition.tsx with Framer Motion AnimatePresence
    - Define page transition variants (slide/fade effects)
    - Wrap page content with transition animations
    - _Requirements: 24.1, 24.2_
  
  - [ ]* 2.5 Write property test for page transition animations
    - **Property 10: Page Transition Animation**
    - **Validates: Requirements 24.1**
  
  - [x] 2.6 Implement Footer component
    - Create components/layout/Footer.tsx with copyright and social links
    - Style with manga aesthetic and monochrome palette
    - _Requirements: 2.1_

- [ ] 3. Manga visual components
  - [x] 3.1 Implement MangaPanel component
    - Create components/manga/MangaPanel.tsx with border variants (default, bordered, shadowed)
    - Add scroll-triggered reveal animation using Framer Motion
    - Support animation variants (fade, slide, reveal)
    - Make responsive with proper sizing at all breakpoints
    - _Requirements: 9.1, 17.1, 17.2, 18.2, 19.1, 23.1_
  
  - [ ]* 3.2 Write property test for scroll-triggered panel animations
    - **Property 9: Scroll-Triggered Panel Animation**
    - **Validates: Requirements 23.1**
  
  - [x] 3.3 Implement SpeechBubble component
    - Create components/manga/SpeechBubble.tsx with SVG-based bubble shapes
    - Support variants (speech, thought, shout)
    - Add configurable tail direction (bottom-left, bottom-right, top-left, top-right)
    - Make text responsive
    - _Requirements: 14.1_
  
  - [x] 3.4 Implement HalftonePattern component
    - Create components/manga/HalftonePattern.tsx with SVG pattern definition
    - Support intensity levels (light, medium, heavy)
    - Make configurable dot size and density
    - _Requirements: 20.1_
  
  - [x] 3.5 Implement ChapterHeader component
    - Create components/manga/ChapterHeader.tsx with manga chapter title styling
    - Add optional chapter numbering
    - Include ink brush stroke divider
    - Use bold typography with decorative lines
    - _Requirements: 1.5, 20.5_
  
  - [x] 3.6 Implement InkEffect component
    - Create components/manga/InkEffect.tsx for ink brush stroke effects
    - Support usage as dividers and borders
    - Add ink splash animation variant
    - _Requirements: 20.4, 22.2_

- [ ] 4. Animation system and hooks
  - [x] 4.1 Create Framer Motion animation variants
    - Create lib/animations/variants.ts with all animation variants
    - Define pageVariants, panelVariants, containerVariants, cardHoverVariants
    - Define inkSplashVariants and speedLinesVariants
    - _Requirements: 23.3, 24.3_
  
  - [x] 4.2 Implement scroll animation hook
    - Create lib/hooks/useScrollAnimation.ts using Framer Motion's useInView
    - Support threshold, triggerOnce, and margin options
    - Return ref and isInView state
    - _Requirements: 23.1, 23.2_
  
  - [x] 4.3 Implement smooth scroll hook
    - Create lib/hooks/useSmoothScroll.ts integrating Lenis
    - Configure duration, easing, and scroll behavior
    - Handle cleanup on unmount
    - _Requirements: 25.1, 25.2, 25.3_
  
  - [ ]* 4.4 Write property test for smooth scrolling
    - **Property 11: Smooth Scrolling Active**
    - **Validates: Requirements 25.2**

- [ ] 5. Data models and static data
  - [x] 5.1 Define TypeScript interfaces
    - Create types/index.ts with all data model interfaces
    - Define Project, Skill, TimelineEvent, Interest, ContactFormData interfaces
    - Define NavLink, MonochromePalette, and MangaTheme interfaces
    - _Requirements: N/A (type definitions)_
  
  - [x] 5.2 Create projects data file
    - Create lib/data/projects.ts with sample project data
    - Include featured projects and various categories (web, mobile, uiux, other)
    - Add full project details (description, screenshots, demo/repo links, challenges, learnings, impact)
    - _Requirements: 4.1, 9.2, 12.1_
  
  - [x] 5.3 Create skills data file
    - Create lib/data/skills.ts with technical skills and tools
    - Organize by category (frontend, backend, design, tools, other)
    - Include skill levels (0-100) for stat bar visualization
    - _Requirements: 6.1, 6.3_
  
  - [x] 5.4 Create timeline data file
    - Create lib/data/timeline.ts with career milestones
    - Include education, work, projects, and achievements
    - Mark past events for "Flashback" styling
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [x] 5.5 Create interests data file
    - Create lib/data/interests.ts with manga, anime, and hobbies
    - Include images and descriptions for trading card display
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 6. Dashboard page implementation
  - [x] 6.1 Create Dashboard page structure
    - Create app/page.tsx with PageTransition wrapper
    - Import and compose HeroSection and FeaturedProjects components
    - _Requirements: 1.1, 3.1_
  
  - [x] 6.2 Implement HeroSection component
    - Create components/dashboard/HeroSection.tsx with headline, subheadline, and avatar
    - Add two CTA buttons ("View Projects" and "Contact Me")
    - Implement navigation handlers for buttons
    - Add entry animation on page load
    - Make responsive (stacked on mobile, side-by-side on desktop)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 17.1_
  
  - [ ]* 6.3 Write unit tests for HeroSection
    - Test headline and buttons render correctly
    - Test button click navigation
    - Test responsive layout at different breakpoints
    - _Requirements: 3.1, 3.5, 3.6_
  
  - [x] 6.4 Implement FeaturedProjects component
    - Create components/dashboard/FeaturedProjects.tsx with "New Chapter" divider
    - Display 2-3 featured project cards in manga panels
    - Add hover reveal animations
    - Implement click navigation to project detail
    - Make responsive grid (1 col mobile, 2-3 cols desktop)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 17.1, 19.1_
  
  - [ ]* 6.5 Write unit tests for FeaturedProjects
    - Test featured projects render correctly
    - Test click navigation to project detail
    - Test responsive grid layout
    - _Requirements: 4.1, 4.4_

- [ ] 7. About page implementation
  - [x] 7.1 Create About page structure
    - Create app/about/page.tsx with PageTransition wrapper
    - Import and compose IntroPanel, SkillsPanel, Timeline, and InterestsPanel components
    - _Requirements: 1.1_
  
  - [x] 7.2 Implement IntroPanel component
    - Create components/about/IntroPanel.tsx with photo/avatar in manga frame
    - Display bio text and manga/anime inspirations
    - Add panel reveal animation
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 7.3 Implement SkillsPanel component
    - Create components/about/SkillsPanel.tsx with RPG-style stat bars
    - Animate stat bar fill on scroll into view
    - Group skills by category
    - Display tools as badges
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 7.4 Implement Timeline component
    - Create components/about/Timeline.tsx with vertical manga panel strip format
    - Display events chronologically with connecting lines
    - Apply "Flashback" visual treatment to past events
    - Make responsive (simplified on mobile)
    - _Requirements: 7.1, 7.2, 7.3, 17.1_
  
  - [x] 7.5 Implement InterestsPanel component
    - Create components/about/InterestsPanel.tsx with trading card-style elements
    - Display manga/anime favorites in grid layout
    - Add hover flip animation
    - Display hobbies with icons
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ]* 7.6 Write unit tests for About page components
    - Test IntroPanel displays bio and inspirations
    - Test SkillsPanel renders skills with stat bars
    - Test Timeline displays events chronologically
    - Test InterestsPanel displays interests as cards
    - _Requirements: 5.1, 6.1, 7.1, 8.1_

- [ ] 8. Projects page implementation
  - [x] 8.1 Create Projects page structure
    - Create app/projects/page.tsx with PageTransition wrapper
    - Implement URL-based filter state management
    - Import and compose FilterTabs and ProjectGrid components
    - Handle empty state when no projects exist
    - _Requirements: 1.1, 11.1_
  
  - [x] 8.2 Implement FilterTabs component
    - Create components/projects/FilterTabs.tsx with category tabs
    - Add tabs for: All, Web Apps, Mobile Apps, UI/UX, Other
    - Style as manga chapter tabs with active state indication
    - Make responsive (scrollable on mobile)
    - Update URL parameters on filter change
    - _Requirements: 10.1, 10.2, 17.3_
  
  - [x] 8.3 Implement ProjectGrid component
    - Create components/projects/ProjectGrid.tsx with responsive grid
    - Support 1 col mobile, 2 col tablet, 3+ col desktop
    - Add sequential reveal animation on load
    - Handle empty state for filtered results
    - _Requirements: 9.1, 11.2, 17.1, 18.1, 19.1_
  
  - [x] 8.4 Implement ProjectCard component
    - Create components/projects/ProjectCard.tsx with manga panel container
    - Display thumbnail with halftone overlay, title, description, and tech stack badges
    - Add hover panel flip animation
    - Implement click navigation to detail page
    - Add staggered entrance animation
    - _Requirements: 9.2, 9.3, 9.4, 22.1_
  
  - [ ]* 8.5 Write property test for project card content completeness
    - **Property 4: Project Card Content Completeness**
    - **Validates: Requirements 9.2**
  
  - [ ]* 8.6 Write property test for project filtering
    - **Property 5: Project Filtering**
    - **Validates: Requirements 10.3**
  
  - [ ]* 8.7 Write unit tests for Projects page components
    - Test FilterTabs render all categories
    - Test filter selection updates displayed projects
    - Test ProjectCard displays all required fields
    - Test empty state displays appropriate message
    - _Requirements: 10.1, 9.2, 11.1, 11.2_

- [ ] 9. Project detail page implementation
  - [x] 9.1 Create Project detail page structure
    - Create app/projects/[slug]/page.tsx with dynamic route
    - Implement generateStaticParams for static generation
    - Handle 404 for invalid project slugs
    - _Requirements: 1.1_
  
  - [x] 9.2 Implement ProjectDetail component
    - Create components/projects/ProjectDetail.tsx with full project information
    - Display screenshots in comic panel layout
    - Add demo and repo links with button styling
    - Display challenges, learnings, and impact as "power stats"
    - Add back navigation to projects page
    - Implement scroll-triggered panel animations
    - _Requirements: 12.1, 12.2, 12.3_
  
  - [ ]* 9.3 Write property test for project detail completeness
    - **Property 6: Project Detail Completeness**
    - **Validates: Requirements 12.1**
  
  - [ ]* 9.4 Write unit tests for ProjectDetail
    - Test full description displays correctly
    - Test screenshots render in comic panel layout
    - Test demo and repo links are present when available
    - Test challenges, learnings, and impact display correctly
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 10. Contact page implementation
  - [ ] 10.1 Create Contact page structure
    - Create app/contact/page.tsx with PageTransition wrapper
    - Import and compose ContactIntro, ContactForm, and SocialLinks components
    - _Requirements: 1.1_
  
  - [~] 10.2 Implement ContactIntro component
    - Create components/contact/ContactIntro.tsx with speech bubble
    - Display availability information and preferred contact methods
    - Add manga character illustration
    - _Requirements: 14.1, 14.2_
  
  - [~] 10.3 Implement ContactForm component
    - Create components/contact/ContactForm.tsx with React Hook Form
    - Add fields for name, email, subject, and message
    - Style fields as manga dialogue boxes
    - Implement client-side validation (required fields, email format, length limits)
    - Add submit button styled as "Action" manga panel
    - Display validation errors below fields
    - Handle loading state during submission
    - Display success/error feedback with manga reactions
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 16.1, 16.2_
  
  - [~] 10.4 Create form validation utility
    - Create lib/utils/validation.ts with validation functions
    - Implement name validation (2-100 chars)
    - Implement email validation (regex pattern)
    - Implement subject validation (5-200 chars)
    - Implement message validation (10-2000 chars)
    - _Requirements: 13.4, 13.5_
  
  - [ ]* 10.5 Write property test for form validation
    - **Property 7: Form Validation**
    - **Validates: Requirements 13.4, 13.5**
  
  - [~] 10.6 Implement SocialLinks component
    - Create components/contact/SocialLinks.tsx with social icons
    - Display email in typewriter-style text
    - Style social links (GitHub, LinkedIn, Twitter) as manga badges
    - Open links in new tab
    - Add location with map marker icon if provided
    - Add hover ink splash effects
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 22.2_
  
  - [ ]* 10.7 Write unit tests for Contact page components
    - Test ContactForm displays all fields
    - Test form validation for invalid inputs
    - Test form submission with valid data
    - Test success/error message display
    - Test SocialLinks render correctly and open in new tab
    - _Requirements: 13.1, 13.4, 13.5, 15.2, 15.3_

- [~] 11. Checkpoint - Core functionality complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Monochrome color compliance and styling
  - [~] 12.1 Implement color compliance utility
    - Create lib/utils/colors.ts with approved color palette constants
    - Add helper function to validate color values
    - Add RGB to hex conversion utility
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ]* 12.2 Write property test for monochrome color compliance
    - **Property 2: Monochrome Color Compliance**
    - **Validates: Requirements 2.1**
  
  - [~] 12.3 Apply manga visual effects across components
    - Add halftone patterns to appropriate elements
    - Add speed lines for motion effects
    - Add bold onomatopoeia text (BOOM!, WHOOSH!, POW!) where appropriate
    - Ensure ink brush strokes used for dividers
    - _Requirements: 20.1, 20.2, 20.3, 20.4_

- [ ] 13. Interactive hover effects and animations
  - [~] 13.1 Implement hover effects for all interactive elements
    - Add panel reveal/ink bleed animation to ProjectCard hover
    - Add ink splash effect to button hover
    - Add visual feedback to navigation link hover
    - Ensure hover effects work across all interactive elements
    - _Requirements: 22.1, 22.2, 22.3_
  
  - [ ]* 13.2 Write property test for interactive hover feedback
    - **Property 8: Interactive Hover Feedback**
    - **Validates: Requirements 9.3, 22.1, 22.2, 22.3**
  
  - [ ]* 13.3 Write unit tests for hover effects
    - Test ProjectCard hover triggers animation
    - Test button hover triggers ink splash
    - Test navigation link hover provides feedback
    - _Requirements: 22.1, 22.2, 22.3_

- [ ] 14. Navigation and clickable element behavior
  - [ ]* 14.1 Write property test for clickable element navigation
    - **Property 3: Clickable Element Navigation**
    - **Validates: Requirements 1.4, 4.4, 9.4**
  
  - [ ]* 14.2 Write unit tests for navigation behavior
    - Test navigation links navigate to correct routes
    - Test CTA buttons navigate to correct pages
    - Test project cards navigate to detail pages
    - Test back navigation from project detail
    - _Requirements: 1.4, 3.5, 3.6, 4.4, 9.4_

- [ ] 15. Accessibility implementation
  - [~] 15.1 Add semantic HTML and ARIA labels
    - Ensure proper heading hierarchy (h1 → h2 → h3)
    - Use semantic elements (nav, main, section, article, footer)
    - Add meaningful alt text for all images
    - Add ARIA labels for interactive elements
    - Add skip-to-content link for screen readers
    - _Requirements: N/A (accessibility)_
  
  - [~] 15.2 Implement keyboard navigation support
    - Ensure all interactive elements accessible via keyboard
    - Add visible focus indicators
    - Ensure logical tab order
    - Test keyboard navigation across all pages
    - _Requirements: N/A (accessibility)_
  
  - [~] 15.3 Add prefers-reduced-motion support
    - Detect prefers-reduced-motion media query
    - Disable or reduce animations when user prefers reduced motion
    - Ensure site remains functional without animations
    - _Requirements: N/A (accessibility)_
  
  - [ ]* 15.4 Write unit tests for accessibility
    - Test semantic HTML structure
    - Test ARIA labels present on interactive elements
    - Test keyboard navigation works correctly
    - Test focus indicators visible
    - _Requirements: N/A (accessibility)_

- [ ] 16. Performance optimization
  - [~] 16.1 Optimize images with Next.js Image component
    - Replace all img tags with Next.js Image component
    - Add appropriate width, height, and sizes props
    - Implement lazy loading for below-the-fold images
    - Add blur placeholders for images
    - _Requirements: N/A (performance)_
  
  - [~] 16.2 Implement code splitting and lazy loading
    - Use dynamic imports for heavy components
    - Ensure route-based code splitting working correctly
    - Add loading states for dynamically imported components
    - _Requirements: N/A (performance)_
  
  - [~] 16.3 Optimize animation performance
    - Ensure animations use CSS transforms and opacity (GPU-accelerated)
    - Avoid animating layout properties
    - Use will-change sparingly for critical animations
    - Test animation performance (target 60fps)
    - _Requirements: 23.1, 24.1, 25.3_
  
  - [ ]* 16.4 Write performance tests
    - Test image lazy loading works correctly
    - Test code splitting reduces initial bundle size
    - Test animation frame rate meets 60fps target
    - _Requirements: N/A (performance)_

- [ ] 17. Error handling and edge cases
  - [~] 17.1 Implement 404 page
    - Create app/not-found.tsx with manga-style "Lost in the Panels" illustration
    - Add navigation back to home page
    - Suggest alternative pages (Projects, About, Contact)
    - _Requirements: N/A (error handling)_
  
  - [~] 17.2 Add image loading error handling
    - Add fallback manga-style placeholder for failed images
    - Implement loading states with skeleton screens
    - Handle missing images gracefully
    - _Requirements: N/A (error handling)_
  
  - [~] 17.3 Implement form submission error handling
    - Display error message with frustrated manga character on submission failure
    - Preserve form data on error
    - Provide retry option
    - Log errors for debugging
    - _Requirements: 16.2_
  
  - [ ]* 17.4 Write unit tests for error handling
    - Test 404 page displays correctly
    - Test image fallback for missing images
    - Test form error handling preserves data
    - _Requirements: 16.2_

- [ ] 18. Responsive design testing and refinement
  - [ ]* 18.1 Write unit tests for responsive layouts
    - Test mobile layout (< 640px) renders single column
    - Test tablet layout (640-1024px) renders 2-column grid
    - Test desktop layout (> 1024px) renders multi-column layout
    - Test navigation adapts to mobile on small screens
    - _Requirements: 17.1, 17.2, 17.3, 18.1, 18.2, 19.1, 19.2_
  
  - [~] 18.2 Test and refine responsive breakpoints
    - Test all pages at mobile breakpoint (< 640px)
    - Test all pages at tablet breakpoint (640-1024px)
    - Test all pages at desktop breakpoint (> 1024px)
    - Ensure no layout shift during resize
    - Test touch interactions on mobile
    - _Requirements: 17.1, 17.2, 17.3, 18.1, 18.2, 19.1, 19.2, 25.3_

- [ ] 19. Final integration and polish
  - [~] 19.1 Add sample content and placeholder images
    - Add sample project data with realistic content
    - Add placeholder images for projects, avatar, and illustrations
    - Add sample skills, timeline events, and interests
    - _Requirements: N/A (sample data)_
  
  - [~] 19.2 Review and refine manga aesthetic consistency
    - Ensure all components use monochrome palette
    - Verify manga visual elements (halftone, speed lines, ink effects) applied consistently
    - Check typography consistency across all pages
    - Verify all animations feel cohesive
    - _Requirements: 2.1, 20.1, 20.2, 20.3, 20.4, 20.5, 21.1, 21.2, 21.3_
  
  - [~] 19.3 Test complete user flows
    - Test flow: Landing → View Projects → Project Detail → Back
    - Test flow: Landing → About → Scroll through sections
    - Test flow: Landing → Contact → Fill form → Submit
    - Test flow: Projects → Filter by category → View filtered results
    - _Requirements: 1.4, 3.5, 3.6, 4.4, 9.4, 10.3_
  
  - [~] 19.4 Run full test suite and fix any issues
    - Run all unit tests and ensure they pass
    - Run all property-based tests and ensure they pass
    - Fix any failing tests or identified issues
    - _Requirements: N/A (testing)_

- [~] 20. Final checkpoint - Production ready
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation uses TypeScript with Next.js 14+ App Router
- All styling uses Tailwind CSS with custom manga theme configuration
- Animations use Framer Motion and Lenis smooth scroll
- Testing uses Jest, React Testing Library, and fast-check for property-based tests
