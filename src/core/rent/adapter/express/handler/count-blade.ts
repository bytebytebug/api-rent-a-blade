import { IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";

export class CountBladesHandler {


    private bladeService: IBladeService;


    constructor(bladeService: IBladeService) {
        this.bladeService = bladeService;
    }


    async execute(_req: Request, res: Response) {
        try {
            let count = await this.bladeService.count();

            this.sendCount(res, count)
        } catch (e) {
            this.sendServerError(res)
        }
    }


    private sendCount(res: Response, count: number) {
        res.json({
            count,
        })
    }


    private sendServerError(res: Response) {
        res.status(500).json({
            message: "server error"
        })
    }

}