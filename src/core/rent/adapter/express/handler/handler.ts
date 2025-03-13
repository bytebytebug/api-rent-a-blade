import { Request, Response } from "express";

export interface Handler {
    execute(req: Request, res: Response): Promise<void>;
}
