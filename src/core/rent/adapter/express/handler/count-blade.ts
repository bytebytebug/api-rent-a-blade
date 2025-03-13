import { BladeRepository } from "#core/rent/application/repository/blade";
import { Request, Response } from "express";

export class CountBladesHandler {


    private bladeRepository: BladeRepository;


    constructor(bladeRepository: BladeRepository) {
        this.bladeRepository = bladeRepository;
    }


    async execute(_req: Request, res: Response) {
        try {
            let count = await this.bladeRepository.count();

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