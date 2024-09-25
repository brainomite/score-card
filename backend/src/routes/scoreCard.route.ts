import { Router } from "express";
import {
  createScoreCard,
  deleteScoreCard,
  getScoreCard,
  patchScoreCard,
  subscribeToCard,
} from "../controllers/scoreCard.controller.js";
const SCORE_CARD_PATH = "/score-card";
const SCORE_CARD_PATH_ID = `${SCORE_CARD_PATH}/:id`;
const router = Router();

router.get(`${SCORE_CARD_PATH_ID}/subscribe`, subscribeToCard);
router.get(SCORE_CARD_PATH_ID, getScoreCard);
router.put(SCORE_CARD_PATH, createScoreCard);
router.delete(SCORE_CARD_PATH_ID, deleteScoreCard);
router.patch(SCORE_CARD_PATH_ID, patchScoreCard);

export default router;
