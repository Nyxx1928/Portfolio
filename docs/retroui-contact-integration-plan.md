# RetroUI Contact Integration Plan

This document is a practical migration plan for replacing selected UI pieces in this repo with RetroUI components, with Contact page as the first implementation target.

Related reference:

- https://www.retroui.dev/docs/components/sonner
- docs/retroui-components-guide.md

## Goal

Upgrade Contact page UI to RetroUI style while preserving existing logic:

- Keep React Hook Form validation and current submit flow
- Replace native form controls with RetroUI `Input`, `Textarea`, and `Button`
- Add stronger feedback UX with RetroUI `Alert` and `Sonner`
- Keep current manga identity, but blend RetroUI interaction patterns (button press animation, cleaner fields, clearer status)

## Current Files To Touch

- `app/contact/page.tsx`
- `components/contact/ContactForm.tsx`
- Optional follow-up polish:
  - `components/contact/ContactIntro.tsx`
  - `components/contact/SocialLinks.tsx`

## Phase 1: Dependencies and Setup

1. Add required RetroUI components.

```bash
pnpm dlx shadcn@latest add @retroui/input
pnpm dlx shadcn@latest add @retroui/textarea
pnpm dlx shadcn@latest add @retroui/button
pnpm dlx shadcn@latest add @retroui/alert
pnpm dlx shadcn@latest add @retroui/sonner
```

2. Ensure global toaster is mounted one time in root layout.

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner";

// inside <body>
<Toaster />;
```

Outcome:

- UI primitives are available in `components/ui/*`
- Toasts can be fired from Contact form submit events

## Phase 2: Contact Form Component Migration

Target file: `components/contact/ContactForm.tsx`

### Step 2.1 Replace Native Inputs

Replace native fields:

- `<input id="name" ... />` -> `<Input id="name" ... />`
- `<input id="email" ... />` -> `<Input id="email" ... />`
- `<input id="subject" ... />` -> `<Input id="subject" ... />`
- `<textarea id="message" ... />` -> `<Textarea id="message" ... />`

Keep:

- Existing `register(...)` validation handlers
- Existing disabled/loading logic
- Existing error text rendering

Suggested class strategy:

- Keep current manga token classes for border/typography
- Add RetroUI-friendly motion classes only where needed

```tsx
className={cn(
  "w-full border-2 border-manga-black bg-manga-white",
  "focus-visible:ring-2 focus-visible:ring-manga-black",
  "transition-transform duration-150",
  "hover:-translate-y-0.5",
  errors.name && "border-manga-gray-600 bg-manga-gray-50"
)}
```

### Step 2.2 Replace Submit Button + Add Retro Press Animation

Replace native submit button with RetroUI `Button` while preserving icon and loading state.

Recommended interaction style:

- Idle: manga shadow
- Hover: slight lift
- Active: pressed state (translate back)

```tsx
<Button
  type="submit"
  disabled={submissionState === "loading"}
  className={cn(
    "w-full md:w-auto px-8 py-4",
    "font-heading text-lg uppercase tracking-wider",
    "shadow-manga transition-transform duration-150",
    "hover:-translate-y-0.5 active:translate-y-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  )}
>
  ...
</Button>
```

### Step 2.3 Convert Success/Error Blocks To Alert + Sonner

Current state uses large custom success/error panels.

Migration recommendation:

- Keep inline message area, but use RetroUI `Alert`, `AlertTitle`, `AlertDescription`
- Fire toast on submit results:
  - success: `toast.success("Message sent!")`
  - error: `toast.error("Failed to send message")`

Benefits:

- Cleaner feedback code
- Better UX for quick status visibility

## Phase 3: Contact Page Composition

Target file: `app/contact/page.tsx`

1. Keep structure unchanged for now (`ContactIntro`, `ContactForm`, `SocialLinks`).
2. After form migration, verify visual consistency.
3. Optional enhancement:
   - Add `Card` wrapper around intro and social sections in a later pass.

Why this approach:

- Keeps blast radius small
- Makes regression testing simpler

## Optional Phase 4: Extra RetroUI Enhancements

Apply if you want deeper RetroUI feel beyond form controls.

1. Add `Dialog` confirm before form submission.
2. Add `Drawer` on mobile for contact method shortcuts.
3. Add `Accordion` FAQ block under ContactForm.
4. Add subtle `Button` variants in Social links for stronger interaction consistency.

## Testing Plan

1. Unit tests to update/create:
   - `components/contact/ContactForm.test.tsx`
2. Confirm scenarios:
   - required-field validation still appears
   - invalid email handling unchanged
   - loading state disables fields and submit
   - success and error feedback render
   - toast appears for success/error outcomes
3. Manual checks:
   - desktop + mobile layout
   - keyboard navigation and focus styles
   - screen reader announcements (`role=status` / `role=alert`)

## Rollout Checklist

- [ ] Install RetroUI packages for Contact scope
- [ ] Confirm `Toaster` mounted in root layout
- [ ] Migrate `Input` fields in ContactForm
- [ ] Migrate `Textarea` in ContactForm
- [ ] Migrate submit `Button` with press animation
- [ ] Integrate `Alert` for inline status blocks
- [ ] Integrate Sonner toast success/error
- [ ] Update tests and pass local test run
- [ ] QA on mobile and desktop

## Suggested Commit Strategy

1. Commit 1: install + toaster setup
2. Commit 2: input/textarea/button migration
3. Commit 3: alert + sonner integration
4. Commit 4: tests and UI polish

This keeps diffs reviewable and easy to rollback if needed.
