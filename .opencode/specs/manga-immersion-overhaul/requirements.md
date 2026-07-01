# Requirements Document: Manga Immersion Overhaul

## Introduction

This spec covers 8 UI/UX enhancements that transform the manga-portfolio from a *themed website* into an *immersive manga reading experience*. Each feature deepens the manga metaphor — turning navigation into page-turning, project cards into collectibles, dark mode into a narrative device, and every interaction into a panel moment.

## Glossary

| Term | Definition |
|------|------------|
| **Panel** | A full-screen horizontal scroll section (Home, About, Projects, Contact) |
| **Page-curl** | A visual animation effect where the edge of a page lifts and turns, mimicking a physical manga volume |
| **Trading card** | A collectible card-style UI with rarity, stats, and flip animation |
| **Ink Reverse** | The dark mode theme framed as a narrative "negative chapter" with flash transition |
| **Pen nib cursor** | A custom CSS cursor shaped like a manga illustration pen nib |
| **Previously On...** | A return-visitor banner showing the last-visited section, styled as a manga recap page |
| **Ripped page 404** | A 404 page styled as a torn/ripped page from a manga volume |
| **Manga loading state** | A loading skeleton showing manga panel outlines being drawn in |

---

## Requirements

### Requirement 1: Page-Curl Panel Transitions

**User Story:** As a visitor, I want the horizontal scroll between panels to feel like turning the pages of a manga volume, so that navigation is immersive and tactile.

**Acceptance Criteria:**

1.1 WHEN a visitor scrolls/swipes from one panel to the next, THE system SHALL animate a page-curl effect on the trailing edge of the exiting panel

1.2 WHEN the page-curl animation plays, THE system SHALL display a subtle shadow gradient at the curl edge (reuse the shadow pattern from `SplashScreen.tsx`)

1.3 WHEN the page-curl animation completes, THE system SHALL snap the new panel into full view

1.4 IF the visitor uses keyboard navigation (Arrow keys), THE system SHALL still trigger the page-curl animation

1.5 IF the visitor has `prefers-reduced-motion: reduce` enabled, THE system SHALL skip the page-curl animation and snap directly (preserve existing behavior from `PageTransitionOverlay`)

1.6 WHEN transitioning, THE system SHALL show a *peek* of the next panel's content at the right edge (~60px) consistent with manga page-edge previews

### Requirement 2: Manga Trading Card Project Cards

**User Story:** As a visitor browsing projects, I want each project to feel like a collectible manga trading card with rarity, stats, and a flip animation, so that browsing becomes playful and memorable.

**Acceptance Criteria:**

2.1 THE system SHALL display project cards as manga trading cards with:
   - A **rarity badge** (★ Common, ★★ Rare, ★★★ Legendary) determined by project metadata
   - **Stat bars** using the existing `stat-bar` / `stat-bar-fill` CSS utilities for metrics like "Code", "Design", "Innovation"
   - A **card number** (e.g., `#001`) in the corner

2.2 WHEN a visitor hovers over a trading card, THE system SHALL flip the card using the existing `perspective-1000` / `preserve-3d` / `backface-hidden` utilities to reveal a "card back" with a project summary and "View Details" call-to-action

2.3 WHEN a visitor clicks a trading card, THE system SHALL navigate to the project detail page (preserve existing behavior)

2.4 THE system SHALL preserve the existing responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)

2.5 WHEN a trading card enters the viewport, THE system SHALL animate it with a staggered reveal (preserve existing `containerVariants` / `panelVariants` pattern)

2.6 THE system SHALL include a "collection progress" indicator at the top of the projects section showing `x / N` cards viewed

### Requirement 3: Manga-Style Panel Navigator

**User Story:** As a visitor, I want the panel navigation indicator to look like page numbers in a manga tankōbon volume rather than generic web dots, so that the navigation UI reinforces the manga theme.

**Acceptance Criteria:**

3.1 THE system SHALL replace the circular dot indicators with **numbered rectangular tabs** styled as manga volume page numbers

3.2 THE navigator SHALL display the current panel number and total panels as `VOL. 1 — pp. 3 / 4` format

3.3 THE navigator SHALL include a horizontal **binding strip** (progress bar) at the bottom showing overall reading progress

3.4 THE navigator SHALL preserve the existing Prev/Next buttons with manga styling

3.5 THE system SHALL preserve the existing keyboard accessibility (tab navigation, ARIA labels)

3.6 The navigator SHALL be positioned at the bottom-center of the viewport (preserve existing placement)

### Requirement 4: Pen Nib Custom Cursor

**User Story:** As a visitor, I want the cursor to look like a manga illustration pen nib (saji-pen), so that every mouse movement feels like drawing on a manga page.

**Acceptance Criteria:**

4.1 THE system SHALL replace the default cursor with a **custom SVG-based pen nib cursor** (ink brush tip shape, ~24×24px)

