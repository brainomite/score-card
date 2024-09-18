import { Request, Response } from "express";
import crypto from "crypto";
import generateScoreCard from "../utils/generateScoreCard.js";
import { getClient, getKeyName } from "../db/redisClient.js";
import getScoreCardTTL from "../utils/scoreCardTTL.js";

const SCORE_CARD_TYPE = "scorecard";

export const createScoreCard = async (req: Request, res: Response) => {
  const { categories, players }: { categories: string[]; players: string[] } =
    req.body;
  if (!categories?.length || !players?.length) {
    res.status(400).send("Missing categories or players");
    return;
  }

  const newId = getKeyName(crypto.randomUUID(), SCORE_CARD_TYPE);
  const scoreCard = generateScoreCard(categories, players);
  try {
    const client = getClient();
    await client
      .multi()
      .call("JSON.SET", newId, ".", JSON.stringify(scoreCard))
      .expire(newId, getScoreCardTTL())
      .exec();
  } catch (error) {
    console.error("Error creating score card", error);
    res.status(500).send("Error creating score card");
    return;
  }

  res.status(201).json({ id: newId });
};

export async function getScoreCard(req: Request, res: Response) {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("Missing score card id");
    return;
  }

  try {
    const client = getClient();
    const rawScoreCard = (await client.call("JSON.GET", id)) as string;
    const scoreCard = JSON.parse(rawScoreCard);
    if (!scoreCard) {
      res.status(404).send("Score card not found");
      return;
    }
    res.status(200).json(scoreCard);
  } catch (error) {
    res.status(500).send("Error fetching score card");
    console.error("Error fetching score card", error);
  }
}
