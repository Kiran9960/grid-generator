"use client";

import { useGridStore, GridItem } from "@/store/useGridStore";
import { cn } from "@/lib/utils";
import { MouseEvent, PointerEvent, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Type, Image as ImageIcon, Eraser } from "lucide-react";

interface GridItemProps {
  item: GridItem;
  isDragging?: boolean;
}

export function GridItemComponent({ item, isDragging }: GridItemProps) {
  const {
    selectedIds,
    setSelectedIds,
    toggleSelection,
    updateItem,
    deleteItems,
    columns,
    gap,
    rowHeight,
    previewMode,
  } = useGridStore();
  const isSelected = selectedIds.includes(item.id);

  const [dragSpan, setDragSpan] = useState<{
    colSpan: number;
    rowSpan: number;
  } | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: item.id });

  const isMobile = previewMode === "mobile";
  const isTablet = previewMode === "tablet";

  const gridColumns = isMobile
    ? 1
    : isTablet
      ? Math.max(1, Math.floor(columns / 2))
      : columns;

  const rawColSpan = dragSpan?.colSpan ?? item.colSpan;
  const currentColSpan = Math.min(gridColumns, rawColSpan);
  const currentRowSpan = dragSpan?.rowSpan ?? item.rowSpan;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition:
      isSortableDragging || isDragging
        ? transition
        : dragSpan
          ? "none"
          : transition,
    gridColumn: `span ${currentColSpan} / span ${currentColSpan}`,
    gridRow: `span ${currentRowSpan} / span ${currentRowSpan}`,
    zIndex:
      isSortableDragging || isDragging
        ? 50
        : dragSpan
          ? 40
          : isSelected
            ? 10
            : 1,
    opacity: isSortableDragging || isDragging ? 0.5 : item.styles.opacity / 100,
    backgroundColor: item.styles.bg.startsWith("#")
      ? item.styles.bg
      : undefined,
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey) {
      toggleSelection(item.id);
    } else {
      setSelectedIds([item.id]);
    }
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteItems([item.id]);
  };

  const handleSetContentType = (
    e: MouseEvent,
    type: "text" | "image" | "empty",
  ) => {
    e.stopPropagation();
    updateItem(item.id, {
      content: { ...item.content, contentType: type },
    });
  };

  const handleResizePointerDown = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startColSpan = item.colSpan;
    const startRowSpan = item.rowSpan;

    const target = e.currentTarget as HTMLElement;
    const parent = target.closest(".grid") as HTMLElement;
    if (!parent) return;

    const colWidth = (parent.clientWidth - (columns - 1) * gap) / columns;

    let currentNewColSpan = startColSpan;
    let currentNewRowSpan = startRowSpan;

    const onPointerMove = (moveEvent: globalThis.PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const newColSpan = Math.max(
        1,
        Math.min(columns, startColSpan + Math.round(deltaX / (colWidth + gap))),
      );
      const newRowSpan = Math.max(
        1,
        startRowSpan + Math.round(deltaY / (rowHeight + gap)),
      );

      currentNewColSpan = newColSpan;
      currentNewRowSpan = newRowSpan;

      setDragSpan({ colSpan: newColSpan, rowSpan: newRowSpan });
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      setDragSpan(null);
      if (
        currentNewColSpan !== startColSpan ||
        currentNewRowSpan !== startRowSpan
      ) {
        updateItem(item.id, {
          colSpan: currentNewColSpan,
          rowSpan: currentNewRowSpan,
        });
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
        "group @container relative overflow-hidden transition-all duration-200 cursor-grab active:cursor-grabbing border-2",
        !item.styles.bg.startsWith("#") && item.styles.bg,
        item.styles.textColor,
        item.styles.radius,
        item.styles.shadow,
        item.content.contentType === "image" ? "p-0" : item.styles.padding,
        isSelected
          ? "border-indigo-500 ring-4 ring-indigo-500/20"
          : cn(item.styles.border, "hover:border-indigo-500/50"),
        item.styles.align === "center"
          ? "text-center"
          : item.styles.align === "right"
            ? "text-right"
            : "text-left",
      )}
    >
      {/* Content Simulator Controls - Top Left */}
      <div className="absolute top-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-20">
        <button
          onClick={(e) => handleSetContentType(e, "text")}
          className={cn(
            "p-1.5 rounded-md backdrop-blur-sm transition-all shadow-sm border",
            item.content.contentType !== "image" &&
              item.content.contentType !== "empty"
              ? "bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
              : "bg-white/80 dark:bg-zinc-900/80 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800",
          )}
          title="Text Content"
        >
          <Type size={14} />
        </button>
        <button
          onClick={(e) => handleSetContentType(e, "image")}
          className={cn(
            "p-1.5 rounded-md backdrop-blur-sm transition-all shadow-sm border",
            item.content.contentType === "image"
              ? "bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
              : "bg-white/80 dark:bg-zinc-900/80 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800",
          )}
          title="Image Content"
        >
          <ImageIcon size={14} />
        </button>
        <button
          onClick={(e) => handleSetContentType(e, "empty")}
          className={cn(
            "p-1.5 rounded-md backdrop-blur-sm transition-all shadow-sm border",
            item.content.contentType === "empty"
              ? "bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
              : "bg-white/80 dark:bg-zinc-900/80 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800",
          )}
          title="Clear Content"
        >
          <Eraser size={14} />
        </button>
      </div>

      {/* Delete Button - Top Right */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 dark:bg-zinc-900/80 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 opacity-0 group-hover:opacity-100 transition-all z-20 shadow-sm backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50"
        title="Delete item"
      >
        <Trash2 size={14} />
      </button>

      {/* Content Area */}
      <div
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          item.content.contentType !== "image"
            ? "pointer-events-none"
            : "pointer-events-none",
        )}
      >
        {item.content.contentType === "image" ? (
          <div
            className="absolute inset-0 w-full h-full bg-zinc-200 dark:bg-zinc-800 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80)`,
            }}
          />
        ) : item.content.contentType === "empty" ? (
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700/50 rounded-lg opacity-50">
            <span className="text-zinc-400 dark:text-zinc-500 text-sm font-medium tracking-wider uppercase">
              Empty
            </span>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden justify-center">
            <h3 className="font-bold tracking-tight mb-1 @min-[200px]:mb-2 text-base @min-[200px]:text-lg @min-[300px]:text-xl @min-[400px]:text-2xl shrink-0 line-clamp-1 @min-[200px]:line-clamp-2">
              {item.content.title}
            </h3>
            <p className="opacity-80 text-xs @min-[200px]:text-sm @min-[300px]:text-base line-clamp-2 @min-[200px]:line-clamp-3 @min-[300px]:line-clamp-4 @min-[400px]:line-clamp-5">
              {item.content.description}
            </p>
          </div>
        )}
      </div>

      {/* Drag to Resize Handle - Bottom Right */}
      <div
        onPointerDown={handleResizePointerDown}
        className="absolute bottom-1 right-1 w-6 h-6 cursor-se-resize flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 z-[100] transition-colors opacity-0 group-hover:opacity-100"
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
