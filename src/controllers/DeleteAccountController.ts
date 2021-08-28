import { Request, Response } from "express"
import { DeleteAccountService } from "../services/DeleteAccountService"

class DeleteAccountController {

    async handle(req:Request, res:Response){
        const { account_number } = req.params

        console.log(account_number)

        const accountService = new DeleteAccountService()

        const account = await accountService.execute(account_number)

        return res.status(200).json({
            account_number: account_number,
            status: "Deleted"
        })
    }

}

export { DeleteAccountController }