import { Blade } from "#core/rent/domain/model/blade";
import { Description } from "#core/rent/domain/model/description";
import { Id } from "#core/rent/domain/model/id";
import { Name } from "#core/rent/domain/model/name";
import { Price } from "#core/rent/domain/model/price";
import { BladeRepository } from "#core/rent/application/repository/blade";

type CreateBladeInput = {
    name: string;
    description: string;
    price: number;
}

type CreateBladeOutput =
    | { type: "Seccess" }
    | { type: "Failure", value: any }


export class BladeService {
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
}