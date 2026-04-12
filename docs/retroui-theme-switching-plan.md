# RetroUI Theme Switching Plan (Light Default)

This document outlines how to add light/dark mode switching to this repo using the RetroUI `Switch` component, with **light mode as the default**.

Reference:

- https://www.retroui.dev/docs/components/switch

## Goal

- Add a user-controlled theme toggle (light/dark) in the top navigation
- Keep light theme as the initial default for all users
- Persist the selected theme across reloads
- Reuse existing CSS variable system in `styles/globals.css`

## Files To Add

- `components/retroui/Switch.tsx` (generated via RetroUI CLI)
- `components/theme/ThemeProvider.tsx`
- `components/theme/ThemeSwitch.tsx`

## Files To Update

- `app/layout.tsx`
- `components/layout/Navigation.tsx`
- `styles/globals.css`

## 1. Install Dependencies

Run from project root:

```bash
pnpm dlx shadcn@latest add @retroui/switch
npm install next-themes
```

Notes:

- The CLI command adds the RetroUI switch component into the codebase.
- `next-themes` handles class-based theme switching and persistence.

## 2. Add Theme Provider

Create `components/theme/ThemeProvider.tsx`:

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

Why:

- Keeps theme logic isolated and reusable.
- Lets root layout remain simple.

## 3. Wire Provider In Root Layout

Update `app/layout.tsx`:

1. Add `suppressHydrationWarning` on `<html>`.
2. Wrap current app body content with `ThemeProvider`.
3. Set `defaultTheme="light"` and `enableSystem={false}`.

Example:

```tsx
import { ThemeProvider } from "@/components/theme/ThemeProvider";

<html
  lang="en"
  suppressHydrationWarning
  className={`${bebasNeue.variable} ${inter.variable}`}
>
  <body className="antialiased font-body bg-background text-foreground">
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {/* existing content */}
    </ThemeProvider>
  </body>
</html>;
```

Important:

- Replace hardcoded `bg-manga-white text-manga-black` on `<body>` with `bg-background text-foreground` so theme variables can work.

## 4. Create Theme Toggle With RetroUI Switch

Create `components/theme/ThemeSwitch.tsx`:

```tsx
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/retroui/Switch";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-14" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <label className="inline-flex items-center gap-2" htmlFor="theme-toggle">
      <span className="font-heading text-xs uppercase tracking-wider">
        Dark
      </span>
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
    </label>
  );
}
```

Why this pattern:

- Uses controlled state from `next-themes`.
- Avoids hydration mismatch by rendering after mount.
- Keeps light as default unless user explicitly enables dark.

## 5. Place Toggle In Navigation

Update `components/layout/Navigation.tsx`:

1. Import `ThemeSwitch`.
2. Render it in desktop nav row (right side).
3. Render it in mobile menu block.

Example placements:

- Desktop: near nav links (`hidden md:flex ...` container)
- Mobile: append under mobile links (`md:hidden` menu section)

Keep classes aligned with manga style (borders, uppercase labels, contrast).

## 6. Make Existing Color Tokens Theme-Aware

Current theme class toggling will work for `bg-background` / `text-foreground`, but many existing components rely on manga variables (`--color-manga-white`, `--color-manga-black`, etc.).

In `styles/globals.css`:

1. Keep current light values in `:root`.
2. Override manga variables inside `.dark` so existing utility classes adapt.

Suggested additions inside `.dark`:

```css
.dark {
  --color-manga-white: #0f0f0f;
  --color-manga-black: #f5f5f5;
  --color-manga-gray-50: #1a1a1a;
  --color-manga-gray-200: #2b2b2b;
  --color-manga-gray-400: #8f8f8f;
  --color-manga-gray-600: #b3b3b3;
  --color-manga-gray-800: #e0e0e0;
  --color-manga-gray-900: #f5f5f5;
}
```

And update base body styles to use semantic variables:

```css
body {
  background-color: var(--background);
  color: var(--foreground);
}
```

## 7. QA Checklist

- [ ] First load defaults to light mode
- [ ] Toggle switches between light and dark instantly
- [ ] Theme persists after refresh
- [ ] No hydration warnings in console
- [ ] Navigation and panel contrast are readable in both themes
- [ ] Mobile menu toggle works and remains accessible via keyboard

## 8. Test Recommendations

- Add unit test for `ThemeSwitch`:
  - toggles checked state
  - calls theme setter with `dark`/`light`
- Add smoke test for navigation rendering with switch present
- Add visual/manual pass for key pages (`/`, `/about`, `/projects`, `/contact`)

## Rollout Order

1. Install switch + `next-themes`
2. Add provider and wire root layout
3. Add `ThemeSwitch` and mount in navigation
4. Add `.dark` manga variable overrides
5. Run tests and manual QA
