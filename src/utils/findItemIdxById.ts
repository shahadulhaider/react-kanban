interface Item {
  id: string;
}

export const findItemIdxById = <T extends Item>(items: T[], id: string) =>
  items.findIndex((item: T) => item.id === id);
