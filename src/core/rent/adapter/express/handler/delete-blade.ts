import { Handler } from "#core/rent/adapter/express/handler/handler";
import { IBladeService } from "#core/rent/application/blade-service";
import { Request, Response } from "express";


export class DeleteBladeHanlder implements Handler {


    private bladeService: IBladeService;


    constructor(bladeService: IBladeService) {
        this.bladeService = bladeService;
    }


    async execute(req: Request, res: Response) {
        let id = req.params.id;

        try {
            await this.bladeService.delete(id);

            this.sendSuccess(res);
        } catch (e) {
            this.sendServerError(res);
        }
    }


    private sendSuccess(res: Response) {
        res.status(200).json({
            message: "success"
        })
    }


    private sendServerError(res: Response) {
        res.status(500).json({
            message: "server error"
        })
    }

}