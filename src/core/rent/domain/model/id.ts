import { isUUID } from "#lib/validation";
import { InvalidIDError } from "#core/rent/domain/errors/invalid-id";
import { randomUUID } from "node:crypto"
/**
 * Id object value.
 */
export class Id {

    protected _uuid: string;

    constructor(uuid: string) {
        if (!isUUID(uuid)) {
            throw new InvalidIDError(uuid);
        }
        this._uuid = uuid;
    }

    get uuid(): string {
        return this._uuid;
    }

    equal(other: Id): boolean {
        return this.uuid === other.uuid;
    }

    static random(): Id {
        let uuid = randomUUID();

        return new Id(uuid);
    }
}


