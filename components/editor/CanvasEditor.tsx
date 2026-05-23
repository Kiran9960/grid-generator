"use client"

import { useGridStore } from "@/store/useGridStore"
import { GridContainer } from "./GridContainer"
import { MouseEvent, useEffect } from "react"
import { cn } from "@/lib/utils"

export function CanvasEditor() {
  const { clearSelection, previewMode, deleteItems, selectedIds, undo, redo } = useGridStore()

  const handleCanvasClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      clearSelection()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.length > 0) {
          deleteItems(selectedIds)
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIds, deleteItems, undo, redo])

  return (
    <div 
      className="h-full p-8 md:p-12 lg:p-24 flex items-start justify-center overflow-auto"
      onClick={handleCanvasClick}
    >
      <div 
        className={cn(
          "w-full h-full mx-auto transition-all duration-500 ease-in-out relative",
          previewMode === 'desktop' ? "max-w-6xl" :
          previewMode === 'tablet' ? "max-w-[768px]" :
          "max-w-[375px]" // Mobile
        )}
      >
        <GridContainer />
      </div>
    </div>
  )
}
