import { IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";
import { CreateBladeInputParser } from "#core/rent/adapter/parser/blade";
import { ParsingError } from "../../parser/parser";
import { ApplicationError } from "#core/rent/application/errors/application";


export class CreateBladeHandler {
    private bladeService: IBladeService;
    private parser: CreateBladeInputParser;

    constructor(bladeService: IBladeService, parser: CreateBladeInputParser) {
        this.bladeService = bladeService;
        this.parser = parser;
    }

    async execute(req: Request, res: Response) {

        try {
            let { name, description, price } = this.parser.parse(req.body);

            let id = await this.bladeService.createBlade({
                name,
                description,
                price,
            })

            res.status(201).json({
                id,
            })
        } catch (e) {
            if (e instanceof ParsingError) {
                res.status(400).send({
                    message: "input error"
                })
                return;
            }

            res.status(500).send({
                message: "Server error"
            })
        }
    }
}
