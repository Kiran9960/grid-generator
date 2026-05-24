"use client"

import { useGridStore } from "@/store/useGridStore"
import { GridItemComponent } from "./GridItemComponent"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
} from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'

// Items stay frozen during drag — only the DragOverlay ghost moves.
// Reorder commits on drop via handleDragEnd.
const stableStrategy: SortingStrategy = () => null
import { useState, useRef, useEffect } from "react"
import { Plus } from "lucide-react"


const chipStyle: React.CSSProperties = {
  background: 'var(--ruler-chip-bg)',
  color: 'var(--ruler-chip-text)',
  fontSize: '9px',
  fontFamily: 'ui-monospace, monospace',
  fontWeight: 500,
  lineHeight: 1,
  padding: '2px 5px',
  borderRadius: '3px',
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
}

function RulerLines({
  cols,
  rows,
  gap,
  rowHeight,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
}) {
  const totalGridH = rows * rowHeight + (rows - 1) * gap

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Vertical column lines — bleed top/bottom */}
      <div className="absolute left-0 right-0" style={{ top: -2000, height: totalGridH + 4000 }}>
        <div
          className="w-full h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            columnGap: `${gap}px`,
          }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                borderLeft: '1px dashed var(--ruler-line)',
                borderRight: i === cols - 1 ? '1px dashed var(--ruler-line)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizontal row lines — bleed left/right */}
      <div className="absolute top-0" style={{ left: -2000, right: -2000, height: totalGridH }}>
        <div
          className="w-full h-full"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
            rowGap: `${gap}px`,
          }}
        >
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              style={{
                borderTop: '1px dashed var(--ruler-line)',
                borderBottom: i === rows - 1 ? '1px dashed var(--ruler-line)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Annotation chips rendered in their own layer using the same grid as items.
// Avoids bleed-relative positioning which gets clipped by overflow:hidden parents.
function RulerAnnotations({
  cols,
  rows,
  gap,
  rowHeight,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
}) {
  return (
    <>
      {/* Column chips — one "1fr" chip per column, shown once above the grid */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: -20,
          height: 16,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          columnGap: `${gap}px`,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <span style={chipStyle}>1fr</span>
          </div>
        ))}
      </div>

      {/* Row height chip — shown ONCE on the first row only */}
      <div
        className="absolute pointer-events-none flex items-center justify-end pr-1"
        style={{ top: 0, left: -44, width: 40, height: rowHeight }}
        aria-hidden="true"
      >
        <span style={chipStyle}>{rowHeight}px</span>
      </div>

      {/* Gap chip — shown ONCE on the first gap only */}
      {gap > 0 && rows > 1 && (
        <div
          className="absolute pointer-events-none flex items-center justify-end pr-1"
          style={{ top: rowHeight, left: -44, width: 40, height: gap }}
          aria-hidden="true"
        >
          <span style={{ ...chipStyle, background: 'var(--gap-chip-bg)', color: 'var(--gap-chip-text)' }}>
            {gap}px
          </span>
        </div>
      )}
    </>
  )
}

// Blue lines showing exactly where the gap strips are
function GapLines({
  cols,
  rows,
  gap,
  rowHeight,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
}) {
  if (gap === 0) return null
  const totalGridH = rows * rowHeight + (rows - 1) * gap

  // Build interleaved template: "1fr Npx 1fr Npx ... 1fr"
  const colTemplate = Array.from({ length: cols }, (_, i) =>
    i < cols - 1 ? `1fr ${gap}px` : '1fr'
  ).join(' ')

  const rowTemplate = Array.from({ length: rows }, (_, i) =>
    i < rows - 1 ? `${rowHeight}px ${gap}px` : `${rowHeight}px`
  ).join(' ')

  const totalColCells = cols * 2 - 1  // 1fr + gap cols interleaved
  const totalRowCells = rows * 2 - 1

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Vertical blue gap strips */}
      <div
        className="absolute left-0 right-0"
        style={{ top: -2000, height: totalGridH + 4000, display: 'grid', gridTemplateColumns: colTemplate }}
      >
        {Array.from({ length: totalColCells }).map((_, i) => (
          <div
            key={i}
            style={i % 2 === 1 ? { background: 'var(--gap-strip)' } : undefined}
          />
        ))}
      </div>

      {/* Horizontal blue gap strips */}
      <div
        className="absolute top-0"
        style={{ left: -2000, right: -2000, height: totalGridH, display: 'grid', gridTemplateRows: rowTemplate }}
      >
        {Array.from({ length: totalRowCells }).map((_, i) => (
          <div
            key={i}
            style={i % 2 === 1 ? { background: 'var(--gap-strip)' } : undefined}
          />
        ))}
      </div>
    </div>
  )
}

