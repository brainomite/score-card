import { Router } from "express";
import {
  createScoreCard,
  deleteScoreCard,
  getScoreCard,
  patchScoreCard,
} from "../controllers/scoreCard.controller.js";
const SCORE_CARD_PATH = "/score-card";
const SCORE_CARD_PATH_ID = `${SCORE_CARD_PATH}/:id`;
const router = Router();

router.put(SCORE_CARD_PATH, createScoreCard);
router.get(SCORE_CARD_PATH_ID, getScoreCard);
router.patch(SCORE_CARD_PATH_ID, patchScoreCard);
router.delete(SCORE_CARD_PATH_ID, deleteScoreCard);

export default router;
