import {Request, Response} from "express";

export const mainPage = (req: Request, res: Response) => {
    res.render("main");
}