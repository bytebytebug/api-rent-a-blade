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

            this.sendId(res, id);
        } catch (e) {
            if (e instanceof ParsingError) {
                this.sendInputError(res);
                return;
            }

            this.sendServerError(res)
        }
    }

    private sendId(res: Response, id: string) {
        res.status(201).json({
            id,
        })
    }

    private sendInputError(res: Response) {
        res.status(400).json({
            message: "input error"
        })
    }

    private sendServerError(res: Response) {
        res.status(500).json({
            message: "Server error"
        })
    }
}
