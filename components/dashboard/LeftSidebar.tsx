"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, LayoutTemplate, Briefcase, User, Users,
  Box, FileText, Image as ImageIcon, LayoutList, CheckSquare,
  ShoppingCart, Search, X, PanelLeftClose, PanelLeftOpen,
} from "lucide-react"
import { useGridStore } from "@/store/useGridStore"
import { PRESET_CATEGORIES, LAYOUT_PRESETS } from "@/lib/presets"

type IconType = React.ElementType

const iconMap: Record<string, IconType> = {
  LayoutDashboard, User, Users, LayoutList, Box,
  Briefcase, FileText, Image: ImageIcon, CheckSquare, LayoutTemplate, ShoppingCart,
}

export function LeftSidebar() {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState(true)
  const {
    setItems, setColumns, setGap, setRowHeight,
    isSidebarOpen, toggleSidebar,
    activeCategory, setActiveCategory,
    setHasChanges, setCategoryStates
  } = useGridStore()

  const handleLoadPreset = (presetId: string) => {
    const preset = LAYOUT_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setColumns(preset.columns)
      setGap(preset.gap)
      setRowHeight(preset.rowHeight)
      setItems(JSON.parse(JSON.stringify(preset.items)))
      setActiveCategory(preset.categoryId)
      setHasChanges(false)
    }
  }

  const filteredPresets = LAYOUT_PRESETS.filter((p) => {
    const category = PRESET_CATEGORIES.find((c) => c.id === p.categoryId)
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      category?.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Icon rail — always visible on desktop */}
      <div className="hidden lg:flex flex-col items-center w-12 border-r border-border bg-background shrink-0 py-3 gap-1">
        {/* Collapse / expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          title={expanded ? 'Collapse panel' : 'Expand panel'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mb-1"
        >
          {expanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>

        <div className="w-5 h-px bg-border mb-1" />

        {PRESET_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || LayoutTemplate
          const isSelected = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              title={cat.name}
              onClick={() => {
                const state = useGridStore.getState()
                if (state.activeCategory) {
                  setCategoryStates({
                    ...state.categoryStates,
                    [state.activeCategory]: {
                      columns: state.columns, gap: state.gap,
                      rowHeight: state.rowHeight, items: state.items,
                    },
                  })
                }
                setActiveCategory(cat.id)
                const updated = useGridStore.getState()
                const saved = updated.categoryStates[cat.id]
                const catPresets = LAYOUT_PRESETS.filter(p => p.categoryId === cat.id)
                if (saved) {
                  setColumns(saved.columns); setGap(saved.gap)
                  setRowHeight(saved.rowHeight); setItems(saved.items)
                  setHasChanges(true)
                } else if (catPresets.length > 0) {
                  handleLoadPreset(catPresets[0].id)
                }
              }}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                isSelected
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon size={16} />
            </button>
          )
        })}
      </div>

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 border-r border-border bg-background/95 backdrop-blur-xl lg:bg-background flex flex-col shrink-0 z-30 transition-all duration-300 overflow-hidden",
        // Mobile: slide in/out
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        // Desktop: collapse width
        expanded ? "w-64" : "lg:w-0 lg:border-0"
      )}>
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-border">
          <span className="font-semibold text-sm">Templates</span>
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar header */}
        <div className="px-4 pt-4 pb-2 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Templates</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-muted border border-border rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
            />
          </div>

          {/* Template list */}
          <div className="space-y-0.5">
            {PRESET_CATEGORIES.map((cat) => {
              const catPresets = filteredPresets.filter((p) => p.categoryId === cat.id)
              if (catPresets.length === 0) return null

              const Icon = iconMap[cat.icon] || LayoutTemplate
              const isSelected = activeCategory === cat.id

              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const state = useGridStore.getState()

                    if (state.activeCategory) {
                      setCategoryStates({
                        ...state.categoryStates,
                        [state.activeCategory]: {
                          columns: state.columns,
                          gap: state.gap,
                          rowHeight: state.rowHeight,
                          items: state.items,
                        },
                      })
                    }

                    setActiveCategory(cat.id)

                    const updated = useGridStore.getState()
                    const saved = updated.categoryStates[cat.id]

                    if (saved) {
                      setColumns(saved.columns)
                      setGap(saved.gap)
                      setRowHeight(saved.rowHeight)
                      setItems(saved.items)
                      setHasChanges(true)
                    } else if (catPresets.length > 0) {
                      handleLoadPreset(catPresets[0].id)
                    }

                    if (window.innerWidth < 1024) toggleSidebar()
                  }}
                  className={cn(
                    "flex items-center gap-2.5 py-2 px-2.5 rounded-lg group transition-colors",
                    isSelected ? "bg-primary/10" : "hover:bg-muted/60"
                  )}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground group-hover:text-foreground"
                  )}>
                    <Icon size={14} />
                  </div>
                  <span className={cn(
                    "text-xs font-medium transition-colors truncate",
                    isSelected ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                  )}>
                    {cat.name}
                  </span>
                  {isSelected && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </a>
              )
            })}

            {filteredPresets.length === 0 && (
              <div className="text-center text-muted-foreground text-xs py-8 px-4">
                No layouts found for{" "}
                <span className="font-medium text-foreground">"{search}"</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
