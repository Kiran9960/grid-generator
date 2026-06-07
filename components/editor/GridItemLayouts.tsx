"use client"

import { GridItem, GridItemLayout } from "@/store/useGridStore"
import { cn } from "@/lib/utils"
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"

// ── Layout thumbnail icons (SVG) for the picker ──────────────────────────────

export const LAYOUT_OPTIONS: {
  id: GridItemLayout
  label: string
  icon: React.ReactNode
}[] = [
  {
    id: 'text',
    label: 'Text',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="4" y="6" width="22" height="3" rx="1.5" opacity=".9" />
        <rect x="4" y="12" width="32" height="2" rx="1" opacity=".4" />
        <rect x="4" y="17" width="28" height="2" rx="1" opacity=".4" />
        <rect x="4" y="22" width="18" height="2" rx="1" opacity=".3" />
      </svg>
    ),
  },
  {
    id: 'hero',
    label: 'Hero + CTA',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="4" y="4" width="28" height="5" rx="2" opacity=".9" />
        <rect x="4" y="12" width="22" height="2" rx="1" opacity=".4" />
        <rect x="4" y="16" width="18" height="2" rx="1" opacity=".3" />
        <rect x="4" y="22" width="10" height="4" rx="2" opacity=".8" />
        <rect x="16" y="22" width="10" height="4" rx="2" opacity=".3" />
      </svg>
    ),
  },
  {
    id: 'stat',
    label: 'Stat',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="4" y="4" width="14" height="2" rx="1" opacity=".4" />
        <rect x="4" y="9" width="24" height="9" rx="2" opacity=".9" />
        <rect x="4" y="21" width="12" height="2" rx="1" opacity=".4" />
        <rect x="18" y="21" width="8" height="2" rx="1" opacity=".25" />
      </svg>
    ),
  },
  {
    id: 'feature',
    label: 'Feature',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="4" y="5" width="7" height="7" rx="2" opacity=".7" />
        <rect x="4" y="16" width="20" height="3" rx="1.5" opacity=".9" />
        <rect x="4" y="22" width="30" height="2" rx="1" opacity=".4" />
      </svg>
    ),
  },
  {
    id: 'image-full',
    label: 'Image Only',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="2" y="2" width="36" height="26" rx="2" opacity=".25" />
        <rect x="2" y="2" width="36" height="26" rx="2" opacity=".15" />
        <path d="M14 10 L20 18 L24 14 L30 22 H10 Z" opacity=".4" />
        <circle cx="27" cy="11" r="3" opacity=".4" />
      </svg>
    ),
  },
  {
    id: 'image-top',
    label: 'Image Top',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="2" y="2" width="36" height="14" rx="2" opacity=".3" />
        <path d="M12 6 L18 14 H10 Z M22 8 L28 14 H18 Z" opacity=".4" />
        <rect x="4" y="19" width="20" height="2.5" rx="1.2" opacity=".9" />
        <rect x="4" y="24" width="28" height="2" rx="1" opacity=".35" />
      </svg>
    ),
  },
  {
    id: 'image-bottom',
    label: 'Image Bottom',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="4" y="3" width="20" height="2.5" rx="1.2" opacity=".9" />
        <rect x="4" y="8" width="28" height="2" rx="1" opacity=".35" />
        <rect x="2" y="14" width="36" height="14" rx="2" opacity=".3" />
        <path d="M12 18 L18 26 H10 Z M22 20 L28 26 H18 Z" opacity=".4" />
      </svg>
    ),
  },
  {
    id: 'image-left',
    label: 'Image Left',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="2" y="2" width="16" height="26" rx="2" opacity=".3" />
        <path d="M7 8 L12 16 L15 12 L18 17 H4 Z" opacity=".4" />
        <rect x="22" y="7" width="14" height="2.5" rx="1.2" opacity=".9" />
        <rect x="22" y="13" width="16" height="2" rx="1" opacity=".4" />
        <rect x="22" y="18" width="12" height="2" rx="1" opacity=".3" />
      </svg>
    ),
  },
  {
    id: 'image-right',
    label: 'Image Right',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="22" y="2" width="16" height="26" rx="2" opacity=".3" />
        <path d="M27 8 L32 16 L35 12 L38 17 H24 Z" opacity=".4" />
        <rect x="4" y="7" width="14" height="2.5" rx="1.2" opacity=".9" />
        <rect x="4" y="13" width="16" height="2" rx="1" opacity=".4" />
        <rect x="4" y="18" width="12" height="2" rx="1" opacity=".3" />
      </svg>
    ),
  },
  {
    id: 'image-overlay',
    label: 'Image + Overlay',
    icon: (
      <svg viewBox="0 0 40 30" fill="currentColor" className="w-full h-full">
        <rect x="2" y="2" width="36" height="26" rx="2" opacity=".25" />
        <path d="M10 8 L16 16 L20 12 L26 20 H8 Z" opacity=".3" />
        <rect x="4" y="17" width="20" height="3" rx="1.5" opacity=".9" />
        <rect x="4" y="23" width="26" height="2" rx="1" opacity=".6" />
      </svg>
    ),
  },
]

