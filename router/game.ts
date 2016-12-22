import * as express from "express";
import * as GameController from "../controller/game";

let router = express.Router();

router.get('/new', GameController.createNewGamePage);

export default router;