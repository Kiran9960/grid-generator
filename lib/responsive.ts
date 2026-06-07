/**
 * Fluid grid responsive system.
 *
 * Core idea: every item stores its colSpan as an absolute count against a base
 * column count. When the rendered container is narrower than the design width,
 * we proportionally scale both the column count AND every item's span so the
 * visual ratio is preserved — instead of just capping spans at the new column
 * count (which distorts proportions and causes overflow).
 *
 * Example: 3 items at 4/4/4 in a 12-col grid → at 6 cols they become 2/2/2,
 * not 4/4/4 capped to 6 which would give 6+4+4 (badly wrapped).
 */

// ── Breakpoints ───────────────────────────────────────────────────────────────

// These match common device container widths (not viewport — container-relative).
// Each threshold: if container width < threshold, use colFraction of baseCols.
const BREAKPOINTS = [
  { maxWidth: 400,  colFraction: 0.25, minCols: 1 },  // small mobile
  { maxWidth: 560,  colFraction: 0.33, minCols: 2 },  // mobile
  { maxWidth: 768,  colFraction: 0.50, minCols: 3 },  // large mobile / small tablet
  { maxWidth: 1024, colFraction: 0.67, minCols: 4 },  // tablet
  { maxWidth: 1280, colFraction: 0.83, minCols: 6 },  // small desktop
] as const

/**
 * Given a base column count and a container's rendered pixel width,
 * return the appropriate effective column count.
 */
export function fluidCols(baseCols: number, containerPx: number): number {
  for (const bp of BREAKPOINTS) {
    if (containerPx < bp.maxWidth) {
      return Math.max(bp.minCols, Math.round(baseCols * bp.colFraction))
    }
  }
  return baseCols
}

// ── Preview mode shortcuts ────────────────────────────────────────────────────

export function previewCols(baseCols: number, mode: 'desktop' | 'tablet' | 'mobile'): number {
  if (mode === 'desktop') return baseCols
  if (mode === 'tablet')  return Math.max(1, Math.round(baseCols / 2))   // 12→6
  if (mode === 'mobile')  return Math.max(1, Math.round(baseCols / 3))   // 12→4
  return baseCols
}

// ── Row span scaling ─────────────────────────────────────────────────────────

/**
 * Proportionally scale rowSpan alongside colSpan reduction.
 * A rowSpan=2 item on desktop (12-col) becomes rowSpan=1 on mobile (4-col)
 * because the card is now narrow — spanning multiple rows adds wasted height.
 */
export function responsiveRowSpan(
  rowSpan: number,
  baseCols: number,
  effectiveCols: number,
): number {
  if (effectiveCols >= baseCols || rowSpan <= 1) return rowSpan
  const scale = effectiveCols / baseCols
  return Math.max(1, Math.round(rowSpan * scale))
}

// ── Span scaling ─────────────────────────────────────────────────────────────

// Minimum fraction of effectiveCols an item may occupy, by layout type.
// Prevents items from becoming unreadably narrow on small screens.
const LAYOUT_MIN_FRACTION: Record<string, number> = {
  hero:            1.00,  // always full-width
  stat:            0.20,  // 1-of-5 → 1 col in a 5-col grid; 1 col on mobile (50%)
  feature:         0.20,
  text:            0.20,
  'image-full':    0.25,
  'image-overlay': 0.40,
  'image-top':     0.25,
  'image-bottom':  0.25,
  'image-left':    0.40,  // side-by-side needs enough width for both panels
  'image-right':   0.40,
}

/**
 * Proportionally scale a colSpan from baseCols down to effectiveCols,
 * respecting layout-specific minimum widths.
 *
 * @param colSpan       Original span at baseCols
 * @param baseCols      Column count the span was designed for
 * @param effectiveCols Current column count (smaller than baseCols on narrow containers)
 * @param layout        Item layout type, used for minimum-width constraints
 */
export function responsiveSpan(
  colSpan: number,
  baseCols: number,
  effectiveCols: number,
  layout?: string,
): number {
  // Passthrough when not scaling down
  if (effectiveCols >= baseCols) return Math.min(colSpan, effectiveCols)

  // 100% → always full-width
  if (colSpan >= baseCols || layout === 'hero') return effectiveCols

  // 50% → exactly half (guaranteed, no rounding drift)
  if (colSpan * 2 === baseCols) return Math.max(1, Math.round(effectiveCols / 2))

  // 75% → three-quarters
  if (colSpan * 4 === baseCols * 3) return Math.max(1, Math.round(effectiveCols * 3 / 4))

  // 25% → one-quarter
  if (colSpan * 4 === baseCols) return Math.max(1, Math.round(effectiveCols / 4))

  // All other spans: proportional scaling with layout-aware minimum
  const fraction = colSpan / baseCols
  const scaled = fraction * effectiveCols
  const minFraction = LAYOUT_MIN_FRACTION[layout ?? 'text'] ?? 0.20
  const minSpan = Math.max(1, Math.ceil(effectiveCols * minFraction))

  return Math.max(minSpan, Math.min(effectiveCols, Math.round(scaled)))
}

