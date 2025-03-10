export class InvalidDescriptionError extends Error {
    value: string;

    constructor(value: string) {
        super("Invalid description.")

        this.value = value;
    }
}