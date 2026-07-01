# Tasks Document: Manga Immersion Overhaul

## Overview

Implementation organized into 4 phases to ensure incremental value delivery and testability. Phase 1 delivers the highest-impact visual changes (trading cards + panel nav). Phase 2 adds the transition/show features. Phase 3 covers error/loading states. Phase 4 is polish and edge cases. Each phase has a checkpoint.

---

## Phase 1: Core Visual Overhaul (Trading Cards + Panel Nav)

**Goal:** Transform the two most-visible UI surfaces — project cards and panel navigation.

---

- [ ] **1. Add rarity, stats, and cardNumber to project data types**
  - Extend `types/index.ts` — add `rarity`, `stats`, `cardNumber` fields to `Project` interface
  - Update `lib/data/projects.ts` — add sample data for existing projects
  - Set default values (rarity: `'common'`, stats: `{ code: 70, design: 70, innovation: 70 }`)
  - Write unit test: verify project data shape matches new interface
  - _Requirements: 2.1, 2.6_

- [ ] **2. Create `TradingCardFront` component**
  - New file: `components/projects/TradingCardFront.tsx`
  - Renders: thumbnail, title, rarity badge (★/★★/★★★), card number (#001), 3 stat bars using existing `stat-bar` / `stat-bar-fill` CSS
  - Accept `project: Project` prop
  - Write unit test: verify stat bar widths match values (0→0%, 50→50%, 100→100%)
  - _Requirements: 2.1_

- [ ] **3. Create `TradingCardBack` component**
  - New file: `components/projects/TradingCardBack.tsx`
  - Renders: project summary (shortened description), tech stack badges, "View Details →" CTA button
  - Use existing `backface-hidden rotateY(180deg)` positioning
  - Write unit test: verify back face is hidden by default
  - _Requirements: 2.2_

- [ ] **4. Rewrite `ProjectCard` as flip-container trading card**
  - Replace content in `ProjectCard.tsx`:
    - Wrap `TradingCardFront` and `TradingCardBack` in a `perspective-1000 preserve-3d` container
    - Add Framer Motion `whileHover={{ rotateY: 180 }}` on the inner wrapper with `duration: 0.5`
    - Remove old thumbnail/content rendering
    - Preserve existing click handler for navigation
    - Preserve existing keyboard handling (Enter/Space)
  - Verify hover flip works on desktop and degrades gracefully on touch (no hover → no flip)
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] **5. Add collection progress indicator**
  - New small component or inline element in `ProjectGrid.tsx` above the grid
  - Format: `Cards Collected: 3 / 12 ▰▰▰▰▰▰▰▰▰▰▰▰`
  - Use filled ▰ and empty ▰ characters styled with manga colors
  - Track via `IntersectionObserver` which card thumbnails have been in view
  - _Requirements: 2.6_

- [ ] **6. Rewrite `PanelNavigator` with manga tabs**
  - Replace dot indicators in `PanelNavigator.tsx`:
    - Render array of numbered square tabs (1, 2, 3... totalPanels)
    - Active tab: `bg-manga-black text-manga-white` with corner fold decoration
    - Inactive tabs: `bg-manga-white text-manga-black` with hover state
  - Add binding-strip progress bar below tabs (horizontal line with filled segment)
  - Update label: `VOL. 1 — pp. {current + 1} / {total}`
  - Add `getTankobonLabel` to `utils.ts`
  - Preserve Prev/Next buttons, ARIA labels, keyboard accessibility
  - Write unit test: verify correct tab highlights for all valid `currentIndex` values
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] **7. Checkpoint — Phase 1 Complete**
  - Run `npm run test:ci` — all existing tests pass
  - Manually verify: project cards flip on hover, rarity badges display, stat bars animate
  - Manually verify: panel navigator shows numbered tabs, binding strip, correct label
  - Run Playwright E2E tests — no regressions
  - _Requirements: All Phase 1_

---

## Phase 2: Transitions and Atmosphere (Page-Curl + Ink Reverse + Cursor)

**Goal:** Add the immersive transitional effects that make navigation feel tactile.

---

