import { BladeService, IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";

export class CreateBladeHandler {
    bladeService: IBladeService;

    constructor(bladeService: IBladeService) {
        this.bladeService = bladeService;
    }

    async execute(req: Request, res: Response) {
        let { name, description, price } = req.body;

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
