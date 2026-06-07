"use client"

import { useEffect, useRef } from "react"
import { GridItemLayout } from "@/store/useGridStore"
import { LAYOUT_OPTIONS } from "./GridItemLayouts"
import { cn } from "@/lib/utils"

interface LayoutPickerProps {
  current: GridItemLayout
  onSelect: (layout: GridItemLayout) => void
  onClose: () => void
}

export function LayoutPicker({ current, onSelect, onClose }: LayoutPickerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute top-10 left-0 z-50 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-2 w-[220px]"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1.5 pb-1.5">
        Layout
      </p>
      <div className="grid grid-cols-5 gap-1">
        {LAYOUT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            title={opt.label}
            onClick={() => { onSelect(opt.id); onClose() }}
            className={cn(
              "group flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all duration-150 cursor-pointer",
              current === opt.id
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <div className="w-8 h-6">{opt.icon}</div>
            <span className="text-[9px] font-medium leading-tight text-center truncate w-full">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
