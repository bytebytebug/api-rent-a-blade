import { InvalidPriceError } from "#core/rent/domain/errors/invalid-price";
import { Price } from "./price"


test("It should create a valid price", async () => {
    let price = new Price(42.00);

    expect(price.price).toBe(42);
})


test("It should throw an error if the value is negative", async () => {
    expect(() => {
        new Price(-3)
    }).toThrow(InvalidPriceError);
})