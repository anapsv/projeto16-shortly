import { Router } from "express";
import { postNewURL, getURLById, getShortenedURL } from "../controllers/urlsController.js";
import { urlsMiddleware } from '../middlewares/urlsMiddleware.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';

const router = Router();

router.post('/urls/shorten', tokenMiddleware, urlsMiddleware, postNewURL);
router.get('/urls/:id', getURLById);
router.get('/urls/open/:shortUrl', getShortenedURL);

export default router;