export class InvalidNameError extends Error {
    value: string;
    constructor(value: string) {
        super(`Invalid name: ${value}.`)

        this.value = value;
    }
}