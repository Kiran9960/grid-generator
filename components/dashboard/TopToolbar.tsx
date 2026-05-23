"use client"

import { useState } from 'react'
import { Save, Code, Download, RefreshCw, Monitor, Tablet, Smartphone, Undo2, Redo2, Plus, Moon, Sun, LayoutGrid, Menu } from 'lucide-react'
import { useGridStore } from '@/store/useGridStore'
import { cn } from '@/lib/utils'
import { ExportModal } from './ExportModal'

export function TopToolbar() {
  const { 
    undo, redo, past, future, 
    previewMode, setPreviewMode, 
    resetLayout, addItem,
    theme, toggleTheme,
    items,
    toggleSidebar
  } = useGridStore()

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleAdd = () => {
    if (items.length >= 12) return;
    
    addItem({
      id: `item-${Date.now()}`,
      colSpan: 4,
      rowSpan: 1,
      content: { title: 'New Item', description: 'Double click to edit' },
      styles: {
        bg: 'bg-zinc-100 dark:bg-zinc-800',
        textColor: 'text-zinc-900 dark:text-white',
        border: 'border-zinc-300 dark:border-zinc-700',
        shadow: 'shadow-none',
        padding: 'p-6',
        align: 'left',
        radius: 'rounded-2xl',
        opacity: 100
      }
    })
  }

  const handleExportCode = () => {
    setIsExportModalOpen(true);
  }

  return (
    <>
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors mr-1"
            >
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <span className="hidden sm:inline font-semibold text-sm mr-4">Grid Builder</span>
          </div>

          {/* History Actions */}
          <div className="hidden sm:flex items-center gap-1 border-l border-zinc-200 dark:border-zinc-800 pl-4">
            <button 
              onClick={undo}
              disabled={past.length === 0}
              className="p-1.5 text-zinc-400 dark:text-zinc-400 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
            </button>
            <button 
              onClick={redo}
              disabled={future.length === 0}
              className="p-1.5 text-zinc-400 dark:text-zinc-400 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={16} />
            </button>
          </div>
        </div>

        {/* Center - Preview Modes */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={() => setPreviewMode('desktop')}
            className={cn("p-1.5 rounded-md transition-colors", previewMode === 'desktop' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')}
            title="Desktop"
          >
            <Monitor size={16} />
          </button>
          <button 
            onClick={() => setPreviewMode('tablet')}
            className={cn("p-1.5 rounded-md transition-colors", previewMode === 'tablet' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')}
            title="Tablet"
          >
            <Tablet size={16} />
          </button>
          <button 
            onClick={() => setPreviewMode('mobile')}
            className={cn("p-1.5 rounded-md transition-colors", previewMode === 'mobile' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')}
            title="Mobile"
          >
            <Smartphone size={16} />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-1.5 text-zinc-400 dark:text-zinc-400 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="w-px h-6 bg-zinc-100 dark:bg-zinc-800 mx-1" />
          <button 
            onClick={handleAdd}
            disabled={items.length >= 12}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2",
              items.length >= 12 
                ? "text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 cursor-not-allowed opacity-50"
                : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
            title={items.length >= 12 ? "Maximum 12 items allowed" : "Add Item"}
          >
            <Plus size={14} /> Add Item
          </button>
          <div className="w-px h-6 bg-zinc-100 dark:bg-zinc-800 mx-1" />
          <button 
            onClick={resetLayout}
            className="px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors flex items-center gap-2"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button 
            onClick={handleExportCode}
            className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <Code size={14} /> Export Code
          </button>
        </div>
      </header>
      
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </>
  )
}
