import express, { Application } from "express"
import request from "supertest"
import { CountBladesHandler } from "./count-blade"
import { BladeRepositoryFake, BladeRepositoryInMemory } from "#core/rent/application/repository/blade"
import { Id } from "#core/rent/domain/model/id"

let app: Application

beforeEach(() => {
    app = express()
    let bladeRepository = new class extends BladeRepositoryFake {
        async count(): Promise<number> {
            return 12;
        }
    };
    let countHandler = new CountBladesHandler(bladeRepository);
    app.get("/blades/count", (req, res) => countHandler.execute(req, res))
})

test("It should return the blade count.", async () => {
    let res = await request(app)
        .get("/blades/count")

    expect(res.body.count).toBe(12)
})