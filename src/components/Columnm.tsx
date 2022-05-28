import { AddNewItem } from "components/AddNewItem";
import { Card } from "components/Card";
import { useAppstate } from "hooks/useAppState";
import { useItemDrag } from "hooks/useItemDrag";
import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { ColumnContainer, ColumnTitle } from "styles";
import { DragItem } from "types";
import { isHidden } from "utils";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ id, index, text, isPreview }: ColumnProps) => {
  const [showAddButton, setShowAddButton] = useState(false);

  const { state, dispatch } = useAppstate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index === 0 || index === 1) {
      setShowAddButton(true);
    }
  }, [index]);

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem): void {
      if (item.type === "COLUMN") {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        dispatch({
          type: "MOVE_LIST",
          payload: {
            dragIndex,
            hoverIndex,
          },
        });

        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumn = item.columnId;
        const targetColumn = id;

        if (sourceColumn === targetColumn) {
          return;
        }

        dispatch({
          type: "MOVE_TASK",
          payload: {
            dragIndex,
            hoverIndex,
            sourceColumn,
            targetColumn,
          },
        });
        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          id={task.id}
          columnId={id}
          text={task.text}
          key={task.id}
          index={i}
        />
      ))}
      {showAddButton && (
        <AddNewItem
          toggleButtonText="+ Add another task"
          onAdd={(text) =>
            dispatch({
              type: "ADD_TASK",
              payload: {
                text,
                columnId: id,
              },
            })
          }
          dark
        />
      )}
    </ColumnContainer>
  );
};
