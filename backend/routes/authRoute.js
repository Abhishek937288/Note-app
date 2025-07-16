import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/authController.js";
import {protectRoute} from "../middleware/authMiddleware.js";
import {userInfo} from "../controllers/userController.js";

const router = new Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/me",protectRoute,userInfo);

export default router; 
