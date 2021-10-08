import { Request, Response } from "express"
import { BoletoHelper } from "../helpers/BoletoHelper"
import { verifyAccount } from "../helpers/VerifyAccount"
import { DepositService } from "../services/DepositService"


class DepositController {

    async deposit(req:Request, res:Response) {
        const depostitService = new DepositService()
        const { accountNumber, value } = req.body

        const account = await depostitService.execute(accountNumber, value)

        return res.status(200).json({
            accountNumber,
            newBalance: (account.balance / 100).toFixed(2)
        })
    }

    async generateDepositBoleto(req:Request, res:Response) {
        const boletoHelper = new BoletoHelper()
        const { issuerAccount, value, dueDate } = req.body

        await verifyAccount(issuerAccount)

        const boleto = boletoHelper.generate(issuerAccount, value, new Date(dueDate))

        return res.status(200).json({
            "boletoNumber":boleto
        })
    }
}

export { DepositController }