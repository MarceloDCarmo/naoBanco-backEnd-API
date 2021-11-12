import { getCustomRepository } from "typeorm"
import { AccountRepository } from "../repositories/AccountRepository"

class DepositService {

    async execute(accountNumber:string, value:number) {
        
        if(value <= 0){
            throw new Error("Invalid value to deposit")
        }
        if(!accountNumber){
            throw new Error("Invalid account number")
        }

        const accountRepository = getCustomRepository(AccountRepository)
        const account = await accountRepository.findOne(accountNumber)

        if(!account){
            throw new Error("Account doesn't exists")
        }

        account.balance += value

        return await accountRepository.save(account)
    }
}

export { DepositService }