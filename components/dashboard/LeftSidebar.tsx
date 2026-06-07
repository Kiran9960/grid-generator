"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronDown, X,
  LayoutDashboard, LayoutTemplate, User, Users,
  Box, FileText, Image as ImageIcon, LayoutList, CheckSquare, ShoppingCart,
} from "lucide-react"

import { useGridStore } from "@/store/useGridStore"
import { PRESET_CATEGORIES, LAYOUT_PRESETS } from "@/lib/presets"

type IconType = React.ElementType

const iconMap: Record<string, IconType> = {
  LayoutDashboard, User, Users, LayoutList, Box,
  FileText, Image: ImageIcon, CheckSquare, LayoutTemplate, ShoppingCart,
}

const SECTIONS = [
  {
    title: 'Page Layouts',
    categoryIds: ['saas', 'portfolio', 'ai', 'ecommerce'],
  },
  {
    title: 'Sections & Content',
    categoryIds: ['team', 'casestudy', 'blog', 'social'],
  },
  {
    title: 'Media & Tools',
    categoryIds: ['gallery', 'productivity'],
  },
]

interface SidebarContentProps {
  onPresetLoad?: () => void
}

function SidebarContent({ onPresetLoad }: SidebarContentProps) {
  const {
    setItems, setColumns, setGap, setRowHeight, setRowHeightAuto,
    activeCategory, setActiveCategory,
    setHasChanges, setCategoryStates,
  } = useGridStore()

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    return new Set([SECTIONS[0].categoryIds[0]])
  })
  const [activePresetId, setActivePresetId] = useState<string | null>(null)

  useEffect(() => {
    if (activeCategory) {
      setExpandedIds(prev => new Set([...prev, activeCategory]))
    }
  }, [activeCategory])

  const handleLoadPreset = (presetId: string) => {
    const preset = LAYOUT_PRESETS.find((p) => p.id === presetId)
    if (!preset) return

    const state = useGridStore.getState()
    if (state.activeCategory && state.activeCategory !== preset.categoryId) {
      useGridStore.getState().setCategoryStates({
        ...state.categoryStates,
        [state.activeCategory]: {
          columns: state.columns, gap: state.gap,
          rowHeight: state.rowHeight, rowHeightAuto: state.rowHeightAuto, items: state.items,
        },
      })
    }

    setColumns(preset.columns)
    setGap(preset.gap)
    setRowHeight(preset.rowHeight)
    setRowHeightAuto(true)
    setItems(JSON.parse(JSON.stringify(preset.items)))
    setActiveCategory(preset.categoryId)
    setHasChanges(false)
    setActivePresetId(presetId)
    onPresetLoad?.()
  }

  const toggleExpanded = (catId: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(catId)) next.delete(catId)
      else next.add(catId)
      return next
    })
  }

  const handleCategoryClick = (catId: string) => {
    toggleExpanded(catId)

    const state = useGridStore.getState()
    if (state.activeCategory !== catId) {
      const saved = state.categoryStates[catId]
      const catPresets = LAYOUT_PRESETS.filter(p => p.categoryId === catId)
      if (saved) {
        if (state.activeCategory) {
          setCategoryStates({
            ...state.categoryStates,
            [state.activeCategory]: {
              columns: state.columns, gap: state.gap,
              rowHeight: state.rowHeight, rowHeightAuto: state.rowHeightAuto, items: state.items,
            },
          })
        }
        setColumns(saved.columns); setGap(saved.gap)
        setRowHeight(saved.rowHeight); setRowHeightAuto(saved.rowHeightAuto ?? true)
        setItems(saved.items); setActiveCategory(catId); setHasChanges(true)
        const firstPreset = catPresets[0]
        if (firstPreset) setActivePresetId(firstPreset.id)
      } else if (catPresets.length > 0) {
        handleLoadPreset(catPresets[0].id)
      }
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {SECTIONS.map((section) => {
          const cats = section.categoryIds
            .map(id => PRESET_CATEGORIES.find(c => c.id === id))
            .filter(Boolean) as typeof PRESET_CATEGORIES

          return (
            <div key={section.title}>
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/50 select-none">
                {section.title}
              </p>

              <div className="space-y-0.5">
                {cats.map(cat => {
                  const Icon = iconMap[cat.icon] || LayoutTemplate
                  const isExpanded = expandedIds.has(cat.id)
                  const isActive = activeCategory === cat.id
                  const presets = LAYOUT_PRESETS.filter(p => p.categoryId === cat.id)

                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => handleCategoryClick(cat.id)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer group",
                          isActive
                            ? "bg-foreground/10 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        )}
                      >
                        <Icon size={15} className="shrink-0" />
                        <span className="flex-1 text-[13px] font-medium truncate">
                          {cat.name}
                        </span>
                        <ChevronDown
                          size={13}
                          className={cn(
                            "shrink-0 transition-transform duration-200",
                            isActive ? "opacity-60" : "opacity-40 group-hover:opacity-60",
                            isExpanded ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </button>

                      {isExpanded && presets.length > 0 && (
                        <div className="mt-0.5 mb-1 ml-9 space-y-0.5">
                          {presets.map(preset => {
                            const isActivePreset = activePresetId === preset.id
                            return (
                              <button
                                key={preset.id}
                                onClick={() => handleLoadPreset(preset.id)}
                                className={cn(
                                  "w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-150 cursor-pointer",
                                  isActivePreset
                                    ? "bg-foreground/10 text-foreground font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                )}
                              >
                                {preset.name}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function LeftSidebar() {
  const { isSidebarOpen, toggleSidebar } = useGridStore()

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex h-full w-55 shrink-0 border-r border-border bg-background transition-all duration-300 overflow-hidden",
        !isSidebarOpen && "lg:w-0 lg:border-r-0"
      )}>
        <div className="w-55 shrink-0 h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar */}
      <aside className={cn(
        "fixed lg:hidden inset-y-0 left-0 w-64 border-r border-border bg-background flex flex-col z-30 transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border shrink-0">
          <span className="text-[13px] font-semibold text-foreground">Templates</span>
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <SidebarContent onPresetLoad={toggleSidebar} />
        </div>
      </aside>
    </>
  )
}
