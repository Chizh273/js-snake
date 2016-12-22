import {Request, Response} from "express";

export const createNewGamePage = (req: Request, res: Response) => {
    res.render("create-new-game");
}