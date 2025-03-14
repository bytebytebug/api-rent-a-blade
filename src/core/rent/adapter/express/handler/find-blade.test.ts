import express, { Application } from "express";
import request from "supertest"
import { BladeData, BladeServiceFake } from "#core/rent/application/blade-service";
import { uuidRegex } from "./utils";
import { FindBladeHandler } from "./find-blade";


let app: Application;


beforeEach(() => {
    let bladeService = new class extends BladeServiceFake {
        async find(uuid: string): Promise<BladeData | null> {
            return {
                id: "1d03109a-9f88-4d7c-b696-bb2140e36bd0",
                name: "Master Sword",
                description: "The best sword",
                price: 1200,
            }
        }
    }
    let findBladeHandler = new FindBladeHandler(bladeService)
    app = express()
    app.get(`/blades/:id(${uuidRegex})`, (req, res) => findBladeHandler.execute(req, res))
})


test("It should find a blade.", async () => {
    let res = await request(app)
        .get("/blades/1d03109a-9f88-4d7c-b696-bb2140e36bd0")

    expect(res.status).toBe(200);
});
