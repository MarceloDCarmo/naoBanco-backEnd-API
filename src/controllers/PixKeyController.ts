import { Request, Response } from "express";
import { PixService } from "../services/PixService";


class PixKeyCotroller{
    async createRandomKey(req: Request, res: Response){
        const pixService = new PixService()
        const { accountNumber } = req.body

        const pixKey = await pixService.createRandomKey(parseInt(accountNumber))

        return res.status(201).json(pixKey)
    }
}

export { PixKeyCotroller }
