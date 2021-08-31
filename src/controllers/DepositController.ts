import { Request, Response } from "express"
import { DepositService } from "../services/DepositService"


class DepositController {

    async handle(req:Request, res:Response) {
        const depostitService = new DepositService()
        const { accountNumber, value } = req.body

        const account = await depostitService.execute(accountNumber, value)

        return res.status(200).json({
            accountNumber,
            newBalance: (account.balance / 100).toFixed(2)
        })
    }
}

export { DepositController }