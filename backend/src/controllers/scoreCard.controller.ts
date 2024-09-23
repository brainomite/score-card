import { Request, Response } from "express";
import generateScoreCard from "../utils/generateScoreCard.js";
import fetchScoreCard from "../utils/fetchScoreCard.js";
import updateScoreCard from "../utils/updateScoreCard.js";
import clearScoreCard from "../utils/clearScoreCard.js";

export const createScoreCard = async (req: Request, res: Response) => {
  const { categories, players }: { categories: string[]; players: string[] } =
    req.body;
  if (!categories?.length || !players?.length) {
    return res.status(400).send("Missing categories or players");
  }
  try {
    const id = await generateScoreCard(categories, players);
    return res.status(201).json({ id });
  } catch (error) {
    console.error("Error creating score card", error);
    return res.status(500).send("Error creating score card");
  }
};

export async function getScoreCard(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Missing score card id");
    return;
  }

  try {
    const scoreCard = await fetchScoreCard(id);
    if (!scoreCard || !Object.keys(scoreCard).length) {
      return res.status(404).send("Score card not found");
    }
    res.status(200).json(scoreCard);
  } catch (error) {
    res.status(500).send("Error fetching score card");
    console.error("Error fetching score card", error);
  }
}

export const patchScoreCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, player, score } = req.body;
  try {
    const scoreCard = await updateScoreCard(id, category, player, score);
    res.status(202).json(scoreCard);
  } catch (error: any) {
    res.status(500).send("Error updating score card");
    console.error("Error updating score card", error.message);
  }
};

export const deleteScoreCard = async (req: Request, res: Response) => {
  const cleanedCard = await clearScoreCard(req.params.id);
  res.status(202).json(cleanedCard);
};