// ── Individual layout renderers ───────────────────────────────────────────────

// Apple Dynamic Type scale (pt → px, 1:1 for screen)
// Large Title 34/41 · Title1 28/34 · Title2 22/28 · Title3 20/25
// Headline 17/22 semibold · Body 17/22 · Callout 16/21 · Subhead 15/20
// Footnote 13/18 · Caption1 12/16 · Caption2 11/13

// Secondary text opacity: 75% minimum to pass WCAG AA on colored/dark backgrounds.
// opacity-60 on vivid blue (#0A84FF) → ~2.7:1 (fail). opacity-75 → ~3.5:1 (AA for large text).
// For small body text on colored bg, 80%+ is required for AA compliance.

function TextLayout({ item }: { item: GridItem }) {
  return (
    <div className="flex flex-col h-full min-h-0 justify-center overflow-hidden gap-2">
      {item.content.badge && (
        <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-current/10 border border-current/20 opacity-80 shrink-0">
          {item.content.badge}
        </span>
      )}
      {item.content.title && (
        <h3 className="font-bold tracking-[-0.3px] leading-[1.2] shrink-0
          text-[18px] @min-[240px]:text-[20px] @min-[320px]:text-[22px] @min-[440px]:text-[28px] @min-[600px]:text-[34px]">
          {item.content.title}
        </h3>
      )}
      {item.content.description && (
        <p className="opacity-75 leading-[1.4] min-h-0 wrap-break-word
          text-[13px] @min-[240px]:text-[14px] @min-[320px]:text-[15px] @min-[440px]:text-[17px]">
          {item.content.description}
        </p>
      )}
    </div>
  )
}

