
export class InvalidIDError extends Error {
    public value: string;

    constructor(value: string) {
        super(`Invalid id ${value}.`)

        this.value = value;
    }
}
