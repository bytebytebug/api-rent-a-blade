import { BladeService, BladeServiceFake, CreateBladeInput, IBladeService } from "#core/rent/application/blade-service"
import { BladeRepositoryInMemory } from "#core/rent/application/repository/blade"
import { CreateBladeInputParser } from "../../parser/blade"
import { CreateBladeHandler } from "./create-blade"
import express, { Application } from "express"
import request from "supertest"

class MyBladeServiceFake extends BladeServiceFake {
    async createBlade(bladeData: CreateBladeInput): Promise<string> {
        return "6c9e7562-7cd9-4bb0-acaa-8d1fe5774919"
    }
}


let app: Application


beforeEach(() => {
    let bladeRepository = new BladeRepositoryInMemory();
    let bladeService = new BladeService(bladeRepository)
    let inputParser = new CreateBladeInputParser()
    let handler = new CreateBladeHandler(bladeService, inputParser);
    app = express()
    app.post("/blades", express.json(), (req, res) => handler.execute(req, res))
})

test("It should create a sword and return 201 with the ID.", async () => {
    let res = await request(app)
        .post('/blades')
        .send({
            name: "Master Sword",
            description: "The best sword!",
            price: 1000,
        })

    expect(res.body.id).not.toBeNull()
})
