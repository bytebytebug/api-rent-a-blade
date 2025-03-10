import {  InvalidNameError } from "#core/rent/domain/errors/invalid-name"
import { Name } from "./name"


test("It should throw an error if the name is empty", () => {
    expect(() => {
        new Name("")
    }).toThrow(InvalidNameError)
})


test("It should throw an error if the name is too long", () => {
    let bigName = new Array(256).fill("x").join("")

    expect(() => {
        new Name(bigName)
    }).toThrow(InvalidNameError)
})