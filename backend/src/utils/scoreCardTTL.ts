import { SCORE_CARD_TTL_IN_DAYS } from "../constants/scoreCard.js";

const SECONDS_IN_A_Minute = 60;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;

const getScoreCardTTL = () =>
  SECONDS_IN_A_Minute *
  MINUTES_IN_AN_HOUR *
  HOURS_IN_A_DAY *
  SCORE_CARD_TTL_IN_DAYS;

export default getScoreCardTTL;
