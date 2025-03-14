import { Application } from "express";
import { Handler } from "#core/rent/adapter/express/handler/handler";
import { FindBladeHandler } from "../handler/find-blade";
import { ListBladesHandler } from "../handler/list-blade";
import express from "express"
import { uuidRegex } from "../handler/utils";

type BladeHandlers = {
    listBladesHandler: Handler;
    findBladeHandler: Handler;
    createBladeHandler: Handler;
    updateBladeHandler: Handler;
    deleteBladeHandler: Handler;
    countBladesHandler: Handler;
}

export class Routes {
    constructor(
        private bladeHandlers: BladeHandlers
    ) { }

    register(server: Application) {
        let h = this.bladeHandlers;

        server.get("/api/v1/blades/", (req, res) => h.listBladesHandler.execute(req, res))
        server.get("/api/v1/blades/:id(" + uuidRegex + ")", (req, res) => h.findBladeHandler.execute(req, res))
        server.get("/api/v1/blades/count", (req, res) => h.countBladesHandler.execute(req, res))
        server.post("/api/v1/blades/", express.json(), (req, res) => h.createBladeHandler.execute(req, res))
        server.put("/api/v1/blades/:id(" + uuidRegex + ")", express.json(), (req, res) => h.updateBladeHandler.execute(req, res))
        server.delete("/api/v1/blades/:id(" + uuidRegex + ")", express.json(), (req, res) => h.deleteBladeHandler.execute(req, res))
    }
}
