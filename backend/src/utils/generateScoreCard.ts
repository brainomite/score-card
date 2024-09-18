export default (
  categories: string[],
  players: string[]
): { [category: string]: { [player: string]: number } } => {
  const startingPlayerObj = players.reduce(
    (acc, player) => ({ ...acc, [player]: 0 }),
    {}
  );
  return categories.reduce((acc, category) => {
    return { ...acc, [category]: { ...startingPlayerObj } };
  }, {});
};
