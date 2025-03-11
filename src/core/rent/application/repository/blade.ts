import { Blade } from "#core/rent/domain/model/blade";
import { RepositoryError } from "#core/rent/application/errors/repository"

export interface BladeRepository {
    create(blade: Blade): Promise<void>;
}

export class BladeRepositoryFake implements BladeRepository {
    create(blade: Blade): Promise<void> {
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
}