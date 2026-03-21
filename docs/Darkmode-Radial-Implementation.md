---
title: Dark Mode with Radial Reveal Animation
---

**Overview**

This document explains how to add a class-based dark mode and a radial reveal animation to the existing Next.js/Tailwind project. It includes a concise analysis of where to integrate changes and copy-paste-ready snippets for `tailwind.config.ts`, `styles/globals.css`, a `ThemeToggle` React component, and minimal `app/layout.tsx` modifications.

**Analysis**

- **Styling system**: This project uses Tailwind (see `tailwind.config.ts`) and a global stylesheet at `styles/globals.css`.
- **Root layout**: The app root layout is `app/layout.tsx` which is the correct place to add the theme overlay and initial theme logic.

**Goals**

- Enable class-based dark mode (`dark` on `html`/`documentElement`).
- Use CSS variables for color tokens so transitions are smooth.
- Add a transient radial reveal overlay that animates from the click/tap point when toggling theme.
- Provide a small `ThemeToggle` component and integration notes for `app/layout.tsx`.

**1) Tailwind config**

Add `darkMode: 'class'` and extend keyframes/animation for the radial reveal. In `tailwind.config.ts` update or add the following inside the exported config:

```ts
// tailwind.config.ts (snippet)
export default defineConfig({
  // ...existing config
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "radial-reveal": {
          "0%": {
            "clip-path": "circle(0% at var(--x, 50%) var(--y, 50%))",
            opacity: "0",
          },
          "100%": {
            "clip-path": "circle(150% at var(--x, 50%) var(--y, 50%))",
            opacity: "1",
          },
        },
      },
      animation: {
        "radial-reveal":
          "radial-reveal 600ms cubic-bezier(.2,.8,.2,1) forwards",
      },
    },
  },
});
```

**2) Global CSS**

Use CSS variables for colors and add the theme overlay + animation. Add these rules to `styles/globals.css` (merge with existing rules):

```css
:root {
  --bg: 255 255 255; /* light background rgb parts */
  --text: 17 24 39; /* light text rgb parts */
}
.dark {
  --bg: 17 24 39; /* dark background */
  --text: 255 255 255; /* dark text */
}

html,
body {
  background-color: rgb(var(--bg));
  color: rgb(var(--text));
  transition:
    background-color 300ms,
    color 300ms;
}

/* theme overlay positioned above content, used for radial reveal */
.theme-radial {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}
.theme-radial::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(0, 0, 0, 0.12),
    transparent 40%
  );
  opacity: 0;
}

/* When switching theme we show and animate the overlay */
body.theme-switching .theme-radial::before {
  opacity: 1;
  animation: radial-reveal 600ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* optional: reduce motion respects */
@media (prefers-reduced-motion: reduce) {
  :root,
  .theme-radial::before {
    transition: none;
    animation: none !important;
  }
}
```

Notes:

- We store color channels (RGB parts) in variables to allow smooth transitions via `rgb(var(--bg))`.
- The overlay uses CSS custom properties `--x` and `--y` that will be set from JavaScript to define the origin of the radial.

**3) ThemeToggle React component**

Create a small client component `components/ThemeToggle.tsx` (or place an equivalent in your components folder). It toggles the `dark` class on `document.documentElement`, saves the preference in `localStorage`, and triggers the radial animation by toggling `body.theme-switching` and setting `--x`/`--y` based on click coordinates.

```tsx
"use client";
import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.theme === "dark")
      document.documentElement.classList.add("dark");
  }, []);

  const toggle = (e?: React.MouseEvent) => {
    const root = document.documentElement;
    const newDark = !root.classList.contains("dark");
    root.classList.toggle("dark", newDark);
    localStorage.theme = newDark ? "dark" : "light";

    const body = document.body;
    if (e) {
      const rect = body.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      body.style.setProperty("--x", `${x}px`);
      body.style.setProperty("--y", `${y}px`);
    } else {
      body.style.setProperty("--x", "50%");
      body.style.setProperty("--y", "50%");
    }

    body.classList.add("theme-switching");
    window.setTimeout(() => body.classList.remove("theme-switching"), 700);
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
      Toggle
    </button>
  );
}
```

Usage: import and render `<ThemeToggle />` wherever you want the control (navigation, header, etc.). When a user clicks, the radial animation originates from the click point.

**4) Integrate into `app/layout.tsx`**

Open `app/layout.tsx` and:

- Ensure you render the overlay element once near the top-level (inside `<body>`):

```tsx
{
  /* inside your layout's body markup */
}
<div className="theme-radial" aria-hidden />;
```

- If you need to set initial theme server-side, prefer using a small inline script that reads `localStorage.theme` and toggles `class="dark"` on the `html` element before React hydrates (optional advanced step). Otherwise the `useEffect` in `ThemeToggle` handles client-side hydration.

**5) Accessibility and preferences**

- Respect `prefers-color-scheme` if you want to default to the OS preference on first load. Example detection (only if no `localStorage.theme` set):

```ts
if (!localStorage.theme) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList.add("dark");
}
```

- Provide an accessible label and state on the toggle and ensure contrast remains sufficient for both themes.

**6) Summary & Next steps**

- Add the Tailwind config changes to `tailwind.config.ts`.
- Merge the CSS into `styles/globals.css`.
- Add `components/ThemeToggle.tsx` and import it in your header/navigation.
- Add the overlay `<div className="theme-radial" />` to `app/layout.tsx`.

If you want, I can now:

- Apply these edits directly to `styles/globals.css`, `tailwind.config.ts`, and add the `ThemeToggle` + layout changes, or
- Create the `components/ThemeToggle.tsx` file and update `app/layout.tsx` for you.

---

End of implementation guide.
