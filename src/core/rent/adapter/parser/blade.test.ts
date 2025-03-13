import { CreateBladeInputParser } from "./blade"
import { ParsingError } from "./parser";


test("It should parse the data.", () => {
    let inputParser = new CreateBladeInputParser();

    let value: any = { name: "Bob", description: "", price: 123 }

    let parserd = inputParser.parse(value);

    expect(parserd.name).toBe("Bob")
    expect(parserd.description).toBe("")
    expect(parserd.price).toBe(123)
})

test("It should throw an error when the name is too long.", () => {
    let inputParser = new CreateBladeInputParser();

    let value: any = {
        name: new Array(256).fill("x").join(""),
        description: "",
        price: 123
    }

    expect(() => {
        inputParser.parse(value);
    }).toThrow(ParsingError)
})

test("It should throw an error when the price is negative.", () => {
    let inputParser = new CreateBladeInputParser();

    let value: any = {
        name: "Flame Axe",
        description: "",
        price: -123
    }

    expect(() => {
        inputParser.parse(value);
    }).toThrow(ParsingError)
})