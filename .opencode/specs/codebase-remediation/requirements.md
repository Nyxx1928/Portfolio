# Requirements Document: Codebase Remediation

## Introduction

Remediate critical security, architectural, and code-quality issues in the manga-portfolio codebase identified during an audit. The goal is to eliminate exposed secrets, fix brittle patterns that cause runtime bugs, consolidate duplicated CSS/configuration, remove dead code, and fill testing gaps — without changing any user-facing behavior or visual design.

## Glossary

- **Secret Rotation**: Replacing compromised API keys/tokens with new values and removing them from version control history
- **CSS Duplication**: Identical or overlapping style definitions spread across `globals.css`, `tailwind.config.ts`, and component-level files
- **Body Overflow Trap**: The condition where `document.body.style.overflow = "hidden"` is set by a component but never reset on unmount, making the page permanently unscrollable
- **Barrel Export**: A file (typically `index.ts`) that re-exports multiple modules from a directory for cleaner imports
- **Preservation Property**: A behavior that must remain unchanged after remediation to prevent regressions
- **Dead Code**: Files that exist in the project but are never imported or used by any other module

## Requirements

### Requirement 1: Rotate Exposed Credentials

**User Story:** As a project maintainer, I want all committed secrets invalidated and removed from git history, so that the live services (Resend, Vercel, GitHub) are not compromised.

#### Acceptance Criteria

1. WHEN the `.env.local` file is inspected, THEN it SHALL NOT contain any live API keys; all values SHALL be placeholder templates (e.g., `your_resend_api_key_here`)
2. WHEN `git log --all` is searched for any of the original credential values, THEN SHALL return zero matches
3. WHEN the Resend API key is used in production, THEN it SHALL be the newly rotated key (not the exposed one)
4. WHEN `npm run dev` is started without `.env.local` present, THEN the app SHALL fail gracefully with a clear console message about missing environment variables — NOT crash with an unhelpful error

### Requirement 2: Fix Body Overflow Never Resets

**User Story:** As a user navigating the site, after the horizontal scroll container unmounts, the page body SHALL always return to its normal scrollable state.

#### Acceptance Criteria

1. WHEN the horizontal scroll container mounts, THEN `document.body.style.overflow` SHALL be preserved and restored on unmount
2. WHEN the horizontal scroll container unmounts (e.g., navigating to a non-panel route), THEN the page body SHALL be scrollable again
3. WHEN the browser is resized or the page is refreshed, THEN body overflow state SHALL remain consistent
4. THE fix SHALL NOT use a global side-effect from within a child component; instead SHALL use a class-based approach on `<html>` or the container element

### Requirement 3: Eliminate CSS Duplication

**User Story:** As a developer maintaining the project, CSS component classes (`.manga-panel`, `.speech-bubble`, `.manga-button`) SHALL NOT be duplicated between `globals.css` and their React component implementations, so that styles are defined in one place only.

#### Acceptance Criteria

1. WHEN `globals.css` is searched for `.manga-panel`, `.speech-bubble`, `.manga-button`, `.manga-button-outline`, `.chapter-header`, `.stat-bar`, `.stat-bar-fill`, `.trading-card`, `.speed-lines`, `.typewriter-text`, `.manga-input`, `.manga-textarea`, THEN each SHALL appear at most once (either in CSS or as Tailwind classes in components, not both)
2. WHEN any of the corresponding React components are rendered, THEN their visual appearance SHALL be identical to the current behavior
3. WHEN the `@layer components` block in `globals.css` is modified, THEN no component SHALL lose its styling

### Requirement 4: Consolidate Tailwind Configuration

**User Story:** As a developer, the theme configuration SHALL live in one place — either `globals.css` (Tailwind v4 `@theme`) or `tailwind.config.ts` (Tailwind v3 style) — not both.

#### Acceptance Criteria

1. WHEN `tailwind.config.ts` is inspected, THEN it SHALL NOT duplicate color, shadow, animation, or font definitions that already exist in `globals.css` via `@theme`
2. WHEN a component uses `shadow-manga`, `font-heading`, or any custom theme value, THEN it SHALL resolve correctly regardless of which file is the source of truth
3. IF Tailwind v4's CSS-based config is chosen as the source of truth, THEN `tailwind.config.ts` SHALL either be removed or reduced to an empty/minimal config
4. THE fix SHALL not break the build or any Tailwind utility class usage

### Requirement 5: Remove Dead Code and Empty Files

**User Story:** As a developer onboarding to the project, every file in the repository SHALL serve a clear purpose, with no empty or orphaned files.

#### Acceptance Criteria

1. WHEN `components/dashboard/ProfileChroma.tsx` and `components/dashboard/ChromaGrid.css` are inspected, THEN they SHALL either contain meaningful code or be removed
2. WHEN `components/ChromaGrid.tsx` and `components/ChromaGrid.css` (root-level) are inspected, THEN they SHALL either be integrated into the app (imported somewhere) or removed
3. WHEN `components/layout/PageTransition.tsx` is inspected, THEN it SHALL either be used in the layout or removed
4. WHEN `components/ui/` is inspected, THEN it SHALL contain meaningful components or be removed/renamed
5. WHEN `lib/utils.ts` and `lib/utils/cn.ts` coexist, THEN the naming collision SHALL be resolved (either remove one or rename to avoid confusion)

### Requirement 6: Consolidate Animation Libraries

**User Story:** As a developer, the project SHALL use exactly one animation library — not both Framer Motion and GSAP — to reduce bundle size and simplify maintenance.

#### Acceptance Criteria

