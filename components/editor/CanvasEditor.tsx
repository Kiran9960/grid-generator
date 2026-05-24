"use client"

import { useGridStore } from "@/store/useGridStore"
import { GridContainer } from "./GridContainer"
import { MouseEvent, useEffect } from "react"
import { cn } from "@/lib/utils"

export function CanvasEditor() {
  const { clearSelection, previewMode, deleteItems, selectedIds, undo, redo } = useGridStore()

  const handleCanvasClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) clearSelection()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.length > 0) deleteItems(selectedIds)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.shiftKey ? redo() : undo()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') redo()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIds, deleteItems, undo, redo])

  return (
    <div
      className="h-full overflow-y-auto overflow-x-auto"
      style={{
        // Dot pattern canvas background — visible in gaps & empty space
        backgroundImage: `radial-gradient(circle, var(--canvas-dot) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
      onClick={handleCanvasClick}
    >
      <div className="px-8 pt-12 pb-8 md:px-12 md:pt-16 md:pb-12 lg:px-16 lg:pt-20 lg:pb-16 flex justify-center">
        <div
          className={cn(
            "w-full mx-auto transition-all duration-500 ease-in-out",
            previewMode === 'desktop' ? "max-w-6xl" :
            previewMode === 'tablet' ? "max-w-[768px]" :
            "max-w-[375px]"
          )}
        >
          <GridContainer />
        </div>
      </div>
    </div>
  )
}
