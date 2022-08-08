import { Router } from "express";
import { userSignUpMiddleware, userSignInMiddleware } from '../middlewares/usersMiddleware.js';
import { addUser, loginUser, getUsersData } from "../controllers/usersController.js";
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';

const router = Router();

router.post('/signup', userSignUpMiddleware, addUser);
router.post('/signin', userSignInMiddleware, loginUser);
router.get('/users/me', tokenMiddleware, getUsersData);

export default router;