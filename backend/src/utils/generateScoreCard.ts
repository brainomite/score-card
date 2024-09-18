import crypto from "crypto";
import { getClient, getKeyName } from "../db/redisClient.js";
import getScoreCardTTL from "./scoreCardTTL.js";
import { SCORE_CARD_TYPE } from "../constants/scoreCard.js";

const createEmptyScoreCard = (
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

export default async (categories: string[], players: string[]) => {
  const id = getKeyName(crypto.randomUUID(), SCORE_CARD_TYPE);
  const scoreCard = createEmptyScoreCard(categories, players);
  const client = getClient();
  await client
    .multi()
    .call("JSON.SET", id, ".", JSON.stringify(scoreCard))
    .expire(id, getScoreCardTTL())
    .exec();
  return id;
};
