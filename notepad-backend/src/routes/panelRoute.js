import express from "express";
import * as panelController from "../controller/panelController.js";

const router = express.Router();

router.route('/Content')
.post(panelController.CreatePanel)
.get(panelController.GetPagePanel)

router.route('/Content/:id')
.get(panelController.GetPanel)
.put(panelController.UpdatePanel)

export default router;