import { getCustomRepository } from "typeorm"
import { AccountRepository } from "../repositories/AccountRepository"


class GetBalanceService {
    async execute(accountNumber:number) {

        if(!accountNumber){
            throw new Error ("Invalid account number")
        }

        const accountRepository = getCustomRepository(AccountRepository)
        const account = await accountRepository.findOne(accountNumber)

        if(!account){
            throw new Error ("Account doesn't exists")
        }

        return account.balance

    }
}

export { GetBalanceService }