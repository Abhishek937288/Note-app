import { Router } from "express";
import {userInfo} from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = new Router();

 
 export default router;

