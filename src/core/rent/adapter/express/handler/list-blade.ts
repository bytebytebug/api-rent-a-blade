import { Handler } from "#core/rent/adapter/express/handler/handler"
import { BladeData, IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";

export class ListBladesHandler implements Handler {


    private bladeService: IBladeService;


    constructor(bladeService: IBladeService) {
        this.bladeService = bladeService;
    }


    async execute(req: Request, res: Response): Promise<void> {
        try {
            let limit = this.parseNumber(req.query.limit) ?? 10;
            let offset = this.parseNumber(req.query.offset) ?? 0;

            let blades = await this.bladeService.list(limit, offset);

            this.sendBlades(res, blades);

        } catch (e) {
            this.sendServerError(res)
        }
    }


    private sendBlades(res: Response, blades: BladeData[]) {
        res.json({
            blades: blades,
        })
    }


    private sendServerError(res: Response) {
        res.status(500).send({
            message: "server error"
        })
    }

    private parseNumber(value: any): number | null {
        let numberValue = Number(value);

        if (Number.isNaN(numberValue)) {
            return null;
        }

        return numberValue;
    }

}

