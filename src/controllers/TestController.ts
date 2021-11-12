import { Request, Response } from "express";
import { Populate } from "../helpers/Populate";
import { AccountService } from "../services/AccountService";
import { PixService } from "../services/PixService";
import { UserService } from "../services/UserService";

class TestController {

    async getInfo(req: Request, res: Response) {

        await Populate.execute()

        const userService = new UserService()
        const accountService = new AccountService()
        const pixService = new PixService()

        const user = await userService.getUser("teste@email.com")
        const accounts = await accountService.getAccountsByUser(user.id)

        let pixKeys = []
        pixKeys[0] = await pixService.getKeysByAccount(1)
        pixKeys[1] = await pixService.getKeysByAccount(2)

        const info = {
            user,
            accounts,
            pixKeys
        }

        return res.status(200).json(info)
    }
}

export { TestController };
