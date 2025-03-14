import express, { Application } from "express";
import { ListBladesHandler } from "./list-blade";
import request from "supertest"
import { BladeData, BladeService, BladeServiceFake } from "#core/rent/application/blade-service";


let app: Application;

beforeEach(() => {
    let bladeService = new class extends BladeServiceFake {
        async list(limit: number, offset: number): Promise<BladeData[]> {
            return [
                {
                    id: "1d03109a-9f88-4d7c-b696-bb2140e36bd0",
                    name: "Master Sword",
                    description: "The best sword",
                    price: 1200,
                },
                {
                    id: "27570206-e2ba-4754-9046-b1ffae4cae30",
                    name: "Flame Axe",
                    description: "A strong axe",
                    price: 1000,
                },
                {
                    id: "99ffd63d-fd3c-4825-b188-d058c329a548",
                    name: "Dark Katana",
                    description: "A dangerous katana",
                    price: 1500,
                },
            ]
        }
    }
    let findBladeHandler = new ListBladesHandler(bladeService)
    app = express()
    app.get("/blades/", (req, res) => findBladeHandler.execute(req, res))
})


test("It should list blades.", async () => {
    let res = await request(app)
        .get("/blades")

    expect(res.status).toBe(200);
    expect(res.body.blades.length).toBe(3)
});
