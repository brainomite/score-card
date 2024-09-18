import { Router } from "express";
import {
  createScoreCard,
  getScoreCard,
  updateScoreCard,
} from "../controllers/scoreCard.controller.js";
const SCORE_CARD_PATH = "/score-card";
const router = Router();

router.put(SCORE_CARD_PATH, createScoreCard);
router.get(SCORE_CARD_PATH, getScoreCard);
router.patch(SCORE_CARD_PATH, updateScoreCard);

export default router;
