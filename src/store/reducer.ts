import { nanoid } from "nanoid";
import { Action } from "store";
import { AppState } from "types";
import { findItemIdxById, moveItem } from "utils";

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_DRAGGED_ITEM": {
      return {
        ...state,
        draggedItem: action.payload,
      };
    }
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: nanoid(),
            text: action.payload,
            tasks: [],
          },
        ],
      };
    }

    case "ADD_TASK": {
      const targetIdx = findItemIdxById(state.lists, action.payload.columnId);

      state.lists[targetIdx].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      });

      return {
        ...state,
      };
    }

    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;

      state.lists = moveItem(state.lists, dragIndex, hoverIndex);

      return {
        ...state,
      };
    }

    case "MOVE_TASK": {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } =
        action.payload;

      const sourceLaneIndex = findItemIdxById(state.lists, sourceColumn);
      const targetLaneIndex = findItemIdxById(state.lists, targetColumn);

      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);

      return { ...state };
    }

    default: {
      return state;
    }
  }
};
