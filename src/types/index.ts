export type Status = "Backlog" | "Todo" | "In Progress" | "Done";

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItem | undefined;
}

export type ColumnDragItem = {
  index: number;
  id: string;
  text: string;
  type: "COLUMN";
};

export type CardDragItem = {
  index: number;
  id: String;
  columnId: string;
  text: string;
  type: "CARD";
};

export type DragItem = ColumnDragItem | CardDragItem;
