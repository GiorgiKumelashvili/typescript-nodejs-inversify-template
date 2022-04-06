import "reflect-metadata";
import * as path from "path";
import express from "express";
import logger from "morgan";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import { InversifyExpressServer } from "inversify-express-utils";
import { IocContainer } from "./libs/ioc/container";

import "./controllers/home";
import "./controllers/test";

export const app = express();

(async () => {
    const port = process.env.PORT || 3000;

    // container configuration
    const container = IocContainer.container();
    await container.loadAsync();

    // wrap express and inversify
    const expressContainer = new InversifyExpressServer(container);
    const server = expressContainer.build();

    // Express configuration
    server.set("views", path.join(__dirname, "../views"));
    server.set("view engine", "pug");
    server.use(logger("dev"));
    server.use(express.static(path.join(__dirname, "../public")));
    server.use(errorNotFoundHandler);
    server.use(errorHandler);
    server.listen(port, () => console.log(`Server started at ${port}`));
})();
