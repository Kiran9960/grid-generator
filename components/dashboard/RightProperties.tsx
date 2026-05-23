"use client"

import { useGridStore } from "@/store/useGridStore"

export function RightProperties() {
  const { selectedIds, items, updateItem, updateSelectedItems, columns, gap, rowHeight, setColumns, setGap, setRowHeight } = useGridStore()
  
  const selectedItem = selectedIds.length === 1 ? items.find(item => item.id === selectedIds[0]) : null;
  const isMultiple = selectedIds.length > 1;

  return (
    <aside className="hidden lg:flex w-72 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-col shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-400 text-zinc-500 uppercase tracking-wider">Properties</h2>
      </div>

      {selectedItem ? (
        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Content</h3>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">Title</label>
              <input 
                type="text" 
                value={selectedItem.content.title}
                onChange={(e) => updateItem(selectedItem.id, { content: { ...selectedItem.content, title: e.target.value } })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">Description</label>
              <textarea 
                value={selectedItem.content.description}
                onChange={(e) => updateItem(selectedItem.id, { content: { ...selectedItem.content, description: e.target.value } })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:border-indigo-500 min-h-[80px]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Styling</h3>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">Background Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={selectedItem.styles.bg.startsWith('#') ? selectedItem.styles.bg : '#ffffff'}
                  onChange={(e) => updateItem(selectedItem.id, { styles: { ...selectedItem.styles, bg: e.target.value } })}
                  className="w-8 h-8 cursor-pointer bg-transparent border-0 p-0 rounded-md"
                />
                <span className="text-xs text-zinc-500 font-mono">
                  {selectedItem.styles.bg.startsWith('#') ? selectedItem.styles.bg : 'Class-based'}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 flex justify-between mb-1">
                <span>Opacity</span>
                <span>{selectedItem.styles.opacity}%</span>
              </label>
              <input 
                type="range" 
                min="0" max="100" 
                value={selectedItem.styles.opacity}
                onChange={(e) => updateItem(selectedItem.id, { styles: { ...selectedItem.styles, opacity: parseInt(e.target.value) } })}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Dimensions</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">Col Span (1-{columns})</label>
                <input 
                  type="number" 
                  min="1"
                  max={columns}
                  value={selectedItem.colSpan}
                  onChange={(e) => updateItem(selectedItem.id, { colSpan: parseInt(e.target.value) || 1 })}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">Row Span</label>
                <input 
                  type="number" 
                  min="1"
                  value={selectedItem.rowSpan}
                  onChange={(e) => updateItem(selectedItem.id, { rowSpan: parseInt(e.target.value) || 1 })}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          <div className="p-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">Select an item to edit its properties.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium border-b border-zinc-200 dark:border-zinc-800 pb-2">Grid Settings</h3>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 flex justify-between mb-1">
                <span>Columns</span>
                <span>{columns}</span>
              </label>
              <input 
                type="range" 
                min="1" max="24" 
                value={columns}
                onChange={(e) => setColumns(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 flex justify-between mb-1">
                <span>Gap (px)</span>
                <span>{gap}px</span>
              </label>
              <input 
                type="range" 
                min="0" max="64" 
                value={gap}
                onChange={(e) => setGap(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 dark:text-zinc-500 flex justify-between mb-1">
                <span>Row Height (px)</span>
                <span>{rowHeight}px</span>
              </label>
              <input 
                type="range" 
                min="40" max="400" step="10"
                value={rowHeight}
                onChange={(e) => setRowHeight(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

