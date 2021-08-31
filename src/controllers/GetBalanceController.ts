import { Request, Response } from "express";
import { GetBalanceService } from "../services/GetBalanceService";

class GetBalanceController {
    async handle(req:Request, res: Response) {
        const getBalanceService = new GetBalanceService()
        const { accountNumber } = req.params

        const balance = await getBalanceService.execute(accountNumber)

        return res.status(200).json({
            account_number: accountNumber,
            balance
        })

    }
}

export { GetBalanceController }