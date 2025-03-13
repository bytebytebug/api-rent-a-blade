import express, { Application } from "express";
import { Routes } from "#core/rent/adapter/express/routes/api";

export class Server {
    protected app: Application;

    constructor(routes: Routes) {
        this.app = express()

        routes.register(this.app)
    }

    start() {
        this.app.listen(8000, ()=> {
            console.log("Starting using providers...")
        })
    }
}