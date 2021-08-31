import { Request, Response } from "express"
import { DeleteAccountService } from "../services/DeleteAccountService"

class DeleteAccountController {

    async handle(req:Request, res:Response){
        const { accountNumber } = req.params

        const accountService = new DeleteAccountService()

        const account = await accountService.execute(accountNumber)

        return res.status(200).json({
            account_number: accountNumber,
            status: "Deleted"
        })
    }

}

export { DeleteAccountController }