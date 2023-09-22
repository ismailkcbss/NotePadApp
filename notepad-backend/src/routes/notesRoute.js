import express from 'express';
import * as notesController from '../controller/notesController.js';

const router = express.Router();

router.route("/Note")
    .post(notesController.CreateNotes)
    .get(notesController.GetAllNotes)


router.route("/Note/:id")
    .get(notesController.GetSingleNote)
    .delete(notesController.DeleteNotes)
    .put(notesController.UpdateNotes)

export default router;