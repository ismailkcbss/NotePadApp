import express from "express";
import * as panelController from "../controller/panelController.js";

const router = express.Router();

router.route('/Content')
.post(panelController.CreatePanel)
.get(panelController.GetPanel)


export default router;