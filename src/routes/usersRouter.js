import { Router } from "express";
import { userSignUpMiddleware, userSignInMiddleware } from '../middlewares/usersMiddleware.js';
import { addUser, loginUser } from "../controllers/usersController.js";

const router = Router();

router.post('/signup', userSignUpMiddleware, addUser);
router.post('/signin', userSignInMiddleware, loginUser);

export default router;