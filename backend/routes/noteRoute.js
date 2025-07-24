import { Router } from "express";
import { createNote, deleteNote, editNote, getNote, noteData } from "../controllers/noteController.js";
import { protectRoute } from "../middleware/authMiddleware.js";


const router  = new Router();

// get all notes data
router.get("/notedata",protectRoute, noteData);
router.get("/getnote/:id",protectRoute,getNote);
router.post("/createnote",protectRoute,createNote);
router.put("/editnote/:id",protectRoute,editNote);
router.delete("/deletenote/:id",protectRoute,deleteNote);

export default router ;