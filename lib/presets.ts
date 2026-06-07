import { GridItem } from "@/store/useGridStore"

export interface LayoutPreset {
  id: string
  name: string
  categoryId: string
  columns: number
  gap: number
  rowHeight: number
  items: GridItem[]
}

export const PRESET_CATEGORIES = [
  { id: 'saas',        name: 'SaaS Dashboard',  icon: 'LayoutDashboard' },
  { id: 'portfolio',   name: 'Portfolio',        icon: 'User'            },
  { id: 'social',      name: 'Social Media',     icon: 'LayoutList'      },
  { id: 'ai',          name: 'AI Landing Page',  icon: 'Box'             },
  { id: 'team',        name: 'Team Section',     icon: 'Users'           },
  { id: 'casestudy',   name: 'Case Study',       icon: 'FileText'        },
  { id: 'blog',        name: 'Blog Layout',      icon: 'LayoutTemplate'  },
  { id: 'ecommerce',   name: 'E-Commerce',       icon: 'ShoppingCart'    },
  { id: 'gallery',     name: 'Gallery',          icon: 'Image'           },
  { id: 'productivity',name: 'Productivity',     icon: 'CheckSquare'     },
]

// ─── helpers ────────────────────────────────────────────────────────────────

const R = 'rounded-2xl'
const NB = 'border-none'
const UNS = 'https://images.unsplash.com'

// Apple system colors — dark mode (HIG exact values)
// Backgrounds:  System BG #000000 · Secondary #1C1C1E · Tertiary #2C2C2E · Gray4 #3A3A3C
// Accents:      Blue #0A84FF · Green #30D158 · Indigo #5E5CE6 · Orange #FF9F0A
//               Pink #FF375F · Purple #BF5AF2 · Red #FF453A · Teal #5AC8FA · Yellow #FFD60A
const BLUE    = '#0A84FF'
const GREEN   = '#30D158'
const INDIGO  = '#5E5CE6'
const ORANGE  = '#FF9F0A'
const PINK    = '#FF375F'
const PURPLE  = '#BF5AF2'
const RED     = '#FF453A'
const TEAL    = '#5AC8FA'
const SURFACE = '#1C1C1E'   // secondarySystemBackground
const RAISED  = '#2C2C2E'   // tertiarySystemBackground
const BLACK   = '#000000'   // systemBackground

// Padding scale — all cards use XL (p-10 = 40px) by default
const SM  = 'p-10'
const MD  = 'p-10'
const LG  = 'p-10'
const IMG = 'p-0'   // image-full / image-overlay

function img(id: string) { return `${UNS}/${id}?w=1200&q=85` }

// ─── SaaS Dashboard ──────────────────────────────────────────────────────────
// rowHeight 130 — 1-row stat content area: 130-40=90px (label16+num36+desc22=74 ✓)