// Returns the set of flat cell indices occupied by items (accounting for colSpan)
function computeOccupiedCells(items: { colSpan?: number }[], cols: number): Set<number> {
  const occupied = new Set<number>()
  let col = 0, row = 0
  for (const item of items) {
    const span = Math.min(item.colSpan ?? 1, cols)
    if (col + span > cols) { col = 0; row++ }
    for (let c = col; c < col + span; c++) {
      occupied.add(row * cols + c)
    }
    col += span
    if (col >= cols) { col = 0; row++ }
  }
  return occupied
}

// Returns IDs of items whose flow position starts at or beyond minRows
function computeOverflowIds(items: { id: string; colSpan?: number }[], cols: number, minRows: number): Set<string> {
  const overflow = new Set<string>()
  let col = 0, row = 0
  for (const item of items) {
    const span = Math.min(item.colSpan ?? 1, cols)
    if (col + span > cols) { col = 0; row++ }
    if (row >= minRows) overflow.add(item.id)
    col += span
    if (col >= cols) { col = 0; row++ }
  }
  return overflow
}

// Given a target cell index, find the array insertion position that places
// the dragged item as close to that cell as possible.
function cellIndexToInsertPosition(
  items: { id: string; colSpan?: number }[],
  dragId: string,
  cellIndex: number,
  cols: number,
): number {
  // Walk items (excluding dragged) to find which slot maps to cellIndex
  let col = 0, row = 0
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === dragId) continue
    const span = Math.min(items[i].colSpan ?? 1, cols)
    if (col + span > cols) { col = 0; row++ }
    const itemStart = row * cols + col
    if (itemStart >= cellIndex) return i
    col += span
    if (col >= cols) { col = 0; row++ }
  }
  return items.length
}

function DroppableCell({
  index,
  isEmpty,
  isDragActive,
  onAddAt,
  disabled,
}: {
  index: number
  isEmpty: boolean
  isDragActive: boolean
  onAddAt: (i: number) => void
  disabled: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `cell-${index}`, disabled: !isEmpty || !isDragActive })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={setNodeRef}
      className="relative"
      style={{ pointerEvents: isEmpty ? 'auto' : 'none' }}
      onMouseEnter={() => isEmpty && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drop target highlight */}
      {isOver && isDragActive && (
        <div className="absolute inset-0 rounded-lg border-2 border-dashed border-primary bg-primary/10 z-10 pointer-events-none" />
      )}
      {/* Add button (only when not dragging) */}
      {hovered && isEmpty && !disabled && !isDragActive && (
        <>
          <div
            className="absolute -top-0.75 -left-0.75 w-1.5 h-1.5 rounded-full z-10 pointer-events-none"
            style={{ background: 'var(--ruler-line)' }}
          />
          <button
            className="absolute inset-0 m-auto w-9 h-9 rounded-full text-white flex items-center justify-center shadow-xl transition-all duration-150 z-10 cursor-pointer hover:scale-110"
            style={{ background: 'rgba(244,63,94,0.85)', pointerEvents: 'auto' }}
            onClick={() => onAddAt(index)}
            title="Add item here"
          >
            <Plus size={16} />
          </button>
        </>
      )}
    </div>
  )
}

