import React from "react";
import {
  DndContext,
  closestCenter,
  // KeyboardSensor,/
  // PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  // DragEndEvent,
} from "@dnd-kit/core";
import {
  // arrayMove,
  SortableContext,
  // sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const SortableContainer = (props) => {
  const { children, items, onDragEnd } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //8px => 表明如果鼠标点击+移动8px，则判断为拖拽行为，否则不算拖拽行为
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over == null) return;

    if (active.id !== over.id) {
      const oldIndex = items.find((c) => c.fe_id === active.id);
      const newIndex = items.find((c) => c.fe_id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
