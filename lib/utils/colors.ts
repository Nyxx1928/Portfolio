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
