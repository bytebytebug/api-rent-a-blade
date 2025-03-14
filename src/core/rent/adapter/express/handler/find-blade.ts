import { Handler } from "#core/rent/adapter/express/handler/handler"
import { BladeData, IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";

export class FindBladeHandler implements Handler {


    private bladeService: IBladeService;


    constructor(bladeService: IBladeService) {
        this.bladeService = bladeService;
    }


    async execute(req: Request, res: Response): Promise<void> {
        try {
            let uuid = req.params.id;

            let blade = await this.bladeService.find(uuid);

            if (blade) {
                this.sendBlade(res, blade);
            } else {
                this.sendNotFount(res)
            }

        } catch (e) {
            this.sendServerError(res)
        }
    }


    private sendBlade(res: Response, blade: BladeData) {
        res.json({
            blade: blade,
        })
    }


    private sendServerError(res: Response) {
        res.status(500).send({
            message: "server error"
        })
    }

    private sendNotFount(res: Response) {
        res.status(404).json({
            message: "not found"
        })
    }

}

