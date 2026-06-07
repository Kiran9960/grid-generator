import { create } from 'zustand';
import { LAYOUT_PRESETS } from '@/lib/presets';

export type GridItemLayout =
  | 'text'
  | 'hero'
  | 'image-full'
  | 'image-top'
  | 'image-bottom'
  | 'image-left'
  | 'image-right'
  | 'image-overlay'
  | 'stat'
  | 'feature'

export interface GridItemContent {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  contentType?: 'text' | 'image' | 'empty';
  layout?: GridItemLayout;
  ctaText?: string;
  ctaSecondaryText?: string;
  badge?: string;
  stat?: string;
  statLabel?: string;
  statTrend?: string;
}

export interface GridItemStyles {
  bg: string;
  gradient?: string;
  textColor: string;
  border: string;
  shadow: string;
  padding: string;
  align: 'left' | 'center' | 'right';
  radius: string;
  opacity: number;
  animation?: string;
}

export interface GridItem {
  id: string;
  colSpan: number;
  rowSpan: number;
  content: GridItemContent;
  styles: GridItemStyles;
}

export interface GridStateSnapshot {
  columns: number;
  gap: number;
  rowHeight: number;
  rowHeightAuto: boolean;
  items: GridItem[];
}

export interface GridState extends GridStateSnapshot {
  selectedIds: string[];
  past: GridStateSnapshot[];
  future: GridStateSnapshot[];
  previewMode: 'desktop' | 'tablet' | 'mobile';
  theme: 'dark' | 'light';
  isSidebarOpen: boolean;
  activeCategory: string | null;
  hasChanges: boolean;
  categoryStates: Record<string, GridStateSnapshot>;
  showRulers: boolean;
  showGapLines: boolean;
  minRows: number;
  rowHeightAuto: boolean;

  // Actions
  setColumns: (columns: number) => void;
  setGap: (gap: number) => void;
  setRowHeight: (height: number) => void;
  setItems: (items: GridItem[]) => void;
  addItem: (item: GridItem) => void;
  duplicateItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<GridItem>) => void;
  updateSelectedItems: (updates: Partial<GridItem>) => void;
  deleteItems: (ids: string[]) => void;
  setSelectedIds: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  resetLayout: () => void;
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setActiveCategory: (categoryId: string | null) => void;
  setHasChanges: (hasChanges: boolean) => void;
  setCategoryStates: (states: Record<string, GridStateSnapshot>) => void;
  toggleRulers: () => void;
  toggleGapLines: () => void;
  setMinRows: (rows: number) => void;
  setRowHeightAuto: (enabled: boolean) => void;
  toggleRowHeightAuto: () => void;

  // History
  saveSnapshot: () => void;
  undo: () => void;
  redo: () => void;
}

const defaultItems: GridItem[] = [
  {
    id: 'item-1',
    colSpan: 8,
    rowSpan: 2,
    content: {
      title: 'Welcome to Grid Builder',
      description: 'The modern way to build grid layouts visually.',
    },
    styles: {
      bg: 'bg-zinc-50 dark:bg-zinc-900',
      textColor: 'text-zinc-900 dark:text-white',
      border: 'border-zinc-200 dark:border-zinc-800',
      shadow: 'shadow-lg',
      padding: 'p-8',
      align: 'left',
      radius: 'rounded-xl',
      opacity: 100,
    }
  },
  {
    id: 'item-2',
    colSpan: 4,
    rowSpan: 1,
    content: {
      title: 'Analytics',
      description: 'Track your growth',
    },
    styles: {
      bg: 'bg-zinc-100',
      textColor: 'text-zinc-900',
      border: 'border-zinc-200',
      shadow: 'shadow-none',
      padding: 'p-6',
      align: 'center',
      radius: 'rounded-xl',
      opacity: 100,
    }
  },
  {
    id: 'item-3',
    colSpan: 4,
    rowSpan: 1,
    content: {
      title: 'Social',
      description: 'Connect with users',
    },
    styles: {
      bg: 'bg-zinc-100',
      textColor: 'text-zinc-900',
      border: 'border-zinc-200',
      shadow: 'shadow-none',
      padding: 'p-6',
      align: 'center',
      radius: 'rounded-xl',
      opacity: 100,
    }
  }
];

const getSnapshot = (state: GridState): GridStateSnapshot => ({
  columns: state.columns,
  gap: state.gap,
  rowHeight: state.rowHeight,
  rowHeightAuto: state.rowHeightAuto,
  items: state.items,
});

