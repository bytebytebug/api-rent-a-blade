import { Description } from "#core/rent/domain/model/description";
import z from "zod"
import { Parser, ParsingError } from "./parser";



export type CreateBladeInputParserOutput = {
    name: string;
    description: string;
    price: number;
}

export class CreateBladeInputParser implements Parser<CreateBladeInputParserOutput> {
    parse(input: any): CreateBladeInputParserOutput {

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

export type UpdateBladeInputParserOutput = {
    name: string;
    description: string;
    price: number;
}

export class UpdateBladeInputParser implements Parser<UpdateBladeInputParserOutput> {
    parse(input: any): UpdateBladeInputParserOutput {
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