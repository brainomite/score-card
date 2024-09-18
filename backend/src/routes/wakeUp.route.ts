import { Router } from "express";
import { respondIAmAwake } from "../controllers/wakeUp.controller.js";

const router = Router();
router.get("/wake-up/", respondIAmAwake);

export default router;