1. WHEN `package.json` is inspected after remediation, THEN only one of `framer-motion` or `gsap` SHALL be in `dependencies`
2. WHEN the refactored `ChromaGrid.tsx` (or equivalent) renders, THEN its interactive mouse-following spotlight, card tilt, and click-to-open behaviors SHALL function identically to the current implementation
3. THE choice of library SHALL be the one used by the majority of the codebase

### Requirement 7: Add Contact API Tests

**User Story:** As a developer, the contact form API route (`/api/contact`) SHALL have automated tests that verify correct behavior for valid submissions, missing fields, invalid email configuration, and server errors.

#### Acceptance Criteria

1. WHEN a valid contact form payload is POSTed to `/api/contact`, THEN the test SHALL verify a `200 { ok: true }` response
2. WHEN a payload with missing required fields is POSTed, THEN the test SHALL verify a `400` response with an error message
3. WHEN the Resend API key is not configured, THEN the test SHALL verify a `500` response
4. WHEN Resend throws an error, THEN the test SHALL verify a `500` response with the error message
5. ALL tests SHALL mock the `Resend` client (no real API calls)

### Requirement 8: Extract SplashScreen Subcomponents

**User Story:** As a developer, the 480-line `SplashScreen.tsx` SHALL be decomposed into one file per subcomponent for testability and maintainability.

#### Acceptance Criteria

1. WHEN `SplashScreen.tsx` is inspected after refactoring, THEN it SHALL be no more than 100 lines, acting as an orchestrator importing subcomponents from separate files
2. WHEN the splash screen sequence plays, THEN the visual behavior SHALL be identical to the current implementation: splash → shatter → wipe-in → wipe-out → done
3. EACH subcomponent file SHALL have a corresponding test file

### Requirement 9: Add API Rate Limiting

**User Story:** As a project maintainer, the contact form API SHALL be protected against abuse by limiting the number of submissions from a single IP address within a time window.

#### Acceptance Criteria

1. WHEN more than 5 POST requests are received from the same IP address within 60 seconds, THEN subsequent requests SHALL receive a `429 Too Many Requests` response
2. WHEN a request is rate-limited, THEN the response body SHALL include an informative error message
3. Rate limit state SHALL be in-memory (no external service required) and reset when the server restarts
4. THE rate limiter SHALL NOT interfere with legitimate single submissions

### Requirement 10: Consolidate HorizontalScrollContainer Effects

**User Story:** As a developer, the `HorizontalScrollContainer.tsx` SHALL have a reduced number of `useEffect` hooks with clearly documented dependencies, eliminating race conditions in scroll, resize, and focus management.

#### Acceptance Criteria

1. AFTER remediation, the total number of `useEffect` hooks in `HorizontalScrollContainer.tsx` SHALL be reduced
2. WHEN the resize handler fires during unmount, THEN it SHALL NOT attempt to call `scrollToPanel` with a stale `currentIndex`
3. WHEN the wheel/trackpad handler fires, THEN the ref-based currentIndex SHALL always match the state-based currentIndex
4. ALL effect dependencies SHALL be explicit (no eslint-disable comments for exhaustive-deps)

### Requirement 11: Fix Invalid CSS Properties

**User Story:** As a developer, all CSS property values in `globals.css` SHALL be valid and actually apply to elements.

#### Acceptance Criteria

1. WHEN `globals.css` is inspected for `ring:` and `ring-color:` properties, THEN they SHALL be replaced with valid CSS (`outline` or `box-shadow`)
2. WHEN a `.manga-input` or `.manga-textarea` element receives focus, THEN a visible focus indicator SHALL appear

### Requirement 12: Resolve `lib/utils` Naming Collision

**User Story:** As a developer, importing from `@/lib/utils` SHALL have an unambiguous resolution — either the file or the directory barrel, not an unpredictable mix.

#### Acceptance Criteria

1. AFTER remediation, `@/lib/utils` SHALL resolve to exactly one export — either a single file or a barrel
2. ALL existing imports of `@/lib/utils` across the codebase SHALL continue to work without modification to the import statements

### Requirement 13: Preservation — No User-Visible Changes

**User Story:** As a site visitor, after all remediation work is complete, the visual appearance, interactivity, and content of every page SHALL be identical to the pre-remediation state.

#### Acceptance Criteria

1. WHEN every route is visited (`/`, `/about`, `/projects`, `/projects/[slug]`, `/contact`), THEN the visual layout, spacing, colors, typography, and animations SHALL be unchanged
2. WHEN the contact form is submitted, THEN the success/error flow SHALL be unchanged
3. WHEN the horizontal scroll navigation is used, THEN the scrolling behavior, snap points, and transitions SHALL be unchanged
4. WHEN the splash screen plays, THEN the sequence of animations and timing SHALL be unchanged
5. ALL existing tests (unit, property-based, e2e) SHALL continue to pass without modification

## Scope

### In-Scope
- Credential rotation and git history cleanup
- Fix body overflow trap in horizontal scroll
- Remove duplicated CSS component classes from `globals.css`
- Consolidate Tailwind v4 configuration (choose CSS-based as source of truth)
- Remove dead code and empty files; resolve naming collision
- Consolidate to Framer Motion only; remove GSAP
- Add contact API route tests
- Extract SplashScreen subcomponents
- Add rate limiting to contact API
- Consolidate useEffect hooks in HorizontalScrollContainer
- Fix invalid `ring:` CSS properties
- Update `.gitignore` if needed

### Out-of-Scope
- Adding new features or content (new routes, new components, new data)
- Refactoring the horizontal scroll navigation from scroll-based to a different paradigm
- Replacing Resend with another email provider
- Redesigning the visual theme or color palette
- Performance optimization beyond animation library removal
- Adding E2E tests for new interaction flows (existing e2e coverage is sufficient)
- Setting up a proper secret management service (beyond rotation and .gitignore)
