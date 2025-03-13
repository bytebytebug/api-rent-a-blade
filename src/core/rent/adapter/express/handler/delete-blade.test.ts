import { BladeServiceFake, IBladeService } from "#core/rent/application/blade-service";
import express, { Application } from "express";
import { DeleteBladeHanlder } from "./delete-blade";
import request from "supertest"
import { uuidRegex } from "./utils";


let app: Application


beforeEach(() => {
    let bladeService: IBladeService = new class extends BladeServiceFake {
        async delete(id: string): Promise<void> {

        }
    }
    let deleteBladeHandler = new DeleteBladeHanlder(bladeService);
    app = express();
    app.delete(`/blades/:id(${uuidRegex})`, (req, res) => deleteBladeHandler.execute(req, res))
})


test("It should successfully delete a blade.", async () => {
    let res = await request(app)
        .delete("/blades/Ed64e777-6406-4d35-865f-e75523d6639d")

    expect(res.status).toBe(200)
})