function CellOverlay({
  cols,
  rows,
  gap,
  rowHeight,
  onAddAt,
  disabled,
  occupiedCells,
  isDragActive,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
  onAddAt: (cellIndex: number) => void
  disabled: boolean
  occupiedCells: Set<number>
  isDragActive: boolean
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        gridAutoRows: `${rowHeight}px`,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <DroppableCell
          key={i}
          index={i}
          isEmpty={!occupiedCells.has(i)}
          isDragActive={isDragActive}
          onAddAt={onAddAt}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export function GridContainer() {
  const { columns, gap, rowHeight, items, setItems, previewMode, setSelectedIds, showRulers, showGapLines, minRows, rowHeightAuto } = useGridStore()
  const [activeId, setActiveId] = useState<string | null>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  const activeColumns = previewMode === 'mobile' ? 1
    : previewMode === 'tablet' ? Math.max(1, Math.floor(columns / 2))
    : columns

  const totalRows = Math.max(
    Math.ceil(items.reduce((acc, item) => acc + (item.colSpan ?? 1), 0) / activeColumns),
    minRows
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const overId = over.id.toString()
    const oldIndex = items.findIndex((item) => item.id === active.id)

    let reordered: typeof items

    if (overId.startsWith('cell-')) {
      // Dropped on an empty cell — insert at the position closest to that cell
      const cellIndex = parseInt(overId.replace('cell-', ''), 10)
      const insertPos = cellIndexToInsertPosition(items, active.id as string, cellIndex, activeColumns)
      const without = items.filter((item) => item.id !== active.id)
      without.splice(insertPos, 0, items[oldIndex])
      reordered = without
    } else {
      // Dropped on another item — standard reorder
      const newIndex = items.findIndex((item) => item.id === overId)
      reordered = arrayMove(items, oldIndex, newIndex)
    }

    useGridStore.setState((state) => ({
      items: reordered,
      past: [...state.past, { items: state.items, columns: state.columns, gap: state.gap, rowHeight: state.rowHeight }],
      future: [],
      hasChanges: true,
      selectedIds: [active.id as string],
    }))
  }

  const handleAddAt = (cellIndex: number) => {
    if (items.length >= 12) return

    let cumulative = 0
    let insertIndex = items.length
    for (let i = 0; i < items.length; i++) {
      if (cumulative >= cellIndex) { insertIndex = i; break }
      cumulative += items[i].colSpan ?? 1
    }

    const newItems = [...items]
    newItems.splice(insertIndex, 0, {
      id: `item-${Date.now()}`,
      colSpan: 1,
      rowSpan: 1,
      content: { title: 'New Item', description: 'Double click to edit' },
      styles: {
        bg: 'bg-card',
        textColor: 'text-foreground',
        border: 'border-border',
        shadow: 'shadow-none',
        padding: 'p-6',
        align: 'left',
        radius: 'rounded-xl',
        opacity: 100,
      },
    })
    setItems(newItems)
  }

  const gridStyle = {
    gridTemplateColumns: `repeat(${activeColumns}, minmax(0, 1fr))`,
    gap: `${gap}px`,
    gridAutoRows: rowHeightAuto ? 'auto' : `${rowHeight}px`,
  }

  const totalGridH = rowHeightAuto
    ? undefined  // height is determined by content when auto
    : totalRows * rowHeight + (totalRows - 1) * gap
  const occupiedCells = computeOccupiedCells(items, activeColumns)
  const overflowIds = computeOverflowIds(items, activeColumns, minRows)
  const activeItem = activeId ? items.find((item) => item.id === activeId) : null
  const isDragActive = activeId !== null

  return (
    <DndContext
      id="grid-dnd-context"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={stableStrategy}>
        <div
          className="relative w-full transition-all duration-300 ease-in-out"
          style={{ height: totalGridH ?? undefined, minHeight: rowHeightAuto ? 80 : undefined, backgroundColor: 'var(--ruler-gap)', overflow: 'visible' }}
        >
          {/* Layer 1: Ruler lines */}
          {showRulers && !rowHeightAuto && <RulerLines cols={activeColumns} rows={totalRows} gap={gap} rowHeight={rowHeight} />}

          {/* Layer 1b: Measurement chips */}
          {showRulers && !rowHeightAuto && (
            <RulerAnnotations
              cols={activeColumns}
              rows={totalRows}
              gap={gap}
              rowHeight={rowHeight}
            />
          )}

          {/* Layer 2: Gap strips */}
          {showGapLines && <GapLines cols={activeColumns} rows={totalRows} gap={gap} rowHeight={rowHeight} />}

          {/* Layer 3: Cell hover overlay — below items */}
          <CellOverlay
            cols={activeColumns}
            rows={totalRows}
            gap={gap}
            rowHeight={rowHeight}
            onAddAt={handleAddAt}
            disabled={items.length >= 12}
            occupiedCells={occupiedCells}
            isDragActive={isDragActive}
          />

          {/* Layer 4: Items — always on top and interactive */}
          <div
            ref={gridContainerRef}
            id="grid-items-container"
            className="relative grid w-full h-full"
            style={{ ...gridStyle, zIndex: 1 }}
          >
            {items.map((item) => (
              <GridItemComponent
                key={item.id}
                item={item}
                isOverflow={overflowIds.has(item.id)}
              />
            ))}
          </div>
        </div>
      </SortableContext>

      {/* Floating drag ghost — follows cursor */}
      <DragOverlay
        dropAnimation={{
          duration: 180,
          easing: 'ease',
          sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.15' } } }),
        }}
      >
        {activeItem && (
          <div
            className={[
              'rounded-xl border-2 border-primary shadow-2xl rotate-1 scale-105 overflow-hidden pointer-events-none',
              !activeItem.styles.bg.startsWith('#') ? activeItem.styles.bg : '',
              activeItem.styles.textColor,
              activeItem.styles.padding,
            ].join(' ')}
            style={{
              backgroundColor: activeItem.styles.bg.startsWith('#') ? activeItem.styles.bg : undefined,
              opacity: 0.92,
              width: '100%',
              height: `${rowHeight * (activeItem.rowSpan ?? 1) + gap * ((activeItem.rowSpan ?? 1) - 1)}px`,
            }}
          >
            <p className="font-bold text-sm leading-tight mb-1 line-clamp-1">{activeItem.content.title}</p>
            <p className="text-xs opacity-60 line-clamp-2">{activeItem.content.description}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
