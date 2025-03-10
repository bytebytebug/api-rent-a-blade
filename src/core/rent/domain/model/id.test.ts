import { InvalidIDError } from "../errors/invalid-id";
import { Id } from "./id";


test("It should create a valid ID.", () => {
    let uuid = "3d6f42f2-e3b5-4a1f-a92d-2769b91a3bfe";
    let id = new Id(uuid);

    expect(id.uuid).toBe(uuid);
})

test("It should throw an error when the ID is not valid.", () => {
    expect(()=> {
        new Id("qwerty")
    }).toThrow(InvalidIDError)
})