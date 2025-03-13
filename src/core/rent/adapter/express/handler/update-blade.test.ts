import express, { Application } from "express";
import { UpdateBladeHandler } from "./update-blade";
import { BladeServiceFake } from "#core/rent/application/blade-service";
import { UpdateBladeInputParser } from "#core/rent/adapter/parser/blade";
import { uuidRegex } from "./utils";
import request from "supertest"


let app: Application


beforeEach(() => {
    let parser = new UpdateBladeInputParser()
    let bladeService = new class extends BladeServiceFake {
        async update(id: string, name: string, description: string, price: number): Promise<void> {

        }
    }
    let updateBladeHandler = new UpdateBladeHandler(bladeService, parser)
    app = express()
    app.put(`/blades/:id(${uuidRegex})`, express.json(),  (req, res) => updateBladeHandler.execute(req, res))
})


test("It should update.", async () => {
    let res = await request(app)
        .put("/blades/6e7f25b2-e80c-4ff0-99da-d79d74981805")
        .send({
            name: "Name",
            description: "Description",
            price: 123,
        })

    expect(res.status).toBe(200)
})