- [ ] **8. Create `PageCurlOverlay` component**
  - New file: `components/horizontal-scroll/PageCurlOverlay.tsx`
  - Fixed-position overlay (`fixed inset-0 pointer-events-none z-[61]`)
  - On navigation trigger, render a gradient shadow on the exiting side
  - Shadow: reuse `bg-gradient-to-l from-black/15 to-transparent` from `SplashScreen.tsx`
  - Animate opacity: 0 → 1 (0.15s) → hold (0.25s) → 0 (0.15s)
  - Accept `direction: 'left' | 'right'` prop to control shadow orientation
  - Respect `prefers-reduced-motion` (render nothing)
  - Write unit test: verify component renders nothing when `reducedMotion` is true
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] **9. Integrate page-curl into horizontal scroll**
  - In `HorizontalScrollContainer.tsx`:
    - Import `PageCurlOverlay` and render it alongside `PageTransitionOverlay`
    - On `scrollToPanel` call (lines 79-104), determine direction and pass to overlay
    - Trigger curl when `isTransitioning` is set to true
    - Add `data-page-curl-direction` attribute to container for CSS targeting
  - Implement edge peek: add a 60px `mr-[-60px]` on the current panel to show next panel edge
    - Use `overflow-visible` on the horizontal scroll container
    - Constrain to the last panel (no peek after last panel)
  - Verify: keyboard arrows, wheel scroll, and Prev/Next buttons all trigger the curl
  - _Requirements: 1.1, 1.3, 1.4, 1.6_

- [ ] **10. Add pen nib cursor CSS and global class**
  - In `globals.css` `@layer utilities`:
    - Add `.pen-nib-cursor { cursor: url("data:image/svg+xml,...") 0 24, auto; }`
    - Add rule: interactive elements within `.pen-nib-cursor` context → stamp variant
  - In `layout.tsx`, add `pen-nib-cursor` class to `<body>`
  - Generate and inline SVG data URIs for both cursor variants
  - _Requirements: 4.1, 4.2, 4.5_

- [ ] **11. Add click ink splash**
  - New file: `components/cursor/ClickSplash.tsx`
  - Global click event listener in root layout
  - On click, render a small `motion.div` at click coordinates with:
    - Scale animation (0 → 1.2 → 0, 0.4s)
    - Uses `InkEffect`-style SVG splash scaled to 20×20px
    - Auto-remove after animation completes
  - Skip if `prefers-reduced-motion`
  - Wrap in `ReactDOM.createPortal` to render outside component tree
  - _Requirements: 4.3, 4.4_

- [ ] **12. Implement Ink Reverse toggle transition**
  - New file: `components/theme/InkReverseOverlay.tsx`
  - Full-screen overlay with:
    - White flash: `bg-white` opacity 0→1→0 over 0.3s
    - Ink splash: `InkEffect variant="splash"` at 0.15s, fades with flash
  - In `ThemeSwitch.tsx`:
    - Change label to "Ink Reverse" when dark mode is active
    - Replace "Dark" text with `墨` and "Light" with `白` Unicode icons
    - On toggle, render `InkReverseOverlay` as sibling
    - Gate theme change: `setTheme()` fires at midpoint of flash (0.15s via `setTimeout`)
  - Write unit test: verify theme state matches `next-themes` value after toggle animation completes
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] **13. Checkpoint — Phase 2 Complete**
  - Run `npm run test:ci` — all tests pass
  - Manually verify: page-curl shadow appears on panel transitions
  - Manually verify: cursor changes to pen nib and stamp on hover
  - Manually verify: Ink Reverse toggle shows flash + label change
  - Run `npm run build` — no TypeScript or build errors
  - _Requirements: All Phase 2_

---

## Phase 3: Error and Loading States (Manga Loading + Previously On... + 404 Ripped Page)

**Goal:** Turn every waiting/error moment into a manga experience.

---

- [ ] **14. Create `MangaLoadingSkeleton` component**
  - New file: `components/manga/MangaLoadingSkeleton.tsx`
  - Props: `panels?: 1 | 2 | 3` (default 2), `variant?: 'page' | 'card' | 'list'` (default 'page')
  - Renders SVG-based panel outlines:
    - SVG viewBox proportional to container size
    - Each panel = rounded rectangle with `stroke-dasharray="1200"` and `stroke-dashoffset="1200"`
    - CSS keyframe animation: `@keyframes drawBorder { to { stroke-dashoffset: 0; } }`
    - Panels draw sequentially with `animation-delay: 0s, 0.4s, 0.8s`
    - Inside each panel: 3 horizontal lines (content placeholders) drawn after border
  - Variant behaviors:
    - `page`: 2 large panels (full-width)
    - `card`: 3 small panels in a row (for grid loading)
    - `list`: 1 panel with many content lines
  - Respect `prefers-reduced-motion`: render static outlined rectangles, no animation
  - Write unit test: verify component renders correct number of panels for each variant
  - _Requirements: 6.1, 6.2, 6.5_

