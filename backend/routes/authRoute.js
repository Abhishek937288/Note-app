import {Router}  from "express";
import getUser from "../models/userModel.js";
import { getUser,signUp,signIn,signOut } from "../controllers/authController.js";

const router = new Router();


router.get("/me", getUser);
router.post("/signup",signUp);
router.post("/singin",signIn);


export default router ;
