import {Router}  from "express";
import getUser from "../models/userModel.js";
import {signUp,signIn,signOut } from "../controllers/authController.js";

const router = new Router();


router.post("/signup",signUp);
router.post("/singin",signIn);
router.post("/signout",signOut);

export default router ;
