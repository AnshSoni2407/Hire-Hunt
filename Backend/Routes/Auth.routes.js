import express from 'express'
import { signUp, login, logout } from "../Controller/AuthController.js";
import { verifyToken } from '../Middlewares/Token.js';

const router = express.Router();

router.post("/sign-up",signUp)

router.post("/login", login);

router.post("/logout",logout)


export default router;