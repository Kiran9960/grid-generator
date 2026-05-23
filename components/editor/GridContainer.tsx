"use client"

import { useGridStore } from "@/store/useGridStore"
import { GridItemComponent } from "./GridItemComponent"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from "react";

export function GridContainer() {
  const { columns, gap, rowHeight, items, setItems, previewMode } = useGridStore()
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeColumns = previewMode === 'mobile' ? 1 : previewMode === 'tablet' ? Math.max(1, Math.floor(columns / 2)) : columns;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts to allow clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      id="grid-dnd-context"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items.map(item => item.id)}
        strategy={rectSortingStrategy}
      >
        <div 
          className="grid w-full h-full transition-all duration-300 ease-in-out"
          style={{
            gridTemplateColumns: `repeat(${activeColumns}, minmax(0, 1fr))`,
            gap: `${gap}px`,
            gridAutoRows: `${rowHeight}px`
          }}
        >
          {items.map((item) => (
            <GridItemComponent 
              key={item.id} 
              item={item} 
              isDragging={activeId === item.id} 
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
