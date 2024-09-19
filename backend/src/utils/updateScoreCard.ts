import { SCORE_CARD_TYPE } from "../constants/scoreCard.js";
import { getClient, getKeyName } from "../db/redisClient.js";
import getScoreCardTTL from "./scoreCardTTL.js";

export const mergeScoreCard = async (
  id: string,
  path: string,
  updateValue: number | object
) => {
  const internalId = getKeyName(id, SCORE_CARD_TYPE);
  const mergeValue =
    typeof updateValue === "object" ? JSON.stringify(updateValue) : updateValue;
  const client = getClient();
  const multiResult = await client
    .multi()
    .call("JSON.MERGE", internalId, path, mergeValue)
    .expire(internalId, getScoreCardTTL())
    .call("JSON.GET", internalId)
    .exec();
  const isMissing = !multiResult;
  if (isMissing) {
    throw new Error("Redis issue");
  }
  const isError = !!multiResult[0][0];
  if (isError) {
    throw new Error(`Card, ${internalId}, not found`);
  }
  const commandPosition = 2;
  const resultPosition = 1;
  const scoreCardJSONString = multiResult[commandPosition][
    resultPosition
  ] as string;
  return JSON.parse(scoreCardJSONString);
};

export default (
  id: string,
  category: string,
  player: string,
  score: number
) => {
  const path = `$.${category}.${player}`;
  return mergeScoreCard(id, path, score);
};
