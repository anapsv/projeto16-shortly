import { Router } from "express";
import { postNewURL } from "../controllers/urlsController.js";
import { urlsMiddleware } from '../middlewares/urlsMiddleware.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';

const router = Router();

router.post('/urls/shorten', tokenMiddleware, urlsMiddleware, postNewURL);

export default router;