import { getCustomRepository } from "typeorm"
import { Account } from "../entities/Account"
import { AccountRepository } from "../repositories/AccountRepository"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { AccountService } from "../services/AccountService"
import { DepositService } from "../services/DepositService"
import { PixService } from "../services/PixService"
import { UserService } from "../services/UserService"

abstract class Populate {

    static async execute() {

        const userRepository = getCustomRepository(UsersRepositories)
        const userExists = await userRepository.find()

        if (userExists.length == 0) {

            const userService = new UserService()
            const accountService = new AccountService()
            const depositService = new DepositService()
            const pixService = new PixService()

            const user = await userService.createUser({
                name: "Teste",
                email: "teste@email.com",
                admin: true,
                password: "1234"
            })

            const accountRepository = getCustomRepository(AccountRepository)
            const accountOneExists = await accountRepository.findOne(1)
            const accountTwoExists = await accountRepository.findOne(2)

            let accountPrimary:Account
            let accountSecondary:Account

            console.log(JSON.stringify(accountOneExists));
            console.log(JSON.stringify(accountTwoExists));

            if (!accountOneExists) {
                accountPrimary = await accountService.create({
                    nick: "primária",
                    password: "1234",
                    user: user.id
                })

                await depositService.execute("1", 1000000)

                await pixService.createRandomKey(accountPrimary.account_number)

            } else {
                accountPrimary = accountOneExists
            }

            if (!accountTwoExists) {
                accountSecondary = await accountService.create({
                    nick: "secundária",
                    password: "1234",
                    user: user.id
                })

                await depositService.execute("2", 1000000)

                await pixService.createRandomKey(accountSecondary.account_number)

            } else {
                accountSecondary = accountTwoExists
            }

            console.log(`User: ${JSON.stringify(user)}\nAccount 1: ${JSON.stringify(accountPrimary)}\nAccount 2: ${JSON.stringify(accountSecondary)}`)
        } else {
            console.log("Database already populated")
        }
    }
}

export { Populate }
