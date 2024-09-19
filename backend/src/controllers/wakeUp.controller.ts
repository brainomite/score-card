import { Request, Response } from "express";

export const respondIAmAwake = (req: Request, res: Response) =>
  res.status(200).send("I am awake!");
