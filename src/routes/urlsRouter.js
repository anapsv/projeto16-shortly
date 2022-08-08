import { Router } from "express";
import { postNewURL, getURLById, getShortenedURL, deleteURLById } from "../controllers/urlsController.js";
import { urlsMiddleware } from '../middlewares/urlsMiddleware.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';

const router = Router();

router.post('/urls/shorten', tokenMiddleware, urlsMiddleware, postNewURL);
router.get('/urls/:id', getURLById);
router.get('/urls/open/:shortUrl', getShortenedURL);
router.delete('/urls/:id', tokenMiddleware, deleteURLById);

export default router;