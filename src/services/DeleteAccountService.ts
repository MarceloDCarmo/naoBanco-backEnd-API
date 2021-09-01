import { getCustomRepository } from "typeorm"
import { AccountRepository } from "../repositories/AccountRepository"


class DeleteAccountService{

    async execute(accountNumber:number){

        const accountRepository = getCustomRepository(AccountRepository)
        const accountExists = await accountRepository.findOne(accountNumber)

        if(!accountExists){
            throw new Error ("Account doesn't exists")
        }

        const result = await accountRepository.delete({
            account_number:accountNumber
        })

        return result
    }
}

export { DeleteAccountService }