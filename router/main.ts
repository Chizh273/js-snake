import * as express from "express";
import * as MainController from "../controller/main";
let router = express.Router();

router.get('/', MainController.mainPage);

export default router;