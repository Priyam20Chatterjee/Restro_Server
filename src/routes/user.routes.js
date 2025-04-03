import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";
 
const router = Router();

//Authentication Routes.
router.route("/register").post(register);
router.route("/login").post(login);

export default router; 