import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** WCAG relative luminance for a hex color string (#rrggbb). */
function luminance(hex: string): number {
  const h = hex.replace('#', '')
  if (h.length !== 6) return 0
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  const r = toLinear(parseInt(h.slice(0, 2), 16) / 255)
  const g = toLinear(parseInt(h.slice(2, 4), 16) / 255)
  const b = toLinear(parseInt(h.slice(4, 6), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Returns '#fafafa' (white) or '#09090b' (black) — whichever has higher
 * contrast ratio against the given hex background color.
 */
export function contrastColor(hex: string): string {
  return luminance(hex) > 0.179 ? '#09090b' : '#fafafa'
}

/**
 * Maps well-known Tailwind bg class names to their approximate hex values
 * so contrast can be computed even without a hex picker selection.
 * Returns undefined for unknown classes.
 */
const BG_CLASS_MAP: Record<string, string> = {
  // Theme tokens — resolved to LIGHT mode values by default
  // When isDark=true, the dark: variant lookup runs first (see autoTextColor)
  'bg-background':      '#ffffff',
  'bg-card':            '#ffffff',
  'bg-popover':         '#ffffff',
  'bg-primary':         '#3b82f6',
  'bg-secondary':       '#f0f4f8',
  'bg-muted':           '#f4f7fa',
  'bg-accent':          '#eff6ff',
  // Zinc scale
  'bg-zinc-950':        '#09090b',
  'bg-zinc-900':        '#18181b',
  'bg-zinc-800':        '#27272a',
  'bg-zinc-700':        '#3f3f46',
  'bg-zinc-600':        '#52525b',
  'bg-zinc-500':        '#71717a',
  'bg-zinc-400':        '#a1a1aa',
  'bg-zinc-300':        '#d4d4d8',
  'bg-zinc-200':        '#e4e4e7',
  'bg-zinc-100':        '#f4f4f5',
  'bg-zinc-50':         '#fafafa',
  // Slate scale
  'bg-slate-950':       '#020617',
  'bg-slate-900':       '#0f172a',
  'bg-slate-800':       '#1e293b',
  'bg-slate-700':       '#334155',
  'bg-slate-600':       '#475569',
  'bg-slate-200':       '#e2e8f0',
  'bg-slate-100':       '#f1f5f9',
  'bg-slate-50':        '#f8fafc',
  // Neutral
  'bg-white':           '#ffffff',
  'bg-black':           '#000000',
  'bg-neutral-900':     '#171717',
  'bg-neutral-800':     '#262626',
  'bg-blue-600':        '#2563eb',
  'bg-blue-500':        '#3b82f6',
  'bg-indigo-600':      '#4f46e5',
  'bg-violet-600':      '#7c3aed',
  'bg-purple-600':      '#9333ea',
  'bg-pink-600':        '#db2777',
  'bg-red-600':         '#dc2626',
  'bg-orange-500':      '#f97316',
  'bg-yellow-400':      '#facc15',
  'bg-green-600':       '#16a34a',
  'bg-emerald-600':     '#059669',
  'bg-teal-600':        '#0d9488',
  'bg-cyan-500':        '#06b6d4',
}

/**
 * Given a GridItem bg value (hex string or Tailwind class string),
 * returns the best foreground color (black or white).
 *
 * Pass isDark=true to resolve dark: variant classes first.
 */
export function autoTextColor(bg: string, isDark = false): string | undefined {
  // Hex color — always unambiguous
  if (bg.startsWith('#')) return contrastColor(bg)

  const tokens = bg.split(/\s+/)

  // In dark mode, prefer dark:bg-* variant
  if (isDark) {
    const darkToken = tokens.find(t => t.startsWith('dark:bg-'))
    if (darkToken) {
      const base = darkToken.replace('dark:', '')       // e.g. "bg-zinc-900"
      const hex = BG_CLASS_MAP[base]
      if (hex) return contrastColor(hex)
    }
  }

  // Fall back to the first plain bg-* token
  const token = tokens.find(t => t.startsWith('bg-') && !t.startsWith('bg-['))
  if (!token) return undefined
  const hex = BG_CLASS_MAP[token]
  return hex ? contrastColor(hex) : undefined
}
