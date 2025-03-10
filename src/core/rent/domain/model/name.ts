import { InvalidNameError } from "#core/rent/domain/errors/invalid-name";

/**
 * Name object value.
 */
export class Name {

    protected _value: string

    constructor(value: string) {
        let length = value.length;
        if (length == 0 || length > 255) {
            throw new InvalidNameError(value);
        }

        this._value = value;
    }

    get name(): string {
        return this._value;
    }

    equal(other: Name): boolean {
        return this.name == other.name;
    }
}