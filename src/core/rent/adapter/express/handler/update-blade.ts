import { Request, Response } from "express";
import { Handler } from "./handler";
import { IBladeService } from "#core/rent/application/blade-service";
import { Parser, ParsingError } from "#core/rent/adapter/parser/parser";


export type ParserOutput = {
    name: string;
    description: string;
    price: number;
}


export class UpdateBladeHandler implements Handler {

    private bladeService: IBladeService;
    private parser: Parser<ParserOutput>;


    constructor(bladeService: IBladeService, parser: Parser<ParserOutput>) {
        this.bladeService = bladeService;
        this.parser = parser;
    }


    async execute(req: Request, res: Response): Promise<void> {
        try {
            let uuid = req.params.id;

            let { name, description, price } = this.parser.parse(req.body);

            await this.bladeService.update(uuid, name, description, price);

            this.sendSuccess(res)

        } catch (e) {
            if (e instanceof ParsingError) {
                this.sendParsingError(res)
            } else {
                this.sendServerError(res);
            }
        }
    }


    private sendSuccess(res: Response) {
        res.status(200).json({
            message: "success"
        });
    }


    private sendParsingError(res: Response) {
        res.status(400).json({
            message: "parsing error"
        })
    }


    private sendServerError(res: Response) {
        res.status(500).json({
            message: "server error"
        })
    }

}