function HeroLayout({ item }: { item: GridItem }) {
  return (
    <div className="flex flex-col h-full min-h-0 justify-center gap-2 @min-[300px]:gap-3 overflow-hidden">
      {item.content.badge && (
        <span className="inline-flex self-start items-center px-2.5 py-1 @min-[300px]:px-3 rounded-full text-[11px] font-semibold tracking-wide bg-current/10 border border-current/20 opacity-80 shrink-0">
          {item.content.badge}
        </span>
      )}
      {item.content.title && (
        <h2 className="font-bold tracking-[-0.5px] leading-[1.2] line-clamp-3 shrink-0
          text-[20px] @min-[280px]:text-[24px] @min-[400px]:text-[30px] @min-[560px]:text-[38px] @min-[760px]:text-[46px]">
          {item.content.title}
        </h2>
      )}
      {item.content.description && (
        <p className="opacity-80 leading-[1.4] wrap-break-word line-clamp-2 @min-[300px]:line-clamp-3 min-h-0 shrink
          text-[13px] @min-[300px]:text-[14px] @min-[440px]:text-[16px] @min-[560px]:text-[17px]">
          {item.content.description}
        </p>
      )}
      {(item.content.ctaText || item.content.ctaSecondaryText) && (
        <div className="flex flex-col @min-[260px]:flex-row flex-wrap items-start @min-[260px]:items-center gap-2 @min-[300px]:gap-3 shrink-0 mt-1">
          {item.content.ctaText && (
            <button className="inline-flex items-center gap-2 px-4 @min-[300px]:px-5 min-h-[40px] @min-[300px]:min-h-[44px] rounded-full bg-white text-black text-[13px] @min-[300px]:text-[15px] font-semibold cursor-pointer hover:bg-white/90 active:scale-[0.97] transition-all duration-150 whitespace-nowrap shadow-sm">
              {item.content.ctaText}
              <ArrowRight size={13} />
            </button>
          )}
          {item.content.ctaSecondaryText && (
            <button className="inline-flex items-center gap-2 px-4 @min-[300px]:px-5 min-h-[40px] @min-[300px]:min-h-[44px] rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[13px] @min-[300px]:text-[15px] font-medium cursor-pointer hover:bg-white/22 active:scale-[0.97] transition-all duration-150 whitespace-nowrap">
              {item.content.ctaSecondaryText}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function StatLayout({ item }: { item: GridItem }) {
  const isPositive = !item.content.statTrend?.startsWith('-')
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {item.content.statLabel && (
        <p className="text-[11px] @min-[200px]:text-[12px] font-semibold opacity-70 mb-1.5 truncate shrink-0 leading-[16px] tracking-[0.01em]">
          {item.content.statLabel}
        </p>
      )}
      <p className="font-bold tabular-nums tracking-tight leading-[0.9] flex-1 flex items-center overflow-visible
        text-[26px] @min-[220px]:text-[32px] @min-[360px]:text-[44px] @min-[520px]:text-[56px] @min-[800px]:text-[68px]">
        <span className="truncate">{item.content.stat || item.content.title}</span>
      </p>
      <div className="flex items-center justify-between gap-2 mt-2 shrink-0">
        {item.content.description && (
          <p className="text-[11px] @min-[200px]:text-[12px] @min-[280px]:text-[13px] opacity-70 truncate leading-[16px]">
            {item.content.description}
          </p>
        )}
        {item.content.statTrend && (
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] @min-[200px]:text-[11px] font-semibold shrink-0",
            isPositive ? "bg-[#30D158]/20 text-[#30D158]" : "bg-[#FF453A]/20 text-[#FF453A]"
          )}>
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {item.content.statTrend}
          </span>
        )}
      </div>
    </div>
  )
}

function FeatureLayout({ item }: { item: GridItem }) {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden justify-center gap-1.5 @min-[200px]:gap-2 @min-[280px]:gap-3">
      <div className="w-7 h-7 @min-[160px]:w-8 @min-[160px]:h-8 @min-[260px]:w-10 @min-[260px]:h-10 @min-[360px]:w-12 @min-[360px]:h-12 rounded-xl @min-[260px]:rounded-2xl bg-current/10 flex items-center justify-center shrink-0">
        <span className="text-sm @min-[160px]:text-base @min-[260px]:text-lg @min-[360px]:text-xl select-none leading-none">
          {item.content.icon || '✦'}
        </span>
      </div>
      <div className="flex flex-col gap-1 min-h-0 overflow-hidden">
        {item.content.title && (
          <h3 className="font-semibold tracking-[-0.2px] leading-tight line-clamp-3 shrink-0
            text-[13px] @min-[140px]:text-[14px] @min-[200px]:text-[16px] @min-[280px]:text-[18px] @min-[360px]:text-[20px] @min-[440px]:text-[22px]">
            {item.content.title}
          </h3>
        )}
        {item.content.description && (
          <p className="opacity-75 leading-[1.4] wrap-break-word line-clamp-3
            text-[11px] @min-[140px]:text-[12px] @min-[220px]:text-[13px] @min-[320px]:text-[15px] @min-[440px]:text-[17px]">
            {item.content.description}
          </p>
        )}
      </div>
    </div>
  )
}

function ImageFullLayout({ item }: { item: GridItem }) {
  const src = item.content.image || PLACEHOLDER_IMAGE
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${src})` }}
    />
  )
}

// Badge used in image-adjacent text sections — adapts to current text color
function CardBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-current/10 border border-current/20 opacity-80 mb-2">
      {label}
    </span>
  )
}

function ImageTopLayout({ item }: { item: GridItem }) {
  const src = item.content.image || PLACEHOLDER_IMAGE
  return (
    <div className="flex flex-col h-full min-h-0">
      <div
        className="bg-cover bg-center shrink-0"
        style={{ backgroundImage: `url(${src})`, flex: '0 0 55%', minHeight: 80 }}
      />
      <div className="flex-1 flex flex-col justify-center px-4 @min-[280px]:px-6 py-3 @min-[280px]:py-4 overflow-hidden">
        {item.content.badge && <CardBadge label={item.content.badge} />}
        <h3 className="font-semibold tracking-[-0.2px] leading-tight mb-1 @min-[280px]:mb-1.5 line-clamp-2
          text-[15px] @min-[240px]:text-[17px] @min-[360px]:text-[20px]">
          {item.content.title}
        </h3>
        {item.content.description && (
          <p className="opacity-75 text-[12px] @min-[200px]:text-[13px] @min-[300px]:text-[15px] line-clamp-2 leading-[1.4]">
            {item.content.description}
          </p>
        )}
      </div>
    </div>
  )
}

function ImageBottomLayout({ item }: { item: GridItem }) {
  const src = item.content.image || PLACEHOLDER_IMAGE
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 flex flex-col justify-center px-4 @min-[280px]:px-6 py-3 @min-[280px]:py-4 overflow-hidden">
        {item.content.badge && <CardBadge label={item.content.badge} />}
        <h3 className="font-semibold tracking-[-0.2px] leading-tight mb-1 @min-[280px]:mb-1.5 line-clamp-2
          text-[15px] @min-[240px]:text-[17px] @min-[360px]:text-[20px]">
          {item.content.title}
        </h3>
        {item.content.description && (
          <p className="opacity-75 text-[12px] @min-[200px]:text-[13px] @min-[300px]:text-[15px] line-clamp-2 leading-[1.4]">
            {item.content.description}
          </p>
        )}
      </div>
      <div
        className="bg-cover bg-center shrink-0"
        style={{ backgroundImage: `url(${src})`, flex: '0 0 55%', minHeight: 80 }}
      />
    </div>
  )
}

function ImageLeftLayout({ item }: { item: GridItem }) {
  const src = item.content.image || PLACEHOLDER_IMAGE
  return (
    <div className="flex h-full min-h-0">
      <div
        className="shrink-0 bg-cover bg-center w-2/5 @min-[360px]:w-2/5 @min-[180px]:w-1/3"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="flex-1 flex flex-col justify-center px-3 @min-[260px]:px-5 py-3 @min-[260px]:py-5 overflow-hidden">
        {item.content.badge && <CardBadge label={item.content.badge} />}
        <h3 className="font-semibold tracking-[-0.2px] leading-tight line-clamp-2 mb-1 @min-[260px]:mb-1.5
          text-[14px] @min-[220px]:text-[16px] @min-[320px]:text-[18px] @min-[440px]:text-[20px]">
          {item.content.title}
        </h3>
        <p className="opacity-75 text-[11px] @min-[200px]:text-[12px] @min-[280px]:text-[13px] @min-[380px]:text-[15px] line-clamp-3 leading-[1.4]">
          {item.content.description}
        </p>
        {item.content.ctaText && (
          <span className="inline-flex self-start items-center gap-1 mt-2 @min-[260px]:mt-3 text-[12px] @min-[260px]:text-[13px] font-semibold text-primary cursor-pointer">
            {item.content.ctaText} <ArrowRight size={11} />
          </span>
        )}
      </div>
    </div>
  )
}

function ImageRightLayout({ item }: { item: GridItem }) {
  const src = item.content.image || PLACEHOLDER_IMAGE
  return (
    <div className="flex h-full min-h-0">
      <div className="flex-1 flex flex-col justify-center px-3 @min-[260px]:px-5 py-3 @min-[260px]:py-5 overflow-hidden">
        {item.content.badge && <CardBadge label={item.content.badge} />}
        <h3 className="font-semibold tracking-[-0.2px] leading-tight line-clamp-2 mb-1 @min-[260px]:mb-1.5
          text-[14px] @min-[220px]:text-[16px] @min-[320px]:text-[18px] @min-[440px]:text-[20px]">
          {item.content.title}
        </h3>
        <p className="opacity-75 text-[11px] @min-[200px]:text-[12px] @min-[280px]:text-[13px] @min-[380px]:text-[15px] line-clamp-3 leading-[1.4]">
          {item.content.description}
        </p>
        {item.content.ctaText && (
          <span className="inline-flex self-start items-center gap-1 mt-2 @min-[260px]:mt-3 text-[12px] @min-[260px]:text-[13px] font-semibold text-primary cursor-pointer">
            {item.content.ctaText} <ArrowRight size={11} />
          </span>
        )}
      </div>
      <div
        className="shrink-0 bg-cover bg-center w-2/5 @min-[360px]:w-2/5 @min-[180px]:w-1/3"
        style={{ backgroundImage: `url(${src})` }}
      />
    </div>
  )
}

function ImageOverlayLayout({ item }: { item: GridItem }) {
  const src = item.content.image || PLACEHOLDER_IMAGE
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 p-4 @min-[320px]:p-6 @min-[480px]:p-8 text-white">
        {item.content.badge && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-md border border-white/25 text-white mb-2 @min-[300px]:mb-3">
            {item.content.badge}
          </span>
        )}
        <h3 className="font-bold tracking-[-0.5px] leading-[1.2] mb-1.5 @min-[300px]:mb-2
          text-[18px] @min-[240px]:text-[22px] @min-[360px]:text-[28px] @min-[540px]:text-[34px]
          drop-shadow-sm">
          {item.content.title}
        </h3>
        {item.content.description && (
          <p className="text-white/80 leading-[1.4] wrap-break-word line-clamp-2
            text-[12px] @min-[240px]:text-[14px] @min-[360px]:text-[15px] @min-[480px]:text-[17px]">
            {item.content.description}
          </p>
        )}
      </div>
    </>
  )
}

// ── Main renderer ─────────────────────────────────────────────────────────────

interface GridItemLayoutRendererProps {
  item: GridItem
  isPaddingless?: boolean
}

export function GridItemLayoutRenderer({ item, isPaddingless }: GridItemLayoutRendererProps) {
  const layout = item.content.layout ?? 'text'

  const isAbsolute = layout === 'image-full' || layout === 'image-overlay'
  const isSideBySide = layout === 'image-left' || layout === 'image-right'

  if (isAbsolute) {
    return (
      <>
        {layout === 'image-full' && <ImageFullLayout item={item} />}
        {layout === 'image-overlay' && <ImageOverlayLayout item={item} />}
      </>
    )
  }

  if (isSideBySide || layout === 'image-top' || layout === 'image-bottom') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {layout === 'image-left' && <ImageLeftLayout item={item} />}
        {layout === 'image-right' && <ImageRightLayout item={item} />}
        {layout === 'image-top' && <ImageTopLayout item={item} />}
        {layout === 'image-bottom' && <ImageBottomLayout item={item} />}
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 flex flex-col relative pointer-events-none">
      {layout === 'text' && <TextLayout item={item} />}
      {layout === 'hero' && <HeroLayout item={item} />}
      {layout === 'stat' && <StatLayout item={item} />}
      {layout === 'feature' && <FeatureLayout item={item} />}
    </div>
  )
}
