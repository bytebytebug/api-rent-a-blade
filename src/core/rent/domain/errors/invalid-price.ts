export class InvalidPriceError extends Error {
    value: number;

    constructor(value: number) {
        super(`Invalid price: ${value}.`)

        this.value = value;
    }
}
