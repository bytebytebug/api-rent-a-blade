import { Blade } from "#core/rent/domain/model/blade";
import { Description } from "#core/rent/domain/model/description";
import { Id } from "#core/rent/domain/model/id";
import { Name } from "#core/rent/domain/model/name";
import { Price } from "#core/rent/domain/model/price";
import { BladeRepository } from "#core/rent/application/repository/blade";
import { ApplicationError } from "#core/rent/application/errors/application";


export type CreateBladeInput = {
    name: string;
    description: string;
    price: number;
}
export type BladeData = {
    id: string;
    name: string;
    description: string;
    price: number;
}
export interface IBladeService {
    createBlade(bladeData: CreateBladeInput): Promise<string>;
    count(): Promise<number>;
    find(uuid: string): Promise<BladeData | null>;
    list(limmit: number, offset: number): Promise<BladeData[]>;
    delete(id: string): Promise<void>
    update(id: string, name: string, description: string, price: number): Promise<void>
}

export class BladeService implements IBladeService {
    protected bladeRepository: BladeRepository;

    constructor(bladeRepository: BladeRepository) {
        this.bladeRepository = bladeRepository;
    }



    async createBlade(bladeData: CreateBladeInput): Promise<string> {
        let id = Id.random()
        let name = new Name(bladeData.name);
        let description = new Description(bladeData.description);
        let price = new Price(bladeData.price);
        let blade = new Blade(id, name, description, price);

        await this.bladeRepository.create(blade);

        return id.uuid;
    }

    async count(): Promise<number> {
        return await this.bladeRepository.count()
    }

    async find(uuid: string): Promise<BladeData | null> {
        let id = new Id(uuid);

        let blade = await this.bladeRepository.find(id);

        if (blade == null) return null;

        return {
            id: blade.id.uuid,
            name: blade.name.name,
            description: blade.description.description,
            price: blade.price.price,
        }
    }

    async list(limmit: number, offset: number): Promise<BladeData[]> {
        let blades = await this.bladeRepository.list(limmit, offset);

        return blades.map(b => {
            return {
                id: b.id.uuid,
                name: b.name.name,
                description: b.description.description,
                price: b.price.price,
            }
        })
    }

    async delete(uuid: string): Promise<void> {
        let id = new Id(uuid);

        let blade = await this.bladeRepository.find(id);

        if (blade == null) throw new ApplicationError()

        this.bladeRepository.delete(blade)
    }

    async update(uuid: string, name: string, description: string, price: number): Promise<void> {
        let id = new Id(uuid);

        let blade = await this.bladeRepository.find(id);
        if (blade == null) throw new ApplicationError()

        blade.rename(new Name(name));
        blade.changeDescription(new Description(description));
        blade.chagePrice(new Price(price))

        await this.bladeRepository.update(blade);
    }
}

export class BladeServiceFake implements IBladeService {

    list(limmit: number, offset: number): Promise<BladeData[]> {
        throw new Error("Method not implemented.");
    }

    find(uuid: string): Promise<BladeData | null> {
        throw new Error("Method not implemented.");
    }

    createBlade(bladeData: CreateBladeInput): Promise<string> {
        throw new Error("Method not implemented.");
    }

    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(id: string, name: string, description: string, price: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