const saas1: LayoutPreset = {
  id: 'saas-1', name: 'Analytics Bento', categoryId: 'saas',
  columns: 12, gap: 8, rowHeight: 130,
  items: [
    {
      id: 's1-1', colSpan: 5, rowSpan: 2,
      content: { layout: 'stat', stat: '$2.4M', statLabel: 'Monthly Recurring Revenue', statTrend: '+18.3%', description: 'vs last month across all plans' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-xl', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '12,492', statLabel: 'Active Users', statTrend: '+2,400', description: 'New signups this week' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-3', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '99.9%', statLabel: 'Uptime SLA', statTrend: '+0.1%', description: 'Last 90 days' },
      styles: { bg: GREEN, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-4', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '94.2%', statLabel: 'Retention Rate', statTrend: '+0.8%', description: 'Monthly cohort avg' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-5', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '4.2ms', statLabel: 'Avg Latency', statTrend: '-0.3ms', description: 'p95 response time' },
      styles: { bg: INDIGO, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-6', colSpan: 7, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Revenue Trends', description: 'Q4 showing 18% growth — on track to hit $30M ARR.', image: img('photo-1579546929518-9e396f3cc809') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-7', colSpan: 2, rowSpan: 1,
      content: { layout: 'feature', icon: '↗', title: 'Pro Plan', description: '68% of revenue' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-8', colSpan: 3, rowSpan: 1,
      content: { layout: 'feature', icon: '◈', title: 'Enterprise', description: 'Fastest growing segment' },
      styles: { bg: BLACK, textColor: '', border: 'border-[#0A84FF]/25', shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's1-9', colSpan: 5, rowSpan: 1,
      content: { layout: 'stat', stat: '500k', statLabel: 'API calls/day', description: '' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

const saas2: LayoutPreset = {
  id: 'saas-2', name: 'Product Dashboard', categoryId: 'saas',
  columns: 12, gap: 8, rowHeight: 140,
  items: [
    {
      id: 's2-1', colSpan: 8, rowSpan: 2,
      content: { layout: 'hero', title: 'Build faster.\nShip more.', description: 'The all-in-one platform for modern teams. Deploy in seconds, scale to millions.', ctaText: 'Start free trial', ctaSecondaryText: 'Watch demo', badge: 'New in 2025' },
      styles: { bg: BLACK, textColor: '', border: 'border-[#0A84FF]/25', shadow: 'shadow-2xl', padding: LG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's2-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '10M+', statLabel: 'Developers', statTrend: '+120k', description: 'Active this month' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's2-3', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '99.99%', statLabel: 'Uptime guarantee', description: 'SLA-backed reliability' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's2-4', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '⚡', title: 'Edge Deploy', description: 'Ship to 300+ regions in under 10 seconds with zero config.' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's2-5', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '🔒', title: 'Zero Trust', description: 'Built-in auth, RBAC, and end-to-end encryption out of the box.' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's2-6', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '◎', title: 'Observability', description: 'Real-time logs, traces, and dashboards. No extra setup.' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 's2-7', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '∞', title: 'Unlimited Scale', description: 'Auto-scaling from 1 to 1 billion requests. Pay only for what you use.' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

const portfolio1: LayoutPreset = {
  id: 'portfolio-1', name: 'Creative Bento', categoryId: 'portfolio',
  columns: 12, gap: 8, rowHeight: 140,
  items: [
    {
      id: 'p1-1', colSpan: 6, rowSpan: 2,
      content: { layout: 'hero', title: "Hi, I'm Kiran Pingle", description: 'Product designer crafting delightful digital experiences. 20+ years building at scale.', ctaText: 'View work', ctaSecondaryText: 'Contact me', badge: 'Available for hire' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-xl', padding: LG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p1-2', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Fintech Redesign', description: 'Mobile banking — 2024', image: img('photo-1579546929518-9e396f3cc809') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p1-3', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '40+', statLabel: 'Projects shipped', statTrend: '+12 this year', description: '' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p1-4', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '98%', statLabel: 'Client satisfaction', description: 'Avg across all projects' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p1-5', colSpan: 4, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'AI Dashboard', description: 'SaaS product design', image: img('photo-1558618666-fcd25c85cd64') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p1-6', colSpan: 4, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Brand Identity', description: 'Visual design — 2024', image: img('photo-1541701494587-cb58502866ab') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p1-7', colSpan: 4, rowSpan: 2,
      content: { layout: 'text', title: 'Currently at Acme Inc.', description: 'Leading design for the next-gen developer platform. Previously at Linear, Figma, and Stripe.' },
      styles: { bg: PURPLE, textColor: '', border: NB, shadow: 'shadow-xl', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

const portfolio2: LayoutPreset = {
  id: 'portfolio-2', name: 'Minimal Bio', categoryId: 'portfolio',
  columns: 12, gap: 8, rowHeight: 150,
  items: [
    {
      id: 'p2-1', colSpan: 12, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Sara Kim — UI/UX Designer', description: 'Creating experiences that feel inevitable.', image: img('photo-1532274402911-5a369e4c4bb5') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-2xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p2-2', colSpan: 4, rowSpan: 2,
      content: { layout: 'feature', icon: '✦', title: 'Design Systems', description: 'Building scalable, token-driven systems used by 50+ engineers daily.' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p2-3', colSpan: 4, rowSpan: 2,
      content: { layout: 'feature', icon: '◈', title: 'Interaction Design', description: 'Motion, micro-interactions, and tactile feedback that users fall in love with.' },
      styles: { bg: BLACK, textColor: '', border: 'border-[#5E5CE6]/30', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p2-4', colSpan: 2, rowSpan: 2,
      content: { layout: 'stat', stat: '6+', statLabel: 'Years exp.', description: '' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p2-5', colSpan: 2, rowSpan: 2,
      content: { layout: 'stat', stat: '50+', statLabel: 'Projects', description: '' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'p2-6', colSpan: 12, rowSpan: 1,
      content: { layout: 'hero', title: 'Let\'s build something together.', description: '', ctaText: 'Get in touch', badge: 'Open to work' },
      styles: { bg: GREEN, textColor: '', border: NB, shadow: 'shadow-lg', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Social Media ─────────────────────────────────────────────────────────────
// 4 clean rows, no blank cells:
// Row 0: image(4,2) | Followers(4,1) | Engagement(4,1)
// Row 1: image(cont)| Posts(4,1)     | Impressions(4,1)
// Row 2: hero(4,2)  | Design Tutorials(8,2)
// Row 3: hero(cont) | Design Tutorials(cont)

const social1: LayoutPreset = {
  id: 'social-1', name: 'Creator Profile', categoryId: 'social',
  columns: 12, gap: 8, rowHeight: 130,
  items: [
    {
      id: 'so1-1', colSpan: 4, rowSpan: 2,
      content: { layout: 'image-overlay', title: '@jessdesigns', description: 'Design • Figma • UI Tips', image: img('photo-1557682224-5b8590cd9ec5') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'so1-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '84.2K', statLabel: 'Followers', statTrend: '+2.1K', description: 'This week' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'so1-3', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '6.8%', statLabel: 'Engagement rate', statTrend: '+0.4%', description: '30-day average' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'so1-4', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '1,204', statLabel: 'Posts', description: '5 years of content' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'so1-5', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '2.3M', statLabel: 'Total impressions', description: 'This month' },
      styles: { bg: INDIGO, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'so1-7', colSpan: 4, rowSpan: 2,
      content: { layout: 'hero', title: 'Book a collaboration', description: 'Brand deals and sponsored content open for Q1.', ctaText: 'Contact me', badge: 'Open collab' },
      styles: { bg: BLACK, textColor: '', border: 'border-[#0A84FF]/25', shadow: 'shadow-lg', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'so1-6', colSpan: 8, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Design Tutorials', description: 'My most popular series on Figma auto-layout', image: img('photo-1618005182384-a83a8bd57fbe') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── AI Landing Page ──────────────────────────────────────────────────────────

const ai1: LayoutPreset = {
  id: 'ai-1', name: 'AI Hero Bento', categoryId: 'ai',
  columns: 12, gap: 8, rowHeight: 130,
  items: [
    {
      id: 'ai1-1', colSpan: 8, rowSpan: 2,
      content: { layout: 'hero', title: 'Intelligence, built in.', description: 'Orion AI brings state-of-the-art language models directly into your workflow — no PhD required.', ctaText: 'Start for free', ctaSecondaryText: 'See demo', badge: 'Now in public beta' },
      styles: { bg: BLACK, textColor: '', border: 'border-[#0A84FF]/25', shadow: 'shadow-2xl', padding: LG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ai1-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '10M+', statLabel: 'Prompts per day', statTrend: '+40%', description: 'Processed this month' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ai1-3', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '<100ms', statLabel: 'Response time', description: 'p95 across all regions' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ai1-4', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '✦', title: 'Context Memory', description: 'Remembers your entire codebase, docs, and preferences — permanently.' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ai1-5', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '⚡', title: 'Instant Actions', description: 'Generate, refactor, test, and deploy — all from a single natural language command.' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ai1-6', colSpan: 3, rowSpan: 2,
      content: { layout: 'feature', icon: '◎', title: 'Multi-model', description: 'Switch between GPT-4, Claude 3, Gemini Ultra and local models with one click.' },
      styles: { bg: TEAL, textColor: '', border: NB, shadow: 'shadow-lg', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ai1-7', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Zero data retention', description: 'SOC 2 Type II & GDPR compliant', image: img('photo-1501366062246-723b4d3e4eb5') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Team Section ─────────────────────────────────────────────────────────────

const team1: LayoutPreset = {
  id: 'team-1', name: 'Meet the Team', categoryId: 'team',
  columns: 12, gap: 8, rowHeight: 150,
  items: [
    {
      id: 'tm1-0', colSpan: 12, rowSpan: 2,
      content: { layout: 'hero', title: 'The minds behind the magic.', description: 'A small, focused team obsessed with craft, speed, and user delight.', ctaText: 'We\'re hiring' },
      styles: { bg: BLACK, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: LG, align: 'center', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-1', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Marcus Lee', description: 'CEO & Co-founder', image: img('photo-1532274402911-5a369e4c4bb5') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-2', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Priya Nair', description: 'CTO', image: img('photo-1579546929518-9e396f3cc809') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-3', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Jordan Wells', description: 'Head of Design', image: img('photo-1558618666-fcd25c85cd64') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-4', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'Seo-yeon Park', description: 'Lead Engineer', image: img('photo-1541701494587-cb58502866ab') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-5', colSpan: 6, rowSpan: 1,
      content: { layout: 'text', title: 'Remote-first, globally distributed.', description: 'Our team spans 8 countries and 12 time zones. We ship every week.' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-6', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '12', statLabel: 'Team members', description: 'Across 8 countries' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'tm1-7', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '4.9★', statLabel: 'Glassdoor rating', description: '"Best place I\'ve worked."' },
      styles: { bg: ORANGE, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Case Study ───────────────────────────────────────────────────────────────

const casestudy1: LayoutPreset = {
  id: 'cs-1', name: 'Impact Story', categoryId: 'casestudy',
  columns: 12, gap: 8, rowHeight: 140,
  items: [
    {
      id: 'cs1-1', colSpan: 12, rowSpan: 2,
      content: { layout: 'image-overlay', title: 'How we 3×\'d Luma\'s conversion rate in 60 days.', description: 'A complete redesign of the onboarding funnel — research, ideation, and delivery.', badge: 'Case Study', image: img('photo-1469474968028-56623f02e42e') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-2xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'cs1-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '+312%', statLabel: 'Conversion lift', statTrend: '+312%', description: 'Signup → paid in 14 days' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'cs1-3', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '60 days', statLabel: 'Time to ship', description: 'Research → live in production' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'cs1-4', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '$4.2M', statLabel: 'Revenue impact', statTrend: '+$4.2M', description: 'Annualized ARR increase' },
      styles: { bg: GREEN, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'cs1-5', colSpan: 6, rowSpan: 2,
      content: { layout: 'text', title: 'The Problem', description: 'Users dropped off at step 3 of 5 in onboarding. Surveys revealed cognitive overload and unclear value proposition — users didn\'t understand what they\'d get before paying.' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'cs1-6', colSpan: 6, rowSpan: 2,
      content: { layout: 'text', title: 'The Solution', description: 'We collapsed 5 steps into 2, moved the paywall after the first "aha moment", and added a progress indicator. Personalization engine served role-specific value props on step 1.' },
      styles: { bg: PURPLE, textColor: '', border: NB, shadow: 'shadow-xl', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Blog Layout ──────────────────────────────────────────────────────────────

const blog1: LayoutPreset = {
  id: 'blog-1', name: 'Editorial Hero', categoryId: 'blog',
  columns: 12, gap: 8, rowHeight: 140,
  items: [
    {
      id: 'bl1-1', colSpan: 8, rowSpan: 3,
      content: { layout: 'image-overlay', title: 'The Next Interface Paradigm', description: 'Why spatial computing changes everything we know about UI design.', badge: 'Cover Story', image: img('photo-1464822759023-fed622ff2c3b') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-2xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'bl1-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'image-left', title: 'Tokens vs Variables', description: 'Figma\'s new system explained', image: img('photo-1558618666-fcd25c85cd64') },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'bl1-3', colSpan: 4, rowSpan: 1,
      content: { layout: 'image-left', title: 'AI Won\'t Replace You', description: 'But these 5 skills will matter more', image: img('photo-1541701494587-cb58502866ab') },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'bl1-4', colSpan: 4, rowSpan: 1,
      content: { layout: 'hero', title: 'Weekly design digest.', description: 'No spam, just signal.', ctaText: 'Subscribe free', badge: '14k readers' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'bl1-5', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '14K', statLabel: 'Subscribers', statTrend: '+840', description: 'Joined this month' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'bl1-6', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '8 min', statLabel: 'Avg. read time', description: 'Curated for deep thinking' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'bl1-7', colSpan: 4, rowSpan: 1,
      content: { layout: 'feature', icon: '✦', title: 'Editor\'s Pick', description: 'Hand-selected by our editorial team every Tuesday.' },
      styles: { bg: INDIGO, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── E-Commerce ───────────────────────────────────────────────────────────────

const ecommerce1: LayoutPreset = {
  id: 'ecom-1', name: 'Product Showcase', categoryId: 'ecommerce',
  columns: 12, gap: 8, rowHeight: 140,
  items: [
    {
      id: 'ec1-1', colSpan: 6, rowSpan: 4,
      content: { layout: 'image-full', image: img('photo-1542291026-7eec264c27ff') },
      styles: { bg: '#F2F2F7', textColor: '', border: NB, shadow: 'shadow-2xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ec1-2', colSpan: 6, rowSpan: 2,
      content: { layout: 'hero', title: 'Air Max Horizon', description: 'Ultralight mesh upper, responsive foam midsole, carbon fibre plate.', ctaText: 'Add to cart — $179', badge: 'New drop' },
      styles: { bg: BLACK, textColor: '', border: 'border-none', shadow: 'shadow-xl', padding: LG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ec1-3', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '4.9★', statLabel: 'Rating', description: 'From 2,841 reviews' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ec1-4', colSpan: 3, rowSpan: 1,
      content: { layout: 'stat', stat: '$179', statLabel: 'Free shipping', description: 'Arrives in 2 days' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ec1-5', colSpan: 2, rowSpan: 1,
      content: { layout: 'feature', icon: '↩', title: 'Free returns', description: '30-day window' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ec1-6', colSpan: 2, rowSpan: 1,
      content: { layout: 'feature', icon: '⊕', title: '7 colors', description: 'In stock now' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'ec1-7', colSpan: 2, rowSpan: 1,
      content: { layout: 'feature', icon: '✓', title: 'Verified fit', description: 'True to size' },
      styles: { bg: GREEN, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

const gallery1: LayoutPreset = {
  id: 'gal-1', name: 'Photo Mosaic', categoryId: 'gallery',
  columns: 12, gap: 8, rowHeight: 100,
  items: [
    {
      id: 'gal1-1', colSpan: 5, rowSpan: 4,
      content: { layout: 'image-full', title: '', description: '', image: img('photo-1506905925346-21bda4d32df4') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'gal1-2', colSpan: 7, rowSpan: 2,
      content: { layout: 'image-full', title: '', description: '', image: img('photo-1472214103451-9374bd1c798e') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'gal1-3', colSpan: 4, rowSpan: 2,
      content: { layout: 'image-full', title: '', description: '', image: img('photo-1464822759023-fed622ff2c3b') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'gal1-4', colSpan: 3, rowSpan: 2,
      content: { layout: 'image-full', title: '', description: '', image: img('photo-1540979388789-6cee28a1cdc9') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'gal1-5', colSpan: 4, rowSpan: 3,
      content: { layout: 'image-full', title: '', description: '', image: img('photo-1519681393784-d120267933ba') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'gal1-6', colSpan: 3, rowSpan: 3,
      content: { layout: 'image-overlay', title: 'Northern Lights', description: 'Iceland, 2024', image: img('photo-1532274402911-5a369e4c4bb5') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'gal1-7', colSpan: 5, rowSpan: 3,
      content: { layout: 'image-full', title: '', description: '', image: img('photo-1441974231531-c6227db76b6e') },
      styles: { bg: SURFACE, textColor: '', border: NB, shadow: 'shadow-xl', padding: IMG, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Productivity ─────────────────────────────────────────────────────────────

const productivity1: LayoutPreset = {
  id: 'prod-1', name: 'Work Dashboard', categoryId: 'productivity',
  columns: 12, gap: 8, rowHeight: 125,
  items: [
    {
      id: 'pr1-1', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '3', statLabel: 'Tasks due today', description: 'Design system, review, standup' },
      styles: { bg: RED, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-2', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '87%', statLabel: 'Week progress', statTrend: '+12%', description: 'vs last week' },
      styles: { bg: GREEN, textColor: '', border: NB, shadow: 'shadow-md', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-3', colSpan: 4, rowSpan: 1,
      content: { layout: 'stat', stat: '12', statLabel: 'Completed', statTrend: '+5', description: 'This week' },
      styles: { bg: SURFACE, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-4', colSpan: 4, rowSpan: 3,
      content: { layout: 'text', title: '📋 To Do', description: '• Finalize onboarding screens\n• Review pull request #142\n• Update component library\n• Write Q4 retrospective' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-5', colSpan: 4, rowSpan: 3,
      content: { layout: 'text', title: '⚡ In Progress', description: '• Design system tokens audit\n• API integration for search\n• User testing sessions' },
      styles: { bg: BLACK, textColor: '', border: 'border-[#0A84FF]/25', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-6', colSpan: 4, rowSpan: 3,
      content: { layout: 'text', title: '✅ Done', description: '• Homepage redesign shipped\n• A/B test results analyzed\n• Stakeholder deck presented\n• Sprint planning completed\n• Performance audit' },
      styles: { bg: RAISED, textColor: '', border: 'border-[#30D158]/25', shadow: 'shadow-md', padding: MD, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-7', colSpan: 6, rowSpan: 1,
      content: { layout: 'feature', icon: '🎯', title: 'Focus: Design System', description: 'Current sprint goal — ship token migration by Friday.' },
      styles: { bg: BLUE, textColor: '', border: NB, shadow: 'shadow-lg', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
    {
      id: 'pr1-8', colSpan: 6, rowSpan: 1,
      content: { layout: 'feature', icon: '📅', title: 'Next up: Design review', description: 'Tomorrow at 10am with product and eng leads.' },
      styles: { bg: RAISED, textColor: '', border: 'border-none', shadow: 'shadow-sm', padding: SM, align: 'left', radius: R, opacity: 100 }
    },
  ]
}

// ─── Export ────────────────────────────────────────────────────────────────────

export const LAYOUT_PRESETS: LayoutPreset[] = [
  saas1, saas2,
  portfolio1, portfolio2,
  social1,
  ai1,
  team1,
  casestudy1,
  blog1,
  ecommerce1,
  gallery1,
  productivity1,
]