// ── Responsive padding ───────────────────────────────────────────────────────

/**
 * Maps a stored Tailwind padding class to a container-query responsive scale.
 * The stored value is the ceiling (applied at large containers); smaller
 * containers get proportionally reduced padding via @container breakpoints.
 *
 * Scale logic: each tier starts at ~40% of its max and ramps up.
 * p-5  (20px) → 10px → 14px → 16px → 20px
 * p-6  (24px) → 12px → 16px → 18px → 24px
 * p-8  (32px) → 12px → 16px → 20px → 24px → 32px
 */
const RESPONSIVE_PADDING: Record<string, string> = {
  'p-0':  'p-0',
  'p-2':  'p-1.5 @min-[200px]:p-2',
  'p-3':  'p-2 @min-[200px]:p-2.5 @min-[300px]:p-3',
  'p-4':  'p-2 @min-[160px]:p-2.5 @min-[240px]:p-3 @min-[340px]:p-4',
  'p-5':  'p-2.5 @min-[160px]:p-3 @min-[240px]:p-4 @min-[340px]:p-5',
  'p-6':  'p-3 @min-[160px]:p-3.5 @min-[240px]:p-4 @min-[340px]:p-5 @min-[480px]:p-6',
  'p-8':  'p-3 @min-[160px]:p-4 @min-[240px]:p-5 @min-[340px]:p-6 @min-[480px]:p-8',
  'p-10': 'p-3 @min-[160px]:p-4 @min-[240px]:p-5 @min-[340px]:p-6 @min-[480px]:p-8 @min-[600px]:p-10',
}

export function responsivePadding(paddingClass: string): string {
  return RESPONSIVE_PADDING[paddingClass] ?? RESPONSIVE_PADDING['p-5']
}

// ── CSS export ───────────────────────────────────────────────────────────────

/**
 * Generates copy-paste-ready CSS with @container queries for a responsive grid.
 * Each breakpoint uses proportional spans so the layout scales cleanly.
 */
export function generateResponsiveCss(
  items: Array<{ id: string; colSpan: number; rowSpan?: number; content?: { layout?: string } }>,
  baseCols: number,
  gap: number,
): string {
  const indent = (n: number) => '  '.repeat(n)

  // The breakpoints we export CSS for
  const exportBreakpoints = [
    { label: 'tablet',  maxWidth: 768 },
    { label: 'mobile',  maxWidth: 560 },
  ]

  const baseRules = items.map(item => {
    const span = Math.min(item.colSpan, baseCols)
    const rowSpan = item.rowSpan ?? 1
    return [
      `${indent(1)}.grid-item[data-id="${item.id}"] {`,
      `${indent(2)}grid-column: span ${span};`,
      rowSpan > 1 ? `${indent(2)}grid-row: span ${rowSpan};` : '',
      `${indent(1)}}`,
    ].filter(Boolean).join('\n')
  }).join('\n')

  const bpRules = exportBreakpoints.map(({ label, maxWidth }) => {
    const effectiveCols = fluidCols(baseCols, maxWidth - 1)
    const itemRules = items.map(item => {
      const span = responsiveSpan(
        item.colSpan,
        baseCols,
        effectiveCols,
        item.content?.layout,
      )
      return [
        `${indent(2)}.grid-item[data-id="${item.id}"] {`,
        `${indent(3)}grid-column: span ${span};`,
        `${indent(2)}}`,
      ].join('\n')
    }).join('\n')

    return [
      `${indent(0)}/* ${label}: ${effectiveCols} columns */`,
      `${indent(0)}@container (max-width: ${maxWidth}px) {`,
      `${indent(1)}.grid { grid-template-columns: repeat(${effectiveCols}, minmax(0, 1fr)); }`,
      itemRules,
      `}`,
    ].join('\n')
  }).join('\n\n')

  return [
    `/* Generated responsive grid — paste into your stylesheet */`,
    `.grid {`,
    `${indent(1)}display: grid;`,
    `${indent(1)}grid-template-columns: repeat(${baseCols}, minmax(0, 1fr));`,
    `${indent(1)}gap: ${gap}px;`,
    `${indent(1)}container-type: inline-size;`,
    `}`,
    ``,
    baseRules,
    ``,
    bpRules,
  ].join('\n')
}
