import { Application } from "express";

export class Routes {
    constructor() {

    }

    register(server: Application) {
        server.get("/", (req, res) => {
            res.send({
                message: "Hello Routes!"
            })
        })
    }
}