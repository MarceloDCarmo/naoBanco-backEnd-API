import { Request, Response } from "express";
import { PixService } from "../services/PixService";

const pixService = new PixService()

class PixKeyCotroller{
    async createRandomKey(req: Request, res: Response){
        const { accountNumber } = req.body

        const pixKey = await pixService.createRandomKey(parseInt(accountNumber))

        return res.status(201).json(pixKey)
    }

    async createEmailKey(req: Request, res: Response){
        const { accountNumber, email } = req.body

        const pixKey = await pixService.createEmailKey(accountNumber, email)

        return res.status(201).json(pixKey)
    }
}

export { PixKeyCotroller }
