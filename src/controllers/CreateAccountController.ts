import { Request, Response } from "express"
import { CreateAccountService } from "../services/CreateAccountService"

class CreateAccountController {

    async handle(req: Request, res: Response){
        const { nick, password, user } = req.body
        
        const accountService = new CreateAccountService()

        const account = await accountService.execute({nick, password, user})

        return res.status(201).json(account)
    }

}

export { CreateAccountController }