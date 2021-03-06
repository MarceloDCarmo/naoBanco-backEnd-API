import { Request, Response } from "express"
import { AccountService } from "../services/AccountService"

const accountService = new AccountService()

class AccountController {

    async create(req: Request, res: Response): Promise<Response>{
        const { nick, password, user } = req.body
        
        const account = await accountService.create({nick, password, user})

        return res.status(201).json(account)
    }

    async delete(req:Request, res:Response){
        const { accountNumber } = req.params

        await accountService.delete(parseInt(accountNumber))

        return res.status(200).json({
            account_number: accountNumber,
            status: "Deleted"
        })
    }

    async getBalance(req:Request, res: Response) {
        
        const { accountNumber } = req.params

        const balance = await accountService.getBalance(parseInt(accountNumber))

        return res.status(200).json({
            account_number: accountNumber,
            balance
        })

    }

    async changePassword(req:Request, res: Response) {
        const { accountNumber, actualPassword, newPassword } = req.body

        const account = await accountService.changePassword(accountNumber, actualPassword, newPassword)

        return res.status(200).json({
            accountNumber: account.accountNumber,
            message: "Password changed"
        })
    }

    async changeNick(req:Request, res: Response) {
        const { accountNumber, nick } = req.body

        const account = await accountService.changeNick(accountNumber, nick)

        return res.status(200).json({
            accountNumber: account.accountNumber,
            message: "Nick changed"
        })
    }

    async getAccount(req: Request, res: Response) {
        const { accountNumber } = req.params

        const account = await accountService.getAccount(parseInt(accountNumber))

        return res.status(200).json(account)
    }

    async getAccountsByUser(req: Request, res: Response) {
        const { id } = req.params

        const accounts = await accountService.getAccountsByUser(id)

        return res.status(200).json(accounts)
    }

    async getUserByAccount(req: Request, res: Response) {
        const { accountNumber } = req.params

        const user = await accountService.getUserByAccount(parseInt(accountNumber))

        return res.status(200).json(user)
    }
}

export { AccountController }