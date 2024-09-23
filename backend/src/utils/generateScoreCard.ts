import crypto from "crypto";
import { getClient, getKeyName } from "../db/redisClient.js";
import getScoreCardTTL from "./scoreCardTTL.js";
import { SCORE_CARD_TYPE } from "../constants/scoreCard.js";

type playerType = { [player: string]: number };
type cardType = { [category: string]: playerType };

export const createEmptyScoreCard = (
  categories: string[],
  players: string[]
): cardType => {
  const startingPlayerObj = players.reduce(
    (acc, player) => ({ ...acc, [player]: 0 }),
    {}
  );
  return categories.reduce((acc, category) => {
    return { ...acc, [category]: { ...startingPlayerObj } };
  }, {});
};

export default async (categories: string[], players: string[]) => {
  const internalID = getKeyName(crypto.randomUUID(), SCORE_CARD_TYPE);
  const scoreCard = createEmptyScoreCard(categories, players);
  const client = getClient();
  await client
    .multi()
    .call("JSON.SET", internalID, ".", JSON.stringify(scoreCard))
    .expire(internalID, getScoreCardTTL())
    .exec();

  return internalID.split(":").at(-1);
};
