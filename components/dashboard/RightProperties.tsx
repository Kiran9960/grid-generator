"use client"

import { useGridStore } from "@/store/useGridStore"
import { ArrowLeft, Minus, Plus, Columns3, Rows3, SeparatorHorizontal, RulerIcon, PanelRightClose, PanelRightOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const PADDING_OPTIONS = [
  { label: 'None', value: 'p-0' },
  { label: 'XS', value: 'p-2' },
  { label: 'SM', value: 'p-4' },
  { label: 'MD', value: 'p-6' },
  { label: 'LG', value: 'p-8' },
  { label: 'XL', value: 'p-10' },
]

export function RightProperties() {
  const {
    selectedIds, items, updateItem, clearSelection,
    columns, gap, rowHeight,
    setColumns, setGap, setRowHeight,
    showRulers, showGapLines, toggleRulers, toggleGapLines,
    minRows, setMinRows,
    rowHeightAuto, toggleRowHeightAuto,
  } = useGridStore()

  const [expanded, setExpanded] = useState(true)

  const selectedItem = selectedIds.length === 1
    ? items.find((item) => item.id === selectedIds[0])
    : null

  return (
    <div className="hidden lg:flex flex-row-reverse shrink-0">
      {/* Toggle strip — always visible */}
      <div className="flex flex-col items-center w-12 border-l border-border bg-background py-3">
        <button
          onClick={() => setExpanded(v => !v)}
          title={expanded ? 'Collapse properties' : 'Expand properties'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {expanded ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
        </button>
      </div>

      {/* Panel — collapses to w-0 */}
      <aside className={cn(
        "flex flex-col border-l border-border bg-background overflow-y-auto overflow-x-hidden transition-all duration-300",
        expanded ? "w-64" : "w-0 border-0"
      )}>
      <div className="p-4 border-b border-border flex items-center gap-2">
        {selectedItem ? (
          <>
            <button
              onClick={clearSelection}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Back to grid settings"
            >
              <ArrowLeft size={15} />
            </button>
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">Item Properties</h2>
          </>
        ) : (
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Properties</h2>
        )}
      </div>

      {selectedItem ? (
        <div className="p-4 space-y-6">
          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Content</h3>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Title</label>
              <input
                type="text"
                value={selectedItem.content.title}
                onChange={(e) => updateItem(selectedItem.id, { content: { ...selectedItem.content, title: e.target.value } })}
                className="w-full bg-muted border border-border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Description</label>
              <textarea
                value={selectedItem.content.description}
                onChange={(e) => updateItem(selectedItem.id, { content: { ...selectedItem.content, description: e.target.value } })}
                className="w-full bg-muted border border-border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors min-h-20"
              />
            </div>
          </div>

          {/* Styling */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Styling</h3>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedItem.styles.bg.startsWith('#') ? selectedItem.styles.bg : '#ffffff'}
                  onChange={(e) => updateItem(selectedItem.id, { styles: { ...selectedItem.styles, bg: e.target.value } })}
                  className="w-8 h-8 cursor-pointer bg-transparent border-0 p-0 rounded-md"
                />
                <span className="text-xs text-muted-foreground font-mono">
                  {selectedItem.styles.bg.startsWith('#') ? selectedItem.styles.bg : 'Class-based'}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground flex justify-between mb-1">
                <span>Opacity</span>
                <span>{selectedItem.styles.opacity}%</span>
              </label>
              <input
                type="range"
                min="0" max="100"
                value={selectedItem.styles.opacity}
                onChange={(e) => updateItem(selectedItem.id, { styles: { ...selectedItem.styles, opacity: parseInt(e.target.value) } })}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Dimensions</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Col Span (1–{columns})</label>
                <input
                  type="number"
                  min="1" max={columns}
                  value={selectedItem.colSpan}
                  onChange={(e) => updateItem(selectedItem.id, { colSpan: parseInt(e.target.value) || 1 })}
                  className="w-full bg-muted border border-border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Row Span</label>
                <input
                  type="number"
                  min="1"
                  value={selectedItem.rowSpan}
                  onChange={(e) => updateItem(selectedItem.id, { rowSpan: parseInt(e.target.value) || 1 })}
                  className="w-full bg-muted border border-border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Padding */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Padding</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {PADDING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateItem(selectedItem.id, { styles: { ...selectedItem.styles, padding: opt.value } })}
                  className={cn(
                    "py-1.5 rounded-md text-xs font-medium border transition-colors",
                    selectedItem.styles.padding === opt.value
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-muted text-muted-foreground border-border hover:text-foreground hover:border-border/80"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          <div className="p-4 text-center border border-dashed border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Select an item to edit its properties.</p>
          </div>

          {/* Grid Overlays */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium border-b border-border pb-2">Grid Overlays</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer" onClick={toggleRulers}>
                <span className="text-xs text-muted-foreground">Ruler lines</span>
                <div className={cn(
                  "w-8 h-4 rounded-full transition-colors relative",
                  showRulers ? "bg-primary" : "bg-muted border border-border"
                )}>
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                    showRulers ? "translate-x-4" : "translate-x-0.5"
                  )} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer" onClick={toggleGapLines}>
                <span className="text-xs text-muted-foreground">Gap lines</span>
                <div className={cn(
                  "w-8 h-4 rounded-full transition-colors relative",
                  showGapLines ? "bg-primary" : "bg-muted border border-border"
                )}>
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform",
                    showGapLines ? "translate-x-4" : "translate-x-0.5"
                  )} />
                </div>
              </label>
            </div>
          </div>

          {/* Grid Settings */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium border-b border-border pb-2 mb-3">Grid Settings</h3>

            {([
              { label: 'Columns', icon: Columns3, value: columns, unit: '' as const, min: 1, max: 24, step: 1, onChange: setColumns },
              { label: 'Rows', icon: Rows3, value: minRows, unit: '' as const, min: 1, max: 20, step: 1, onChange: setMinRows },
              { label: 'Gap', icon: SeparatorHorizontal, value: gap, unit: 'px' as const, min: 0, max: 64, step: 4, onChange: setGap },
              { label: 'Row Height', icon: RulerIcon, value: rowHeight, unit: 'px' as const, min: 40, max: 400, step: 10, onChange: setRowHeight },
            ]).map(({ label, icon: Icon, value, unit, min, max, step, onChange }) => {
              const isRowHeight = label === 'Row Height'
              const isDisabled = isRowHeight && rowHeightAuto
              return (
                <div key={label} className={cn("flex items-center justify-between py-2 border-b border-border/40 last:border-0 transition-opacity", isDisabled && "opacity-40 pointer-events-none")}>
                  <div className="flex items-center gap-2 w-24 shrink-0">
                    <Icon size={13} className="text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => (onChange as (v: number) => void)(Math.max(min, value - step))}
                      disabled={value <= min || isDisabled}
                      className="w-6 h-6 flex items-center justify-center rounded border border-border bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-mono text-foreground w-14 text-center tabular-nums select-none bg-muted border border-border rounded px-1 py-0.5">
                      {isRowHeight && rowHeightAuto ? 'auto' : `${value}${unit}`}
                    </span>
                    <button
                      onClick={() => (onChange as (v: number) => void)(Math.min(max, value + step))}
                      disabled={value >= max || isDisabled}
                      className="w-6 h-6 flex items-center justify-center rounded border border-border bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Row Height content toggle — shown below the stepper */}
            <div className="flex items-center justify-between py-1.5 pl-5">
              <span className="text-xs text-muted-foreground/70">Size to content</span>
              <button
                onClick={toggleRowHeightAuto}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium transition-colors",
                  rowHeightAuto
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-muted text-muted-foreground border-border hover:text-foreground"
                )}
              >
                <span className={cn(
                  "w-3 h-3 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors",
                  rowHeightAuto ? "bg-primary border-primary" : "border-muted-foreground/50"
                )}>
                  {rowHeightAuto && <span className="w-1.5 h-1 bg-white block rounded-sm" />}
                </span>
                Content
              </button>
            </div>
          </div>
        </div>
      )}
      </aside>
    </div>
  )
}
