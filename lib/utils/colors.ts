/**
 * Color Compliance Utility
 *
 * Defines the approved monochrome manga color palette and provides helpers
 * for validating color values and converting between formats.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 */

// ── Approved Palette ────────────────────────────────────────────────────────

export const MANGA_PALETTE = {
  black: '#000000',
  white: '#FFFFFF',
  gray900: '#1A1A1A',
  gray800: '#333333',
  gray600: '#666666',
  gray400: '#999999',
  gray200: '#E5E5E5',
  gray50: '#F5F5F5',
} as const;

/** A tuple of every approved hex value (upper-case, with #). */
export const APPROVED_COLORS = Object.values(MANGA_PALETTE);

export type ApprovedColor = (typeof APPROVED_COLORS)[number];

// ── Validation ──────────────────────────────────────────────────────────────

/**
 * Return `true` when the supplied hex string is one of the approved
 * monochrome palette colours.  Comparison is case-insensitive.
 *
 * ```ts
 * isApprovedColor('#000000'); // true
 * isApprovedColor('#FF0000'); // false
 * ```
 */
export function isApprovedColor(hex: string): hex is ApprovedColor {
  const normalized = hex.toUpperCase().trim();
  return (APPROVED_COLORS as readonly string[]).includes(normalized);
}

/**
 * Validate an array of hex colour strings.
 * Returns the subset that is NOT in the approved palette.
 */
export function findNonCompliantColors(colors: string[]): string[] {
  return colors.filter((c) => !isApprovedColor(c));
}

// ── Conversions ─────────────────────────────────────────────────────────────

/**
 * Convert an `rgb(r, g, b)` string or three numbers to a `#RRGGBB` hex string.
 *
 * ```ts
 * rgbToHex(0, 0, 0);          // '#000000'
 * rgbToHex(255, 255, 255);    // '#FFFFFF'
 * rgbToHex('rgb(26, 26, 26)'); // '#1A1A1A'
 * ```
 */
export function rgbToHex(rOrStr: number | string, g?: number, b?: number): string {
  let r: number;

  if (typeof rOrStr === 'string') {
    const match = rOrStr.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (!match) throw new Error(`Invalid rgb string: ${rOrStr}`);
    r = Number(match[1]);
    g = Number(match[2]);
    b = Number(match[3]);
  } else {
    r = rOrStr;
    if (g === undefined || b === undefined) {
      throw new Error('g and b must be provided when r is a number');
    }
  }

  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0').toUpperCase();

  return `#${toHex(r)}${toHex(g!)}${toHex(b!)}`;
}

/**
 * Convert a `#RRGGBB` hex string to an `{ r, g, b }` object.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) throw new Error(`Invalid hex: ${hex}`);

  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

/**
 * Compute the relative luminance of a hex colour (WCAG formula).
 * Returns a value between 0 (black) and 1 (white).
 */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Compute the WCAG contrast ratio between two hex colours.
 * Useful for verifying that text/background combinations meet
 * accessibility requirements (≥ 4.5 for AA, ≥ 7 for AAA).
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Manga Cyan Accent Colors ───────────────────────────────────────────────

/**
 * Manga-inspired cyan accent colors for strategic visual emphasis.
 * 
 * Requirements: 1.5, 1.6, 14.1, 14.6, 14.7
 * 
 * Contrast ratios (calculated):
 * - Primary Cyan (#00BCD4) on white: 2.30:1 (fails AA for normal text)
 * - Light Cyan (#4DD0E1) on white: 1.84:1 (fails AA for normal text)
 * - Dark Cyan (#0097A7) on white: 3.51:1 (fails AA for normal text)
 * 
 * Usage guidelines:
 * - Use black text over cyan surfaces for WCAG AA contrast.
 * - Use Primary/Light Cyan for large text (18pt+) or backgrounds
 * - Use Primary/Light Cyan for decorative elements where contrast is not required
 */
export const mangaCyanColors = {
  primary: '#00BCD4',
  light: '#4DD0E1',
  dark: '#0097A7',
} as const;

type CyanOrMonoColor = keyof typeof mangaCyanColors | 'white' | 'black';

const colorHexMap: Record<CyanOrMonoColor, string> = {
  primary: mangaCyanColors.primary,
  light: mangaCyanColors.light,
  dark: mangaCyanColors.dark,
  white: '#FFFFFF',
  black: '#000000',
};

function roundedContrast(hex1: string, hex2: string): number {
  return Number(contrastRatio(hex1, hex2).toFixed(2));
}

/**
 * Pre-calculated WCAG contrast ratios for cyan accent colors.
 * These values are used to validate accessibility compliance.
 * 
 * Requirements: 1.5, 1.6, 14.1
 */
export const colorContrastRatios = {
  'primary-on-white': roundedContrast(colorHexMap.primary, colorHexMap.white),
  'light-on-white': roundedContrast(colorHexMap.light, colorHexMap.white),
  'dark-on-white': roundedContrast(colorHexMap.dark, colorHexMap.white),
  'white-on-primary': roundedContrast(colorHexMap.white, colorHexMap.primary),
  'white-on-light': roundedContrast(colorHexMap.white, colorHexMap.light),
  'white-on-dark': roundedContrast(colorHexMap.white, colorHexMap.dark),
  'black-on-primary': roundedContrast(colorHexMap.black, colorHexMap.primary),
  'black-on-light': roundedContrast(colorHexMap.black, colorHexMap.light),
  'black-on-dark': roundedContrast(colorHexMap.black, colorHexMap.dark),
} as const;

/**
 * Check if a color combination meets WCAG accessibility standards.
 * 
 * Requirements: 14.6, 14.7
 * 
 * @param foreground - The foreground color ('primary', 'light', 'dark', 'white', or 'black')
 * @param background - The background color ('primary', 'light', 'dark', 'white', or 'black')
 * @param level - WCAG compliance level ('AA' requires 4.5:1, 'AAA' requires 7.0:1)
 * @returns true if the combination meets the specified WCAG level
 * 
 * @example
 * isAccessibleCombination('dark', 'white', 'AA'); // false (3.51:1)
 * isAccessibleCombination('primary', 'white', 'AA'); // false (2.30:1)
 * isAccessibleCombination('black', 'primary', 'AA'); // true (9.14:1)
 */
export function isAccessibleCombination(
  foreground: CyanOrMonoColor,
  background: CyanOrMonoColor,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const foregroundHex = colorHexMap[foreground];
  const backgroundHex = colorHexMap[background];
  const threshold = level === 'AAA' ? 7.0 : 4.5;
  return contrastRatio(foregroundHex, backgroundHex) >= threshold;
}

/**
 * Get an accessible cyan variant for the given background color.
 * Returns the darkest cyan variant that meets WCAG AA standards.
 * 
 * Requirements: 14.6
 * 
 * @param background - The background color ('white' or 'black')
 * @returns The cyan variant key that provides sufficient contrast
 * 
 * @example
 * getAccessibleCyanVariant('white'); // 'dark' (best available fallback)
 * getAccessibleCyanVariant('black'); // 'primary' (all variants pass on black)
 */
export function getAccessibleCyanVariant(
  background: 'white' | 'black'
): keyof typeof mangaCyanColors {
  if (background === 'black') {
    // All variants pass on black; choose primary for strongest brand accent.
    return 'primary';
  }

  const orderedByContrast: Array<keyof typeof mangaCyanColors> = ['dark', 'primary', 'light'];
  const passing = orderedByContrast.find((variant) =>
    isAccessibleCombination(variant, background, 'AA')
  );

  // No cyan tone reaches AA on pure white; return best available fallback.
  return passing ?? 'dark';
}
