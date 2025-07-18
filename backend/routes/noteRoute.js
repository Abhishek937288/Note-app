import { Router } from "express";
import { createNote, deleteNote, editNote, getNote, noteData } from "../controllers/noteController.js";

const router  = new Router();

// get all notes data
router.get("/notedata",noteData);
router.get("/getnote/:id",getNote);
router.post("/createnote",createNote);
router.put("/editnote/:id",editNote);
router.delete("/deletenote/:id",deleteNote);

export default router ;