import { Description } from "#core/rent/domain/model/description";
import z from "zod"
import { ParsingError } from "./parser";



export type CreateBladeInputValidatorOutput = {
    name: string;
    description: string;
    price: number;
}

export class CreateBladeInputParser {
    parse(input: any): CreateBladeInputValidatorOutput {

        let schema = z.object({
            name: z.string().max(255),
            description: z.string().max(255),
            price: z.number().min(0),
        })

        try {
            return schema.parse(input)
        } catch (e) {
            throw new ParsingError();
        }
    }
}