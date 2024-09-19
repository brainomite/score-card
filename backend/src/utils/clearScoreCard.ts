import fetchScoreCard from "./fetchScoreCard.js";
import { createEmptyScoreCard } from "./generateScoreCard.js";
import { mergeScoreCard } from "./updateScoreCard.js";

const generateCleanScoreCardFor = async (id: string) => {
  const usedCard = await fetchScoreCard(id);
  const categories = Object.keys(usedCard);
  const players = Object.keys(usedCard[categories[0]]);
  return createEmptyScoreCard(categories, players);
};

export default async (id: string) => {
  const cleanCard = await generateCleanScoreCardFor(id);
  return mergeScoreCard(id, ".", cleanCard);
};
