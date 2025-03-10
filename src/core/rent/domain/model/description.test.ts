import { InvalidDescriptionError } from "../errors/invalid-description"
import { Description } from "./description"


test("It should create a valid description.", () => {
    let content = "Hello World!"
    let description = new Description(content)
    expect(description.description).toBe(content)
})

test("It should create a valid description.", () => {
    let content = new Array(256).fill("x").join("")
    expect(() => {
        new Description(content)
    }).toThrow(InvalidDescriptionError)
})