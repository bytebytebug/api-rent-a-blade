import { IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";
import { CreateBladeInputParser } from "#core/rent/adapter/parser/blade";


export class CreateBladeHandler {
    private bladeService: IBladeService;
    private parser: CreateBladeInputParser;

    constructor(bladeService: IBladeService, parser: CreateBladeInputParser) {
        this.bladeService = bladeService;
        this.parser = parser;
    }

    async execute(req: Request, res: Response) {

        let { name, description, price } = this.parser.parse(req.body);

        let id = await this.bladeService.createBlade({
            name,
            description,
            price,
        })

        res.status(201).json({
            id,
        })
    }
}
