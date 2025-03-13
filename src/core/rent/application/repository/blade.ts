import { Blade } from "#core/rent/domain/model/blade";
import { RepositoryError } from "#core/rent/application/errors/repository"
import { Id } from "#core/rent/domain/model/id";

export interface BladeRepository {
    count(): Promise<number>
    create(blade: Blade): Promise<void>;
    list(limit: number, offset: number): Promise<Blade[]>;
    find(id: Id): Promise<Blade | null>
    update(blade: Blade): Promise<void>
}

export class BladeRepositoryFake implements BladeRepository {

    update(blade: Blade): Promise<void> {
        throw new Error("Method not implemented.");
    }

    create(blade: Blade): Promise<void> {
        throw new Error("Method not implemented.");
    }

    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    list(limit: number, offset: number): Promise<Blade[]> {
        throw new Error("Method not implemented.");
    }

    find(id: Id): Promise<Blade | null> {
        throw new Error("Method not implemented.");
    }
}

export class BladeRepositoryInMemory implements BladeRepository {

    protected blades: Blade[] = []

    async create(blade: Blade): Promise<void> {
        if (this.blades.find(b => b.id.equal(blade.id))) {
            throw new RepositoryError("ID already in use.")
        }
        this.blades.push(blade)
    }

    async count(): Promise<number> {
        return this.blades.length
    }

    async list(limit: number, offset: number): Promise<Blade[]> {
        return this.blades
            .filter((_blade, index) => {
                return (offset <= index) && (index < offset + limit)
            })
            .map((blade) => {
                return new Blade(blade.id, blade.name, blade.description, blade.price)
            })
    }

    async update(blade: Blade): Promise<void> {
        let finded = this.blades.find((b) => b.id.equal(blade.id))

        if (!finded) throw new RepositoryError()

        Object.assign(finded, blade)
    }

    async find(id: Id): Promise<Blade | null> {
        let finded = this.blades.find((b) => b.id.equal(id))

        if (finded) {
            return finded;
        }

        return null;
    }
}