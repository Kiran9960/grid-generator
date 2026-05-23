"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LayoutTemplate,
  Briefcase,
  User,
  Users,
  Box,
  FileText,
  Image as ImageIcon,
  LayoutList,
  CheckSquare,
  ShoppingCart,
  Search,
  X,
} from "lucide-react";
import { useGridStore } from "@/store/useGridStore";
import { PRESET_CATEGORIES, LAYOUT_PRESETS } from "@/lib/presets";

// Define a proper type for icon map to fix the any error
type IconType = React.ElementType;

const iconMap: Record<string, IconType> = {
  LayoutDashboard,
  User,
  Users,
  LayoutList,
  Box,
  Briefcase,
  FileText,
  Image: ImageIcon,
  CheckSquare,
  LayoutTemplate,
  ShoppingCart,
};

export function LeftSidebar() {
  const [search, setSearch] = useState("");
  const { 
    setItems, 
    setColumns, 
    setGap, 
    setRowHeight, 
    isSidebarOpen, 
    toggleSidebar,
    activeCategory,
    setActiveCategory,
    hasChanges,
    setHasChanges,
    setCategoryStates
  } = useGridStore();

  const handleLoadPreset = (presetId: string) => {
    const preset = LAYOUT_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const clonedItems = JSON.parse(JSON.stringify(preset.items));
      setColumns(preset.columns);
      setGap(preset.gap);
      setRowHeight(preset.rowHeight);
      setItems(clonedItems);
      setActiveCategory(preset.categoryId);
      setHasChanges(false);
    }
  };

  const filteredPresets = LAYOUT_PRESETS.filter((p) => {
    const category = PRESET_CATEGORIES.find(c => c.id === p.categoryId);
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      category?.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-72 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-xl lg:bg-zinc-50/50 lg:dark:bg-zinc-950 flex flex-col shrink-0 z-30 transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-zinc-200 dark:border-zinc-800">
          <span className="font-semibold text-sm">Templates</span>
          <button 
            onClick={toggleSidebar}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow shadow-sm"
            />
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 border-y sm:border border-zinc-100 dark:border-zinc-800/60 sm:rounded-lg bg-white dark:bg-zinc-900/30">
            {PRESET_CATEGORIES.map((cat) => {
              const catPresets = filteredPresets.filter(
                (p) => p.categoryId === cat.id,
              );
              if (catPresets.length === 0) return null;

              const Icon = iconMap[cat.icon] || LayoutTemplate;

              const isSelected = activeCategory === cat.id;

              return (
                <div key={cat.id} className="px-2 py-1">
                  <a
                    href={`#${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();

                      const state = useGridStore.getState();
                      
                      // Save current state for the current active category
                      if (state.activeCategory) {
                        const newCategoryStates = { ...state.categoryStates };
                        newCategoryStates[state.activeCategory] = {
                          columns: state.columns,
                          gap: state.gap,
                          rowHeight: state.rowHeight,
                          items: state.items
                        };
                        setCategoryStates(newCategoryStates);
                      }

                      setActiveCategory(cat.id);

                      // Try to load saved state for the new category
                      const stateAfterUpdate = useGridStore.getState();
                      const savedState = stateAfterUpdate.categoryStates[cat.id];
                      
                      if (savedState) {
                        setColumns(savedState.columns);
                        setGap(savedState.gap);
                        setRowHeight(savedState.rowHeight);
                        setItems(savedState.items);
                        // We still consider it as having changes since it's a restored unsaved state
                        setHasChanges(true);
                      } else if (catPresets.length > 0) {
                        handleLoadPreset(catPresets[0].id);
                      }
                      
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg group transition-colors ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-500/10"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className={`p-1.5 rounded-md transition-colors ${
                      isSelected
                        ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                    }`}>
                      <Icon size={16} />
                    </div>
                    <h3 className={`text-sm font-medium transition-colors ${
                      isSelected
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                    }`}>
                      {cat.name}
                    </h3>
                  </a>
                </div>
              );
            })}
            {filteredPresets.length === 0 && (
              <div className="text-center text-zinc-400 dark:text-zinc-500 text-sm py-8 bg-white dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                No layouts found matching <br />
                <span className="font-medium text-zinc-600 dark:text-zinc-300 mt-1 inline-block">
                  "{search}"
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}