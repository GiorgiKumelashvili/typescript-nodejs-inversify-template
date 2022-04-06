import express from "express";
import { controller, httpGet, response } from "inversify-express-utils";

@controller("/")
export class Home {
    @httpGet("/")
    index(@response() res: express.Response): any {
        return res.render("index", { title: "Express" });
    }
}
