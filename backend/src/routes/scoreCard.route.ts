import { Router } from "express";
import {
  createScoreCard,
  deleteScoreCard,
  getScoreCard,
  patchScoreCard,
} from "../controllers/scoreCard.controller.js";
const SCORE_CARD_PATH = "/score-card";
const router = Router();

router.put(SCORE_CARD_PATH, createScoreCard);
router.get(`${SCORE_CARD_PATH}/:id`, getScoreCard);
router.patch(SCORE_CARD_PATH, patchScoreCard);
router.delete(SCORE_CARD_PATH, deleteScoreCard);

export default router;
