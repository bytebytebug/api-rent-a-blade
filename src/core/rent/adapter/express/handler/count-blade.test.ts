import express, { Application } from "express"
import request from "supertest"
import { CountBladesHandler } from "./count-blade"
import { BladeServiceFake } from "#core/rent/application/blade-service"

let app: Application

beforeEach(() => {
    app = express()
    let bladeService = new class extends BladeServiceFake {
        async count(): Promise<number> {
            return 12;
        }
    };
    let countHandler = new CountBladesHandler(bladeService);
    app.get("/blades/count", (req, res) => countHandler.execute(req, res))
})

test("It should return the blade count.", async () => {
    let res = await request(app)
        .get("/blades/count")

    expect(res.body.count).toBe(12)
})