import { Request, Response } from "express"
import { AccountService } from "../services/AccountService"

class AccountController {

    async create(req: Request, res: Response){
        const { nick, password, user } = req.body
        
        const accountService = new AccountService()

        const account = await accountService.create({nick, password, user})

        return res.status(201).json(account)
    }

    async delete(req:Request, res:Response){
        const { accountNumber } = req.params

        const accountService = new AccountService()

        await accountService.delete(parseInt(accountNumber))

        return res.status(200).json({
            account_number: accountNumber,
            status: "Deleted"
        })
    }

    async getBalance(req:Request, res: Response) {
        const getBalanceService = new AccountService()
        const { accountNumber } = req.params

        const balance = await getBalanceService.getBalance(parseInt(accountNumber))

        return res.status(200).json({
            account_number: accountNumber,
            balance
        })

    }
}

export { AccountController }