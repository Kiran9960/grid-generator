"use client"

import { useState } from 'react'
import { Code, RefreshCw, Monitor, Tablet, Smartphone, Undo2, Redo2, Plus, Moon, Sun, LayoutGrid, Menu, Columns3, Rows3, SeparatorHorizontal } from 'lucide-react'
import { useGridStore } from '@/store/useGridStore'
import { cn } from '@/lib/utils'
import { ExportModal } from './ExportModal'

function Stepper({
  icon,
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}: {
  icon: React.ReactNode
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-1" title={label}>
      <span className="text-muted-foreground">{icon}</span>
      <button
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >−</button>
      <span className="text-xs font-mono text-foreground w-6 text-center tabular-nums select-none">
        {value}{unit}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >+</button>
    </div>
  )
}

export function TopToolbar() {
  const {
    undo, redo, past, future,
    previewMode, setPreviewMode,
    resetLayout, addItem,
    theme, toggleTheme,
    items,
    toggleSidebar,
    columns, setColumns,
    gap, setGap,
    minRows, setMinRows,
  } = useGridStore()

  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const handleAdd = () => {
    if (items.length >= 12) return
    addItem({
      id: `item-${Date.now()}`,
      colSpan: 4,
      rowSpan: 1,
      content: { title: 'New Item', description: 'Double click to edit' },
      styles: {
        bg: 'bg-card',
        textColor: 'text-foreground',
        border: 'border-border',
        shadow: 'shadow-none',
        padding: 'p-6',
        align: 'left',
        radius: 'rounded-2xl',
        opacity: 100
      }
    })
  }

  return (
    <>
      <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutGrid size={18} className="text-primary-foreground" />
            </div>
            <span className="hidden sm:inline font-semibold text-sm tracking-tight mr-4">Grid Builder</span>
          </div>

          {/* History */}
          <div className="hidden sm:flex items-center gap-1 border-l border-border pl-4">
            <button
              onClick={undo}
              disabled={past.length === 0}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
            </button>
            <button
              onClick={redo}
              disabled={future.length === 0}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={16} />
            </button>
          </div>

          {/* Grid dimension steppers */}
          <div className="hidden lg:flex items-center gap-3 border-l border-border pl-4">
            <Stepper
              icon={<Columns3 size={14} />}
              label="Columns"
              value={columns}
              min={1}
              max={24}
              onChange={setColumns}
            />
            <div className="w-px h-4 bg-border" />
            <Stepper
              icon={<Rows3 size={14} />}
              label="Rows"
              value={minRows}
              min={1}
              max={20}
              onChange={setMinRows}
            />
            <div className="w-px h-4 bg-border" />
            <Stepper
              icon={<SeparatorHorizontal size={14} />}
              label="Gap"
              value={gap}
              min={0}
              max={64}
              step={4}
              unit="px"
              onChange={setGap}
            />
          </div>
        </div>

        {/* Center — Preview modes */}
        <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-lg border border-border absolute left-1/2 -translate-x-1/2">
          {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setPreviewMode(mode)}
              className={cn(
                "p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                previewMode === mode
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={mode.charAt(0).toUpperCase() + mode.slice(1)}
            >
              {mode === 'desktop' && <Monitor size={16} />}
              {mode === 'tablet' && <Tablet size={16} />}
              {mode === 'mobile' && <Smartphone size={16} />}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          <button
            onClick={handleAdd}
            disabled={items.length >= 12}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              items.length >= 12
                ? "text-muted-foreground bg-muted cursor-not-allowed opacity-50"
                : "text-foreground border border-border hover:border-primary hover:text-primary"
            )}
            title={items.length >= 12 ? "Maximum 12 items" : "Add Item"}
          >
            <Plus size={14} /> Add Item
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          <button
            onClick={resetLayout}
            className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1.5 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-150 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Code size={14} /> Export Code
          </button>
        </div>
      </header>

      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </>
  )
}
