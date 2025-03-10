import { InvalidPriceError } from "#core/rent/domain/errors/invalid-price";


/**
 * Price object value.
 */
export class Price {
    protected _value: number;

    constructor(value: number) {
        if (value < 0) {
            throw new InvalidPriceError(value)
        }

        this._value = value;
    }

    get price(): number {
        return this._value;
    }

    equal(other: Price): boolean {
        return this.price == other.price;
    }
}