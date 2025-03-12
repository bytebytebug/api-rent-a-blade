import express, { Application } from "express";

export class Server {
    protected app: Application;

    constructor() {
        this.app = express()

        this.app.get("/", (req, res)=> {
            res.send({
                message: "Hello World!"
            })
        })
    }

    start() {
        this.app.listen(8000, ()=> {
            console.log("Starting...")
        })
    }
}