- [ ] **15. Replace all `animate-pulse` loaders with `MangaLoadingSkeleton`**
  - `components/contact/ContactForm.tsx` — Replace `animate-pulse` fallback with `<MangaLoadingSkeleton panels={1} variant="page" />`
  - `components/contact/ContactIntro.tsx` (via dynamic import fallback in `contact/page.tsx`) — Replace with `<MangaLoadingSkeleton panels={1} variant="page" />`
  - `components/contact/SocialLinks.tsx` (dynamic import in `contact/page.tsx`) — Replace with `<MangaLoadingSkeleton panels={1} variant="list" />`
  - `app/projects/page.tsx` (Suspense fallback for `ProjectsContent`) — Replace with `<MangaLoadingSkeleton panels={3} variant="card" />`
  - `app/projects/page.tsx` (Suspense fallback for `FilterTabs`) — Replace with `<MangaLoadingSkeleton panels={1} variant="card" />`
  - Verify each replacement occupies the same dimensions as the original loader
  - _Requirements: 6.3, 6.4_

- [ ] **16. Create `PreviouslyOnBanner` component**
  - New file: `components/layout/PreviouslyOnBanner.tsx`
  - On mount:
    - Read `localStorage` key `manga-portfolio-history`
    - If key missing or `visitCount` === 0: set `visitCount: 1`, `lastSection: 'home'`, render nothing
    - If `visitCount` > 0: increment `visitCount`, show banner
  - Banner content:
    - `PREVIOUSLY ON...` header (`font-heading text-sm uppercase tracking-widest`)
    - Body: `You were exploring {lastSectionLabel}.`
    - Action: `[Continue Reading →]` link that navigates to `lastSection`
  - Auto-dismiss after 5 seconds via `setTimeout`
    - Also dismiss on click of banner or "Continue Reading" link
    - Animate: slideDown (0.3s) on mount, slideUp (0.3s) on dismiss
  - Write unit test: verify localStorage interactions, verify banner does not show on first visit
  - _Requirements: 7.1, 7.2, 7.3, 7.5, 7.6_

- [ ] **17. Wire Previously On... into navigation**
  - In `layout.tsx`, mount `<PreviouslyOnBanner />` below `<Navigation />`
  - In `Navigation.tsx`:
    - On nav link click (existing `onNavClick`), write to `localStorage`
  - In `HorizontalScrollContainer.tsx`:
    - On panel index change, update `localStorage` with corresponding panel label
  - Handle `localStorage` unavailable: wrap in try/catch, no crash
  - _Requirements: 7.4, 7.6_

- [ ] **18. Redesign 404 as ripped page**
  - Rewrite `app/not-found.tsx`:
    - Container: white panel with `clip-path: polygon()` creating a jagged bottom edge
    - SVG `clipPath` with ~15 jagged points across the bottom width
    - Content inside the clipped container:
      - Existing confused-face SVG (repositioned to top-left, slightly smaller ~120px)
      - `THIS PAGE HAS BEEN RIPPED OUT...` in `font-heading text-4xl`
      - Subtitle: `"The page you were looking for is missing from this volume."`
      - Tape-repair buttons for Home, Projects, About, Contact (beige rotated rectangles)
  - Tape button styling:
    - `bg-amber-100/70 border border-amber-800/30`
    - `rotate-[-1deg]` (each button slightly different rotation)
    - `shadow-sm` for thickness
    - `font-mono text-xs uppercase` for handwritten feel
    - Each button is a `<Link>` component
  - Preserve existing 404 HTTP status (Next.js handles this automatically)
  - Write unit test: verify component renders and buttons navigate correctly
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] **19. Checkpoint — Phase 3 Complete**
  - Run `npm run test:ci` — all tests pass
  - Manually verify: all loading states show manga panel outlines instead of pulse
  - Manually verify: "Previously On..." banner appears on return visit, dismisses correctly
  - Manually verify: navigating to `/nonexistent` shows ripped page with tape buttons
  - Run E2E tests — verify 404 returns proper status and loads custom page
  - _Requirements: All Phase 3_

---

## Phase 4: Polish, Edge Cases, and Final Verification

**Goal:** Close all edge cases, verify accessibility, and ensure no regressions.

---

