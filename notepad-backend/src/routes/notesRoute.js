import express from 'express';
import * as notesController from '../controller/notesController.js';

const router = express.Router();

router.route("/Note").post(notesController.CreateNotes)
    .get(notesController.GetAllNotes);


export default router;