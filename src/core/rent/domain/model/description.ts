import { InvalidDescriptionError } from "../errors/invalid-description";

/**
 * Description object value.
 */
export class Description {
    protected _value: string;

    constructor(value: string) {
        if (value.length > 255) {
            throw new InvalidDescriptionError(value);
        }
        this._value = value;
    }

    get description(): string {
        return this._value;
    }

    equal(other: Description): boolean {
        return this.description == other.description;
    }
}
