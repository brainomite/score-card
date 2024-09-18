import { Router } from "express";
import { createScoreCard } from "../controllers/scoreCard.controller.js";

const router = Router();

router.put("/score-card/", createScoreCard);

export default router;
