import { Router } from "express";
import {
  createScoreCard,
  getScoreCard,
  updateScoreCardWithExpress,
} from "../controllers/scoreCard.controller.js";
const SCORE_CARD_PATH = "/score-card";
const router = Router();

router.put(SCORE_CARD_PATH, createScoreCard);
router.get(SCORE_CARD_PATH, getScoreCard);
router.patch(SCORE_CARD_PATH, updateScoreCardWithExpress);

export default router;
