import { SCORE_CARD_TYPE } from "../constants/scoreCard.js";
import { getClient, getKeyName } from "../db/redisClient.js";

export default async (id: string) => {
  const client = getClient();
  const rawScoreCard = (await client.call(
    "JSON.GET",
    getKeyName(id, SCORE_CARD_TYPE)
  )) as string;
  const scoreCard = JSON.parse(rawScoreCard);
  return scoreCard;
};
