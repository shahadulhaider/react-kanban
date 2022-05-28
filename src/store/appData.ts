import { AppState } from "types";

export const appData: AppState = {
  draggedItem: undefined,
  lists: [
    {
      id: "0",
      text: "Backlog",
      tasks: [{ id: "c0", text: "Learn Spanish" }],
    },
    {
      id: "1",
      text: "Todo",
      tasks: [{ id: "c1", text: "Generate app scaffold" }],
    },
    {
      id: "2",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "3",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};
