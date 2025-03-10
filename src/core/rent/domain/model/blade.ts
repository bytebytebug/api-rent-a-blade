import { Description } from "./description";
import { Id } from "./id";
import { Name } from "./name";
import { Price } from "./price";


/**
 * Blade entity.
 */
export class Blade {
    protected _id: Id;
    protected _name: Name;
    protected _description: Description;
    protected _price: Price; // day

    constructor(id: Id, name: Name, description: Description, price: Price) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._price = price;
    }

    get id(): Id {
        return this._id;
    }

    get name(): Name {
        return this._name;
    }

    get description(): Description {
        return this._description;
    }

    get price(): Price {
        return this._price;
    }

    rename(newName: Name) {
        this._name = newName;
    }

    chagePrice(newPrice: Price) {
        this._price = newPrice;
    }

    changeDescription(newDescription: Description) {
        this._description = newDescription;
    }

    equal(other: Blade): boolean {
        return this.id.equal(other.id);
    }
}