4.2 WHEN the visitor hovers over clickable elements (links, buttons, cards), THE system SHALL change the cursor to a **stamp/stamp-press** variant

4.3 WHEN the visitor clicks, THE system SHALL briefly display a **tiny ink splash** animation at the click point (using existing `InkEffect splash` scaled down)

4.4 THE system SHALL respect `prefers-reduced-motion` by showing only the static cursor without click animations

4.5 THE system SHALL fall back to the default OS cursor if the custom cursor fails to load (CSS `cursor: url(...)` with auto fallback)

### Requirement 5: Ink Reverse Dark Mode

**User Story:** As a visitor, I want switching to dark mode to feel like entering a "negative chapter" of a manga, with a cinematic transition and narrative framing.

**Acceptance Criteria:**

5.1 WHEN the visitor toggles dark mode ON, THE system SHALL display a brief **white flash** transition (0.3s) mimicking a camera flash in manga

5.2 THE dark mode toggle label SHALL change from "Dark" to "Ink Reverse" with a 墨 (ink) → 白 (paper) icon swap

5.3 THE system SHALL apply a brief "ink splash" overlay during the transition using the existing `InkEffect` component

5.4 THE system SHALL preserve the existing inverted color palette behavior (light ↔ dark CSS variables)

5.5 THE system SHALL preserve the existing `next-themes` integration and `ThemeSwitch` component structure

### Requirement 6: Manga Loading States

**User Story:** As a visitor, I want loading states to show manga panel outlines being "drawn in" rather than generic pulsing rectangles, so that waiting feels thematic.

**Acceptance Criteria:**

6.1 THE system SHALL replace all existing `animate-pulse` skeleton loaders with **manga panel outline skeletons** — animated SVG strokes that draw the borders of manga panels

6.2 THE loading skeleton SHALL consist of 2-3 rectangular panel outlines that draw their borders sequentially (stroke-dasharray animation)

6.3 THE system SHALL apply manga loading skeletons to:
   - `ContactForm` loading state (currently `animate-pulse`)
   - `ProjectsPage` Suspense fallback
   - `SocialLinks` dynamic import fallback
   - `FilterTabs` Suspense fallback
   - Any page-level loading state

6.4 WHEN data finishes loading, THE system SHALL transition from the panel outline to the content with a smooth fade

6.5 THE system SHALL respect `prefers-reduced-motion` by showing static panel outlines without the drawing animation

### Requirement 7: "Previously On..." Return Visit Banner

**User Story:** As a returning visitor, I want to see a "Previously On..." banner that reminds me where I left off, so that my portfolio visit feels like continuing a manga series.

**Acceptance Criteria:**

7.1 WHEN a returning visitor lands on any page (visit count > 1 via `localStorage`), THE system SHALL display a **brief banner** at the top of the content styled as a manga recap page

7.2 THE banner SHALL display:
   - `PREVIOUSLY ON...` header in manga chapter styling
   - The name of the last-visited section (e.g., "You were exploring the Projects Archive")
   - A "Continue Reading →" link that scrolls/navigates to that section

7.3 THE banner SHALL auto-dismiss after 5 seconds or on user click

7.4 THE system SHALL update `localStorage` with the current section whenever the visitor navigates to a new panel/page

7.5 THE banner SHALL NOT show on first visit (splash screen already handles this)

7.6 THE system SHALL use `localStorage` (not `sessionStorage`) so that "Previously On..." persists across browser sessions

### Requirement 8: Ripped Page 404

**User Story:** As a visitor who lands on a missing page, I want to see a 404 styled as a ripped-out manga page, so that errors feel like part of the story rather than a technical failure.

**Acceptance Criteria:**

8.1 THE system SHALL display the 404 page as a **ripped/torn manga page** with a jagged bottom edge (SVG clip-path or CSS)

8.2 THE page SHALL display the text `"THIS PAGE HAS BEEN RIPPED OUT..."` in bold manga typography

8.3 THE page SHALL include a **tape repair** visual over the rip for the "Go Home" button — the button looks like a piece of tape holding the page together

8.4 THE system SHALL preserve existing navigation links (Home, Projects, About, Contact) from the current `not-found.tsx`

8.5 THE system SHALL preserve the existing confused-face SVG illustration but reposition it within the new ripped-page layout

---

## Scope

### In-Scope
- All 8 features listed above
- CSS-only cursor changes (no JS library)
- Extending existing components rather than creating new architectures
- `localStorage` for "Previously On..." persistence

### Out-of-Scope
- Sound effects / page-flip audio (will spec separately if desired)
- Animated manga mascot character
- Onomatopoeia/SFX floating elements during scroll
- Dynamic cursor trail effects
- Server-side tracking of "Previously On..." data (client-side only)
- Any changes to the horizontal scroll mechanism itself (only the transition visual)
