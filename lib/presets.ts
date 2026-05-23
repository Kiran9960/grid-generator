import { GridItem } from "@/store/useGridStore"

export interface LayoutPreset {
  id: string;
  name: string;
  categoryId: string;
  columns: number;
  gap: number;
  rowHeight: number;
  items: GridItem[];
}

export const PRESET_CATEGORIES = [
  { id: 'saas', name: 'SaaS Dashboard', icon: 'LayoutDashboard' },
  { id: 'portfolio', name: 'Portfolio', icon: 'User' },
  { id: 'social', name: 'Social Media', icon: 'LayoutList' },
  { id: 'ai', name: 'AI Landing Page', icon: 'Box' },
  { id: 'team', name: 'Team Section', icon: 'Users' },
  { id: 'casestudy', name: 'Case Study', icon: 'FileText' },
  { id: 'blog', name: 'Blog Layout', icon: 'LayoutTemplate' },
  { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart' },
  { id: 'gallery', name: 'Gallery', icon: 'Image' },
  { id: 'productivity', name: 'Productivity', icon: 'CheckSquare' },
]

export const LAYOUT_PRESETS: LayoutPreset[] = [
  {
    id: 'saas-1',
    name: 'Analytics Overview',
    categoryId: 'saas',
    columns: 12,
    gap: 16,
    rowHeight: 120,
    items: [
      {
        id: 'saas-1-1',
        colSpan: 8,
        rowSpan: 2,
        content: { title: 'Revenue', description: 'Monthly recurring revenue overview' },
        styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-lg', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'saas-1-2',
        colSpan: 4,
        rowSpan: 1,
        content: { title: 'Users', description: '+2,400 this week' },
        styles: { bg: 'bg-zinc-100', textColor: 'text-zinc-900', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'saas-1-3',
        colSpan: 4,
        rowSpan: 1,
        content: { title: 'Bounce Rate', description: '2.4% average' },
        styles: { bg: 'bg-zinc-100', textColor: 'text-zinc-900', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'saas-1-4',
        colSpan: 12,
        rowSpan: 2,
        content: { title: 'Recent Transactions', description: 'Latest user payments and upgrades.' },
        styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-700 dark:text-zinc-300', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 }
      }
    ]
  },
  {
    id: 'portfolio-1',
    name: 'Creative Bento',
    categoryId: 'portfolio',
    columns: 12,
    gap: 20,
    rowHeight: 140,
    items: [
      {
        id: 'port-1-1',
        colSpan: 6,
        rowSpan: 2,
        content: { title: 'Hi, I am Jane', description: 'Digital Designer & Developer' },
        styles: { bg: 'bg-indigo-600', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-xl', padding: 'p-8', align: 'center', radius: 'rounded-xl', opacity: 100 }
      },
      {
        id: 'port-1-2',
        colSpan: 3,
        rowSpan: 1,
        content: { title: 'Dribbble', description: 'Design concepts' },
        styles: { bg: 'bg-pink-500', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-md', padding: 'p-6', align: 'center', radius: 'rounded-xl', opacity: 100 }
      },
      {
        id: 'port-1-3',
        colSpan: 3,
        rowSpan: 1,
        content: { title: 'Twitter', description: 'Ramblings' },
        styles: { bg: 'bg-blue-400', textColor: 'text-zinc-900 dark:text-white', border: ' ', shadow: 'shadow-md', padding: 'p-6', align: 'center', radius: 'rounded-xl', opacity: 100 }
      },
      {
        id: 'port-1-4',
        colSpan: 6,
        rowSpan: 1,
        content: { title: 'Latest Work', description: 'View my recent case studies' },
        styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-zinc-300 dark:border-zinc-700', shadow: 'shadow-md', padding: 'p-6', align: 'left', radius: 'rounded-xl', opacity: 100 }
      }
    ]
  },
  {
    id: 'gallery-1',
    name: 'Masonry Photo Grid',
    categoryId: 'gallery',
    columns: 12,
    gap: 16,
    rowHeight: 60,
    items: [
      {
        id: 'gal-1-1',
        colSpan: 6,
        rowSpan: 4,
        content: { title: 'Large Vertical', description: 'Main portrait piece', contentType: 'image' },
        styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-lg', padding: 'p-0', align: 'center', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'gal-1-2',
        colSpan: 6,
        rowSpan: 2,
        content: { title: 'Horizontal', description: 'Top right image', contentType: 'image' },
        styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-0', align: 'center', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'gal-1-3',
        colSpan: 3,
        rowSpan: 2,
        content: { title: 'Square', description: 'Small square', contentType: 'image' },
        styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-0', align: 'center', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'gal-1-4',
        colSpan: 3,
        rowSpan: 3,
        content: { title: 'Vertical', description: 'Tall slim image', contentType: 'image' },
        styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-0', align: 'center', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'gal-1-5',
        colSpan: 6,
        rowSpan: 2,
        content: { title: 'Landscape', description: 'Bottom wide image', contentType: 'image' },
        styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-0', align: 'center', radius: 'rounded-2xl', opacity: 100 }
      },
      {
        id: 'gal-1-6',
        colSpan: 3,
        rowSpan: 3,
        content: { title: 'Landscape', description: 'Bottom wide image', contentType: 'image' },
        styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-0', align: 'center', radius: 'rounded-2xl', opacity: 100 }
      }
    ]
  },
  {
    id: 'social-1',
    name: 'Activity Feed',
    categoryId: 'social',
    columns: 12,
    gap: 16,
    rowHeight: 120,
    items: [
      { id: 'soc-1-1', colSpan: 3, rowSpan: 3, content: { title: 'Profile Info', description: 'User details & stats' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-md', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'soc-1-2', colSpan: 6, rowSpan: 2, content: { title: 'New Post', description: 'What is on your mind?' }, styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-300 dark:border-zinc-700', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'soc-1-3', colSpan: 6, rowSpan: 1, content: { title: 'Feed', description: 'Recent updates from friends' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-md', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'soc-1-4', colSpan: 3, rowSpan: 2, content: { title: 'Suggestions', description: 'People you may know' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } }
    ]
  },
  {
    id: 'ai-1',
    name: 'Chat Interface',
    categoryId: 'ai',
    columns: 12,
    gap: 16,
    rowHeight: 100,
    items: [
      { id: 'ai-1-1', colSpan: 3, rowSpan: 4, content: { title: 'Chat History', description: 'Previous conversations' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-700 dark:text-zinc-300', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-none', padding: 'p-4', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'ai-1-2', colSpan: 9, rowSpan: 3, content: { title: 'Main Chat', description: 'AI responses' }, styles: { bg: 'bg-white dark:bg-zinc-950', textColor: 'text-zinc-900 dark:text-zinc-100', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-inner', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'ai-1-3', colSpan: 9, rowSpan: 1, content: { title: 'Input', description: 'Type a message...' }, styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-300 dark:border-zinc-700', shadow: 'shadow-lg', padding: 'p-4', align: 'center', radius: 'rounded-2xl', opacity: 100 } }
    ]
  },
  {
    id: 'team-1',
    name: 'Team Roster',
    categoryId: 'team',
    columns: 12,
    gap: 20,
    rowHeight: 180,
    items: [
      { id: 'team-1-1', colSpan: 4, rowSpan: 1, content: { title: 'Alice', description: 'Lead Engineer' }, styles: { bg: 'bg-indigo-600', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-md', padding: 'p-6', align: 'center', radius: 'rounded-xl', opacity: 100 } },
      { id: 'team-1-2', colSpan: 4, rowSpan: 1, content: { title: 'Bob', description: 'Product Manager' }, styles: { bg: 'bg-emerald-600', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-md', padding: 'p-6', align: 'center', radius: 'rounded-xl', opacity: 100 } },
      { id: 'team-1-3', colSpan: 4, rowSpan: 1, content: { title: 'Charlie', description: 'Designer' }, styles: { bg: 'bg-rose-600', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-md', padding: 'p-6', align: 'center', radius: 'rounded-xl', opacity: 100 } }
    ]
  },
  {
    id: 'casestudy-1',
    name: 'Case Study Overview',
    categoryId: 'casestudy',
    columns: 12,
    gap: 24,
    rowHeight: 160,
    items: [
      { id: 'cs-1-1', colSpan: 12, rowSpan: 2, content: { title: 'Project Alpha', description: 'How we increased conversions by 300%' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-lg', padding: 'p-10', align: 'center', radius: 'rounded-xl', opacity: 100 } },
      { id: 'cs-1-2', colSpan: 4, rowSpan: 1, content: { title: 'Challenge', description: 'Low user engagement' }, styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-zinc-300 dark:border-zinc-700', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'cs-1-3', colSpan: 4, rowSpan: 1, content: { title: 'Solution', description: 'Redesigned onboarding flow' }, styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-zinc-300 dark:border-zinc-700', shadow: 'shadow-sm', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'cs-1-4', colSpan: 4, rowSpan: 1, content: { title: 'Results', description: '300% growth in 3 months' }, styles: { bg: 'bg-indigo-600', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-md', padding: 'p-6', align: 'left', radius: 'rounded-2xl', opacity: 100 } }
    ]
  },
  {
    id: 'blog-1',
    name: 'Featured Article',
    categoryId: 'blog',
    columns: 12,
    gap: 16,
    rowHeight: 140,
    items: [
      { id: 'blog-1-1', colSpan: 8, rowSpan: 3, content: { title: 'The Future of AI', description: 'Deep dive into machine learning trends' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-900 dark:text-white', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-md', padding: 'p-8', align: 'left', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'blog-1-2', colSpan: 4, rowSpan: 1, content: { title: 'Related Post 1', description: 'Intro to Neural Networks' }, styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-700 dark:text-zinc-300', border: 'border-transparent', shadow: 'shadow-none', padding: 'p-5', align: 'left', radius: 'rounded-xl', opacity: 100 } },
      { id: 'blog-1-3', colSpan: 4, rowSpan: 1, content: { title: 'Related Post 2', description: 'Ethics in Tech' }, styles: { bg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-700 dark:text-zinc-300', border: 'border-transparent', shadow: 'shadow-none', padding: 'p-5', align: 'left', radius: 'rounded-xl', opacity: 100 } },
      { id: 'blog-1-4', colSpan: 4, rowSpan: 1, content: { title: 'Subscribe', description: 'Join our newsletter' }, styles: { bg: 'bg-indigo-500', textColor: 'text-zinc-900 dark:text-white', border: 'border-transparent', shadow: 'shadow-md', padding: 'p-5', align: 'center', radius: 'rounded-xl', opacity: 100 } }
    ]
  },
  {
    id: 'ecommerce-1',
    name: 'Product Grid',
    categoryId: 'ecommerce',
    columns: 12,
    gap: 16,
    rowHeight: 220,
    items: [
      { id: 'ecom-1-1', colSpan: 4, rowSpan: 1, content: { title: 'Sneakers', description: '$120.00' }, styles: { bg: 'bg-zinc-100', textColor: 'text-zinc-900', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-6', align: 'center', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'ecom-1-2', colSpan: 4, rowSpan: 1, content: { title: 'Jacket', description: '$85.00' }, styles: { bg: 'bg-zinc-100', textColor: 'text-zinc-900', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-6', align: 'center', radius: 'rounded-2xl', opacity: 100 } },
      { id: 'ecom-1-3', colSpan: 4, rowSpan: 1, content: { title: 'Watch', description: '$250.00' }, styles: { bg: 'bg-zinc-100', textColor: 'text-zinc-900', border: 'border-transparent', shadow: 'shadow-sm', padding: 'p-6', align: 'center', radius: 'rounded-2xl', opacity: 100 } }
    ]
  },
  {
    id: 'productivity-1',
    name: 'Kanban Board',
    categoryId: 'productivity',
    columns: 12,
    gap: 16,
    rowHeight: 120,
    items: [
      { id: 'prod-1-1', colSpan: 4, rowSpan: 4, content: { title: 'To Do', description: '3 tasks' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-none', padding: 'p-4', align: 'left', radius: 'rounded-xl', opacity: 100 } },
      { id: 'prod-1-2', colSpan: 4, rowSpan: 4, content: { title: 'In Progress', description: '1 task' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-none', padding: 'p-4', align: 'left', radius: 'rounded-xl', opacity: 100 } },
      { id: 'prod-1-3', colSpan: 4, rowSpan: 4, content: { title: 'Done', description: '5 tasks' }, styles: { bg: 'bg-zinc-50 dark:bg-zinc-900', textColor: 'text-zinc-800 dark:text-zinc-200', border: 'border-zinc-200 dark:border-zinc-800', shadow: 'shadow-none', padding: 'p-4', align: 'left', radius: 'rounded-xl', opacity: 100 } }
    ]
  }
]
