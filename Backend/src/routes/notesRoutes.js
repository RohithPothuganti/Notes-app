import express from "express";
import { addNewNote, deleteNote, editNote, fetchNote, fetchAllNotes } from "../controller/notesController.js";
import { protect } from "../middleware/authMiddleware.js"; // <-- ADD THIS

const router = express.Router();

router.use(protect);

router.route('/').get(fetchAllNotes).post(addNewNote);
router.route('/:id').get(fetchNote).put(editNote).delete(deleteNote);

export default router;