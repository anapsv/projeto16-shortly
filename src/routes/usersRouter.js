import { Router } from "express";
import { ValidateUserSignUp, validateUserSignIn } from '../middlewares/usersMiddleware.js';
import { addUser, loginUser } from "../controllers/usersController.js";

const router = Router();

router.post('/signup', ValidateUserSignUp, addUser);
router.post('/signin', validateUserSignIn, loginUser);

export default router;