import { Router } from "express";
import { createRanking } from "../controllers/rankingController.js";

const router = Router();

router.get('/ranking', createRanking);

export default router;