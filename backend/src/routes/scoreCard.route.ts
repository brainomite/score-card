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
router
  .route(SCORE_CARD_PATH_ID)
  .get(getScoreCard)
  .delete(deleteScoreCard)
  .patch(patchScoreCard);
router.put(SCORE_CARD_PATH, createScoreCard);

export default router;
