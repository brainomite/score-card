import { Router } from "express";

const router = Router();

router.get("/wake-up/", (req, res) => res.send("I am awake!"));

export default router;
