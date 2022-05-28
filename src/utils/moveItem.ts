export const moveItem = <T>(lists: T[], from: number, to: number) => {
  const startIdx = to < 0 ? lists.length + to : to;
  const item = lists.splice(from, 1)[0];
  lists.splice(startIdx, 0, item);

  return lists;
};
