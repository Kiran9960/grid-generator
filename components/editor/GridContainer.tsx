"use client"

import { useState, useRef, useEffect } from "react"
import { Plus } from "lucide-react"
import { useGridStore } from "@/store/useGridStore"
import { GridItemComponent } from "./GridItemComponent"
import { previewCols, responsiveRowSpan } from "@/lib/responsive"
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
  useDroppable,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
} from '@dnd-kit/sortable'

// Items stay frozen during drag — only the DragOverlay ghost moves.
const stableStrategy: SortingStrategy = () => null


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
  rowHeightAuto,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
  rowHeightAuto: boolean
}) {
  const totalGridH = rows * rowHeight + (rows - 1) * gap

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Vertical column lines — always shown, bleed top/bottom */}
      <div className="absolute left-0 right-0" style={{ top: -2000, height: rowHeightAuto ? 99999 : totalGridH + 4000 }}>
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

      {/* Horizontal row lines — only in fixed-height mode where rows have known height */}
      {!rowHeightAuto && (
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
      )}
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
  rowHeightAuto,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
  rowHeightAuto: boolean
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

      {/* Row height chip — only meaningful in fixed-height mode */}
      {!rowHeightAuto && (
        <div
          className="absolute pointer-events-none flex items-center justify-end pr-1"
          style={{ top: 0, left: -44, width: 40, height: rowHeight }}
          aria-hidden="true"
        >
          <span style={chipStyle}>{rowHeight}px</span>
        </div>
      )}

      {/* Gap chip — shown ONCE on the first gap only */}
      {gap > 0 && rows > 1 && !rowHeightAuto && (
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

interface GridPlacementItem {
  id: string
  row: number
  col: number
  rowSpan: number
  colSpan: number
  start: number
}

function placeGridItems(
  items: { id: string; colSpan?: number; rowSpan?: number }[],
  cols: number,
) {
  const occupied = new Set<number>()
  const placedItems: GridPlacementItem[] = []
  let row = 0
  let col = 0
  let maxRow = 0

  const findNextFreeSlot = () => {
    while (true) {
      if (col >= cols) {
        col = 0
        row++
      }
      if (!occupied.has(row * cols + col)) return
      col++
    }
  }

  for (const item of items) {
    const colSpan = Math.min(Math.max(item.colSpan ?? 1, 1), cols)
    const rowSpan = Math.max(item.rowSpan ?? 1, 1)

    findNextFreeSlot()

    while (true) {
      if (col + colSpan > cols) {
        col = 0
        row++
        findNextFreeSlot()
        continue
      }

      let fits = true
      for (let r = row; r < row + rowSpan && fits; r++) {
        for (let c = col; c < col + colSpan; c++) {
          if (occupied.has(r * cols + c)) {
            fits = false
            break
          }
        }
      }

      if (fits) break
      col++
      findNextFreeSlot()
    }

    const start = row * cols + col
    placedItems.push({
      id: item.id,
      row,
      col,
      rowSpan,
      colSpan,
      start,
    })

    for (let r = row; r < row + rowSpan; r++) {
      for (let c = col; c < col + colSpan; c++) {
        occupied.add(r * cols + c)
      }
      maxRow = Math.max(maxRow, r)
    }

    col += colSpan
    if (col >= cols) {
      col = 0
      row++
    }
  }

  return {
    occupied,
    items: placedItems,
    rows: Math.max(maxRow + 1, 1),
  }
}

function computeOverflowIds(
  placedItems: GridPlacementItem[],
  minRows: number,
) {
  const overflow = new Set<string>()
  for (const item of placedItems) {
    if (item.row >= minRows || item.row + item.rowSpan > minRows) {
      overflow.add(item.id)
    }
  }
  return overflow
}

// Given a target cell index, find the array insertion position that places
// the dragged item as close to that cell as possible.
function cellIndexToInsertPosition(
  items: { id: string; colSpan?: number; rowSpan?: number }[],
  dragId: string,
  cellIndex: number,
  cols: number,
): number {
  const filtered = items.filter((item) => item.id !== dragId)
  const { items: placedItems } = placeGridItems(filtered, cols)

  for (let i = 0; i < placedItems.length; i++) {
    if (placedItems[i].start >= cellIndex) return i
  }

  return placedItems.length
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
            className="absolute -top-0.75 -left-0.75 w-1.5 h-1.5 rounded-full bg-primary/60 z-10 pointer-events-none"
          />
          <button
            className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-150 z-10 cursor-pointer hover:scale-110 hover:shadow-xl hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ pointerEvents: 'auto' }}
            onClick={() => onAddAt(index)}
            title="Add item here"
          >
            <Plus size={15} />
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
  rowHeightAuto,
  onAddAt,
  disabled,
  occupiedCells,
  isDragActive,
}: {
  cols: number
  rows: number
  gap: number
  rowHeight: number
  rowHeightAuto: boolean
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
        gridAutoRows: rowHeightAuto ? 'auto' : `${rowHeight}px`,
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
  const { columns, gap, rowHeight, items, setItems, previewMode, setSelectedIds, showRulers, showGapLines, minRows, rowHeightAuto, setMinRows, setColumns } = useGridStore()
  const [activeId, setActiveId] = useState<string | null>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  // Desktop: always show the full design columns — the canvas is an editor,
  // not a browser. Fluid scaling applies only to preview modes and exported CSS.
  // Tablet/Mobile: simulate device widths via proportional column reduction.
  const activeColumns = previewMode !== 'desktop'
    ? previewCols(columns, previewMode)
    : columns

  // Scale rowSpans for preview modes so the placement algorithm matches CSS rendering
  const scaledItems = activeColumns < columns
    ? items.map(item => ({
        ...item,
        rowSpan: responsiveRowSpan(item.rowSpan, columns, activeColumns),
      }))
    : items

  const placement = placeGridItems(scaledItems, activeColumns)
  const actualPlacement = placeGridItems(items, columns)
  const totalRows = Math.max(placement.rows, minRows)

  useEffect(() => {
    if (actualPlacement.rows > minRows) {
      setMinRows(actualPlacement.rows)
    }

    const maxColSpan = items.reduce((max, item) => Math.max(max, item.colSpan ?? 1), 1)
    if (maxColSpan > columns) {
      setColumns(maxColSpan)
    }
  }, [actualPlacement.rows, minRows, setMinRows, items, columns, setColumns])

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
      past: [...state.past, { items: state.items, columns: state.columns, gap: state.gap, rowHeight: state.rowHeight, rowHeightAuto: state.rowHeightAuto }],
      future: [],
      hasChanges: true,
      selectedIds: [active.id as string],
    }))
  }

  const handleAddAt = (cellIndex: number) => {
    if (items.length >= 12) return

    const placement = placeGridItems(items, activeColumns)
    let insertIndex = items.length
    for (let i = 0; i < placement.items.length; i++) {
      if (placement.items[i].start >= cellIndex) {
        insertIndex = i
        break
      }
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
  const occupiedCells = placement.occupied
  const overflowIds = computeOverflowIds(placement.items, totalRows)
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
          style={{ height: totalGridH ?? undefined, minHeight: rowHeightAuto ? 80 : undefined, overflow: 'visible' }}
        >
          {/* Layer 1: Ruler lines */}
          {showRulers && <RulerLines cols={activeColumns} rows={totalRows} gap={gap} rowHeight={rowHeight} rowHeightAuto={rowHeightAuto} />}

          {/* Layer 1b: Measurement chips */}
          {showRulers && (
            <RulerAnnotations
              cols={activeColumns}
              rows={totalRows}
              gap={gap}
              rowHeight={rowHeight}
              rowHeightAuto={rowHeightAuto}
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
            rowHeightAuto={rowHeightAuto}
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
        {activeItem && (() => {
          const layout = activeItem.content.layout ?? 'text'
          const isImage = layout.startsWith('image')
          const isStat = layout === 'stat'
          const isFeature = layout === 'feature'
          return (
            <div
              className={[
                'rounded-xl border border-primary/60 shadow-2xl rotate-1 scale-[1.03] overflow-hidden pointer-events-none',
                !activeItem.styles.bg.startsWith('#') ? activeItem.styles.bg : '',
                activeItem.styles.textColor,
                !isImage ? activeItem.styles.padding : 'p-0',
              ].join(' ')}
              style={{
                backgroundColor: activeItem.styles.bg.startsWith('#') ? activeItem.styles.bg : undefined,
                opacity: 0.93,
                width: '100%',
                height: `${rowHeight * (activeItem.rowSpan ?? 1) + gap * ((activeItem.rowSpan ?? 1) - 1)}px`,
                backdropFilter: 'blur(2px)',
              }}
            >
              {isImage ? (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: activeItem.content.image ? `url(${activeItem.content.image})` : undefined, backgroundColor: '#18181b' }}
                />
              ) : isStat ? (
                <div className="flex flex-col h-full justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1 truncate">{activeItem.content.statLabel}</p>
                  <p className="font-black tracking-tight leading-none text-2xl truncate">{activeItem.content.stat || activeItem.content.title}</p>
                </div>
              ) : isFeature ? (
                <div className="flex flex-col h-full justify-center gap-2">
                  <span className="text-xl">{activeItem.content.icon || '✦'}</span>
                  <p className="font-bold text-sm line-clamp-1">{activeItem.content.title}</p>
                </div>
              ) : (
                <div className="flex flex-col h-full justify-center gap-1">
                  <p className="font-bold text-sm leading-tight line-clamp-2">{activeItem.content.title}</p>
                  {activeItem.content.description && (
                    <p className="text-xs opacity-55 line-clamp-2">{activeItem.content.description}</p>
                  )}
                </div>
              )}
            </div>
          )
        })()}
      </DragOverlay>
    </DndContext>
  )
}