export const useGridStore = create<GridState>((set, get) => ({
  columns: 12,
  gap: 16, // px
  rowHeight: 120, // px
  items: defaultItems,
  selectedIds: [],
  past: [],
  future: [],
  previewMode: 'desktop',
  theme: 'dark',
  isSidebarOpen: false,
  activeCategory: 'hero-sections',
  hasChanges: false,
  categoryStates: {},
  showRulers: true,
  showGapLines: true,
  minRows: 4,
  rowHeightAuto: true,

  saveSnapshot: () => set((state) => {
    const currentSnapshot = getSnapshot(state);
    return {
      past: [...state.past, currentSnapshot],
      future: [], // Clear future on new action
      hasChanges: true
    };
  }),

  undo: () => set((state) => {
    if (state.past.length === 0) return state;
    
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);
    
    return {
      ...previous,
      past: newPast,
      future: [getSnapshot(state), ...state.future],
      selectedIds: [], // Clear selection on undo to avoid invalid state
      hasChanges: true
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state;
    
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    
    return {
      ...next,
      past: [...state.past, getSnapshot(state)],
      future: newFuture,
      selectedIds: [],
      hasChanges: true
    };
  }),

  setColumns: (columns) => {
    get().saveSnapshot();
    set({ columns, hasChanges: true });
  },
  setGap: (gap) => {
    get().saveSnapshot();
    set({ gap, hasChanges: true });
  },
  setRowHeight: (rowHeight) => {
    get().saveSnapshot();
    set({ rowHeight, hasChanges: true });
  },
  setItems: (items) => {
    get().saveSnapshot();
    set({ items, selectedIds: [], hasChanges: true });
  },
  addItem: (item) => {
    get().saveSnapshot();
    set((state) => {
      if (state.items.length >= 12) return state;
      return { items: [...state.items, item], selectedIds: [item.id], hasChanges: true };
    });
  },
  duplicateItem: (id) => {
    get().saveSnapshot();
    set((state) => {
      if (state.items.length >= 12) return state;
      const idx = state.items.findIndex(item => item.id === id);
      if (idx === -1) return state;
      const copy = { ...state.items[idx], id: `item-${Date.now()}` };
      const newItems = [...state.items];
      newItems.splice(idx + 1, 0, copy);
      return { items: newItems, selectedIds: [copy.id], hasChanges: true };
    });
  },
  updateItem: (id, updates) => {
    get().saveSnapshot();
    set((state) => ({
      items: state.items.map(item => item.id === id ? { ...item, ...updates } : item),
      hasChanges: true
    }));
  },
  updateSelectedItems: (updates) => {
    get().saveSnapshot();
    set((state) => ({
      items: state.items.map(item => state.selectedIds.includes(item.id) ? { ...item, ...updates } : item),
      hasChanges: true
    }));
  },
  deleteItems: (ids) => {
    get().saveSnapshot();
    set((state) => ({
      items: state.items.filter(item => !ids.includes(item.id)),
      selectedIds: state.selectedIds.filter(id => !ids.includes(id)),
      hasChanges: true
    }));
  },
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  toggleSelection: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id) 
      ? state.selectedIds.filter(selectedId => selectedId !== id)
      : [...state.selectedIds, id]
  })),
  clearSelection: () => set({ selectedIds: [] }),
  resetLayout: () => {
    get().saveSnapshot();
    const { activeCategory, categoryStates } = get();
    
    // Clear saved state for this category
    const newCategoryStates = { ...categoryStates };
    if (activeCategory) {
      delete newCategoryStates[activeCategory];
    }
    
    // Find default preset for this category
    let presetItems = defaultItems;
    let presetColumns = 12;
    let presetGap = 16;
    let presetRowHeight = 120;
    
    if (activeCategory) {
      const preset = LAYOUT_PRESETS.find(p => p.categoryId === activeCategory);
      if (preset) {
        presetItems = JSON.parse(JSON.stringify(preset.items));
        presetColumns = preset.columns;
        presetGap = preset.gap;
        presetRowHeight = preset.rowHeight;
      }
    }
    
    set({ 
      items: presetItems, 
      columns: presetColumns,
      gap: presetGap,
      rowHeight: presetRowHeight,
      rowHeightAuto: false,
      selectedIds: [], 
      hasChanges: false,
      categoryStates: newCategoryStates 
    });
  },
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  setHasChanges: (hasChanges) => set({ hasChanges }),
  setCategoryStates: (states) => set({ categoryStates: states }),
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),
  toggleGapLines: () => set((state) => ({ showGapLines: !state.showGapLines })),
  setMinRows: (minRows) => set({ minRows }),
  setRowHeightAuto: (rowHeightAuto) => set({ rowHeightAuto }),
  toggleRowHeightAuto: () => set((state) => ({ rowHeightAuto: !state.rowHeightAuto })),
}));
