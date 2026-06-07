"use client";

import { useGridStore, GridItem } from "@/store/useGridStore";
import { responsiveSpan, responsiveRowSpan, responsivePadding, previewCols } from "@/lib/responsive";
import { cn, autoTextColor } from "@/lib/utils";
import { MouseEvent, PointerEvent, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Copy } from "lucide-react";
import { GridItemLayoutRenderer } from "./GridItemLayouts";

interface GridItemProps {
  item: GridItem;
  isOverflow?: boolean;
}

export function GridItemComponent({ item, isOverflow = false }: GridItemProps) {
  const {
    selectedIds,
    setSelectedIds,
    toggleSelection,
    updateItem,
    deleteItems,
    duplicateItem,
    columns,
    gap,
    rowHeight,
    rowHeightAuto,
    previewMode,
    theme,
  } = useGridStore();

  const isSelected = selectedIds.includes(item.id);
  const [dragSpan, setDragSpan] = useState<{ colSpan: number; rowSpan: number } | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: item.id });

  const currentLayout = item.content.layout ?? 'text';

  // Compute proportional span: preserve fractional width across column counts.
  // previewCols gives the simulated column count for tablet/mobile modes;
  // in desktop mode we use base columns (GridContainer's ResizeObserver handles
  // the actual rendered column count independently).
  const effectiveCols = previewMode !== 'desktop'
    ? previewCols(columns, previewMode)
    : columns

  const rawColSpan = dragSpan?.colSpan ?? item.colSpan;
  const rawRowSpan = dragSpan?.rowSpan ?? item.rowSpan;
  const currentColSpan = responsiveSpan(rawColSpan, columns, effectiveCols, currentLayout);
  const currentRowSpan = responsiveRowSpan(rawRowSpan, columns, effectiveCols);

  const isPaddingless =
    currentLayout === 'image-full' ||
    currentLayout === 'image-overlay' ||
    currentLayout === 'image-left' ||
    currentLayout === 'image-right' ||
    currentLayout === 'image-top' ||
    currentLayout === 'image-bottom';

  // image-full and image-overlay use position:absolute — no intrinsic height.
  // In auto-row mode the grid row collapses to 0; anchor it with a min-height
  // derived from the preset rowHeight × rowSpan so the row sizes correctly.
  const isAbsoluteImage = currentLayout === 'image-full' || currentLayout === 'image-overlay';
  const imageMinHeight = rowHeightAuto && isAbsoluteImage
    ? rowHeight * (item.rowSpan ?? 1) + gap * ((item.rowSpan ?? 1) - 1)
    : undefined;

  const computedTextColor = autoTextColor(item.styles.bg, theme === 'dark')

  const style: React.CSSProperties = {
    transform: isSortableDragging ? undefined : CSS.Transform.toString(transform),
    transition: isSortableDragging ? undefined : dragSpan ? "none" : transition,
    gridColumn: `span ${currentColSpan}`,
    gridRow: `span ${currentRowSpan}`,
    zIndex: isSortableDragging ? 50 : dragSpan ? 40 : isSelected ? 10 : 1,
    opacity: isSortableDragging ? 0.15 : isOverflow ? 0.4 : item.styles.opacity / 100,
    backgroundColor: item.styles.bg.startsWith("#") ? item.styles.bg : undefined,
    color: computedTextColor,
    minHeight: imageMinHeight,
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey) toggleSelection(item.id);
    else setSelectedIds([item.id]);
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteItems([item.id]);
  };

  const handleDuplicate = (e: MouseEvent) => {
    e.stopPropagation();
    duplicateItem(item.id);
  };

  const handleResizePointerDown = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startColSpan = item.colSpan;
    const startRowSpan = item.rowSpan;
    const parent = document.getElementById("grid-items-container") as HTMLElement;
    if (!parent) return;
    const colWidth = (parent.clientWidth - (columns - 1) * gap) / columns;
    let currentNewColSpan = startColSpan;
    let currentNewRowSpan = startRowSpan;

    const onPointerMove = (moveEvent: globalThis.PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      currentNewColSpan = Math.max(1, Math.min(columns, startColSpan + Math.round(deltaX / (colWidth + gap))));
      currentNewRowSpan = Math.max(1, startRowSpan + Math.round(deltaY / (rowHeight + gap)));
      setDragSpan({ colSpan: currentNewColSpan, rowSpan: currentNewRowSpan });
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      setDragSpan(null);
      if (currentNewColSpan !== startColSpan || currentNewRowSpan !== startRowSpan) {
        updateItem(item.id, { colSpan: currentNewColSpan, rowSpan: currentNewRowSpan });
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      {...attributes}
      {...listeners}
      className={cn(
        "group @container relative overflow-hidden transition-all duration-150 cursor-grab active:cursor-grabbing min-h-0 min-w-0",
        isSortableDragging
          ? "border-dashed border-primary/40 bg-primary/5 shadow-none!"
          : cn(
              !item.styles.bg.startsWith("#") && item.styles.bg,
              item.styles.textColor,
              item.styles.shadow,
              isSelected
                ? "border-primary/60 ring-2 ring-primary/20 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
                : cn(item.styles.border, "hover:border-primary/40"),
            ),
        item.styles.radius,
        isPaddingless ? "p-0" : responsivePadding(item.styles.padding),
        item.styles.align === "center" ? "text-center"
          : item.styles.align === "right" ? "text-right"
          : "text-left",
      )}
    >
      {/* Overflow badge */}
      {isOverflow && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-start justify-center pt-3">
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/90 text-white shadow-sm">
            Out of grid
          </span>
        </div>
      )}

      {/* ── Top-right toolbar: Duplicate + Delete ── */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150 z-20">
        <button
          onClick={handleDuplicate}
          className="p-1.5 rounded-md bg-background/80 text-muted-foreground hover:text-primary hover:bg-primary/10 shadow-sm backdrop-blur-sm border border-border/50 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          title="Duplicate"
        >
          <Copy size={13} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-md bg-background/80 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 shadow-sm backdrop-blur-sm border border-border/50 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* ── Content ── */}
      <GridItemLayoutRenderer item={item} isPaddingless={isPaddingless} />

      {/* ── Resize handle ── */}
      <div
        onPointerDown={handleResizePointerDown}
        className="absolute bottom-1 right-1 w-6 h-6 cursor-se-resize flex items-center justify-center text-muted-foreground hover:text-foreground z-50 transition-colors duration-150 opacity-0 group-hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <circle cx="19" cy="19" r="1.5" />
          <circle cx="14" cy="19" r="1.5" />
          <circle cx="19" cy="14" r="1.5" />
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="19" cy="9" r="1.5" />
          <circle cx="14" cy="14" r="1.5" />
        </svg>
      </div>
    </div>
  );
}