- [ ] **20. Reduced motion audit**
  - Audit all 8 features for `prefers-reduced-motion` handling:
    - Page-curl: skip curl animation, snap directly
    - Trading card flip: skip flip animation, show front face only
    - Ink Reverse: skip flash/splash overlay, toggle immediately
    - Pen nib cursor: show static cursor, skip click splash
    - Loading skeleton: show static outlines, no draw animation
    - Previously On...: banner slide animation skipped, appears instantly
  - Add missing `prefers-reduced-motion` guards where absent
  - _Requirements: 1.5, 4.4, 6.5_

- [ ] **21. Touch device audit**
  - Verify trading cards on touch devices: no hover → no flip (acceptable)
  - Verify page-curl on touch swipe: curl shadow still animates (touch triggers same scroll logic)
  - Verify PanelNavigator buttons are large enough for touch targets (min 44×44px)
  - Verify Previously On... banner dismiss works on tap
  - _Requirements: 1.3, 3.4_

- [ ] **22. Performance audit**
  - Confirm no layout shifts from loading skeleton replacements
  - Verify custom cursor SVG data URIs are inlined (no extra network requests)
  - Confirm Framer Motion animations use `will-change: transform` for GPU acceleration
  - Verify `localStorage` writes are batched (not on every scroll event — only on navigation)
  - Run Lighthouse audit in development mode — verify no regressions in Performance score
  - _Requirements: 6.4_

- [ ] **23. Accessibility audit**
  - Verify `PanelNavigator` tabs are keyboard-navigable with Tab/Arrow keys
  - Verify trading card `role="button"`, `tabIndex={0}`, `aria-label` are preserved
  - Verify Previously On... banner has `role="status"` and `aria-live="polite"`
  - Verify loading skeleton has `aria-hidden="true"` (decorative only)
  - Verify ripped page 404 has proper heading hierarchy (`<h1>` for main message)
  - Run axe-core scan via Playwright — verify no new violations
  - _Requirements: 3.5, 2.3, 7.2, 8.2_

- [ ] **24. Final regression test**
  - Run full test suite: `npm run test:ci` + Playwright E2E suite
  - Run `npm run build` — zero errors
  - Manual smoke test of all 4 pages in both light and dark modes
  - Verify splash screen still works correctly (no interference with Previously On...)
  - Verify contact form submission still works
  - _Requirements: All_

- [ ] **25. Checkpoint — Phase 4 Complete**
  - All tests pass
  - Lighthouse: no regressions
  - Axe: no new accessibility violations
  - Manual test: all 8 features working in Chrome, Firefox, Safari
  - _Requirements: All_

---

## Quick Reference: File Change Summary

| Action | File |
|--------|------|
| **New** | `components/projects/TradingCardFront.tsx` |
| **New** | `components/projects/TradingCardBack.tsx` |
| **New** | `components/horizontal-scroll/PageCurlOverlay.tsx` |
| **New** | `components/cursor/ClickSplash.tsx` |
| **New** | `components/theme/InkReverseOverlay.tsx` |
| **New** | `components/manga/MangaLoadingSkeleton.tsx` |
| **New** | `components/layout/PreviouslyOnBanner.tsx` |
| **Modify** | `components/projects/ProjectCard.tsx` — flip container |
| **Modify** | `components/projects/ProjectGrid.tsx` — collection progress |
| **Modify** | `components/horizontal-scroll/PanelNavigator.tsx` — tabs |
| **Modify** | `components/horizontal-scroll/HorizontalScrollContainer.tsx` — page-curl |
| **Modify** | `components/horizontal-scroll/utils.ts` — tankobon label |
| **Modify** | `components/theme/ThemeSwitch.tsx` — ink reverse labels |
| **Modify** | `components/layout/Navigation.tsx` — localStorage writes |
| **Modify** | `app/layout.tsx` — pen nib cursor class, PreviouslyOnBanner mount |
| **Modify** | `app/not-found.tsx` — ripped page layout |
| **Modify** | `styles/globals.css` — pen nib cursor CSS, loading skeleton keyframes |
| **Modify** | `types/index.ts` — Project interface extension |
| **Modify** | `lib/data/projects.ts` — sample rarity/stats data |
| **Modify** | `components/contact/ContactForm.tsx` — loading skeleton replacement |
| **Modify** | `components/contact/SocialLinks.tsx` — loading skeleton replacement |
| **Modify** | `app/projects/page.tsx` — loading skeleton replacement |
