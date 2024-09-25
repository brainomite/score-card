import { Request, Response } from "express";
import generateScoreCard from "../utils/generateScoreCard.js";
import fetchScoreCard from "../utils/fetchScoreCard.js";
import clearScoreCard from "../utils/clearScoreCard.js";
import crypto from "crypto";
import updateScoreCard from "../utils/updateScoreCard.js";

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

type clientType = {
  id: string;
  res: Response;
};

type roomsType = {
  [room: string]: clientType[];
};

const room: roomsType = {};
const clientIDtoRoom: { [id: string]: string } = {};

export async function subscribeToCard(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const scoreCard = await fetchScoreCard(id);
    if (!scoreCard || !Object.keys(scoreCard).length) {
      return res.status(404).send("Score card not found");
    }
    const clientID = addClient(id, res);

    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(scoreCard)}\n\n`;
    res.write(data);

    req.on("close", () => removeClient(clientID));
  } catch (error) {
    res.status(500).send("Error fetching score card");
    console.error("Error fetching score card", error);
  }
}
export async function getScoreCard(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Missing score card id");
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

export const deleteScoreCard = async (req: Request, res: Response) => {
  const cleanedCard = await clearScoreCard(req.params.id);
  res.status(202).json(cleanedCard);
};

export const patchScoreCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, player, score } = req.body;
  try {
    const scoreCard = await updateScoreCard(id, category, player, score);
    if (room[id]) {
      room[id].forEach((client) => {
        client.res.write(`data: ${JSON.stringify(scoreCard)}\n\n`);
      });
    }
    res.status(202).json(scoreCard);
  } catch (error: any) {
    res.status(500).send("Error updating score card");
    console.error("Error updating score card", error.message);
  }
};

function removeClient(clientID: string) {
  const roomID = clientIDtoRoom[clientID];
  room[roomID] = room[roomID].filter((client) => client.id !== clientID);
  delete clientIDtoRoom[clientID];
  if (!room[roomID].length) delete room[roomID];
}

function addClient(id: string, res: Response) {
  const clientID = crypto.randomUUID();
  clientIDtoRoom[clientID] = id;
  const newClient = { id: clientID, res } as clientType;
  if (room[id]) {
    room[id].push(newClient);
  } else {
    room[id] = [newClient];
  }
  return clientID;
}
