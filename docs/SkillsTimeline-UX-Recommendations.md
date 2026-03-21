# Skills & Timeline — UX Review and Recommendations

## Summary

- Reviewed `SkillsPanel.tsx` and `Timeline.tsx` components for visual hierarchy, accessibility, responsiveness, content clarity, and interaction behavior.
- Overall: strong visual identity (manga panel motif) and clear data structure; improvements here will increase clarity, accessibility, and mobile usability.

## Key findings

- Visual style is distinctive and consistent, using panel accents, halftone patterns and bold headers.
- Information density is moderate but some elements (stat bars, badges, timeline items) can overwhelm mobile users.
- Animations were removed for debugging — when present they likely add delight but must respect reduced-motion and performance constraints.
- Accessibility: color contrast, keyboard navigation, and ARIA semantics are not explicit in the components.

## Recommendations (high level)

- Improve information hierarchy: make primary actions/content visually dominant and secondary metadata subtler.
- Add accessibility attributes and keyboard focus states for interactive elements (tool badges, timeline markers).
- Make motion optional: respect `prefers-reduced-motion` and provide non-animated fallbacks.
- Optimize mobile layouts: collapse or simplify stat-bars and badge groups for narrow viewports.
- Clarify metadata: use consistent date formatting and optional short summaries for timeline entries.

## SkillsPanel — Specific suggestions

- Prioritize name + proficiency: place skill name and numeric level in a single clear row, with the bar underneath.
- Bar affordance and readability:
  - Add a visible label inside the filled portion (e.g., "82%") when width permits; else show on hover/focus.
  - Ensure the bar's filled/empty contrast meets WCAG (>=4.5:1 for text; consider 3:1 for purely decorative backgrounds).
- Grouping and filtering:
  - Offer an optional category filter or tabs (e.g., Frontend, Backend, Design) to reduce cognitive load.
  - Allow collapsing categories on mobile.
- Tool badges:
  - Make badges keyboard-focusable (`tabindex=0`) and expose `aria-label` with role `button` if clickable.
  - Consider adding small logos/icons to badges for faster scanning, keeping consistent sizing.
- Microcopy and labels:
  - Replace "Skills & Abilities" with a more specific header if space allows (e.g., "Technical Skills & Tools").

## Timeline — Specific suggestions

- Date formatting & sorting:
  - Keep chronological order but offer a toggle to view newest-first for recruiters.
  - Use consistent human-readable dates (e.g., "Mar 2024" or "Mar 2024 — Present").
- Readability:
  - Shorten descriptions to 1–2 lines with a "read more" expansion for longer content.
  - Ensure the title and date are the most prominent items; metadata (org/location) should be lower-contrast.
- Visual markers & landmarks:
  - Provide ARIA roles (e.g., `role="list"` / `role="listitem"`) and `aria-label` for the timeline container.
  - Make timeline markers focusable and add `aria-describedby` linking to the event content.
- Mobile simplification:
  - Use stacked cards on mobile but keep flashback affordance subtle (e.g., lighter tint + caption).
  - Hide decorative corner accents on very small screens to save space.

## Accessibility

- Contrast: audit all text vs background combinations (badges, halftone overlays, stat text).
- Keyboard navigation: ensure badges, timeline markers, and any interactive stat elements are reachable with keyboard and have visible focus rings.
- Screen readers: add semantic HTML and ARIA where appropriate; announce event date/type succinctly (e.g., "Mar 2024, Work — Title").
- Motion: respect `prefers-reduced-motion` and avoid long-running or paralax animations that shift layout.

## Interactions & Motion

- Use subtle, short animations (<200ms) for bar fills and badges; keep easing gentle.
- Provide purely CSS-based transitions where possible for performance.
- Add a setting or query parameter to disable animations site-wide for testing and accessibility.

## Content & Copy

- Skills:
  - Standardize levels (e.g., Beginner / Intermediate / Advanced / Expert) in addition to numeric scores for quick scanning.
  - Optionally offer brief context per skill (where/when used) in hover or collapsed detail.
- Timeline:
  - Use one-sentence descriptions; reserve longer paragraphs for a dedicated detail view or modal.
  - Add consistent organization name formatting and optional links to projects or companies.

## Performance & Implementation

- Lazy-render offscreen timeline events and tool badges with virtualization if lists grow long.
- Prefer CSS for decorative patterns (halftone) and avoid rendering heavy SVG filters on many items.
- Defer non-critical images/icons and use modern formats (WebP) in `public/`.

## Testing & Metrics

- Run an accessibility audit (Lighthouse / axe) focusing on contrast and keyboard access.
- Perform a lightweight usability test: ask 5 users to find a specific skill and a timeline event within 30s.
- Track interaction metrics: badge clicks, "read more" expansions, and filter usage.

## Proposed next steps

1. Implement accessibility fixes (ARIA, keyboard focus, contrast) as high priority.
2. Add mobile-friendly collapsible category UI and a simple category filter for `SkillsPanel`.
3. Limit timeline descriptions to 1–2 lines with an expandable detail view.
4. Add `prefers-reduced-motion` support and test animations at multiple device sizes.

If you want, I can open a PR with incremental UI changes: accessibility first, then mobile layout refinements.
