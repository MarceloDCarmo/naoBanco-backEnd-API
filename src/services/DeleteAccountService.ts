import { getCustomRepository } from "typeorm"
import { AccountRepository } from "../repositories/AccountRepository"


class DeleteAccountService{

    async execute(account_number:string){

        const accountRepository = getCustomRepository(AccountRepository)
        const accountExists = await accountRepository.findOne(account_number)

        if(!accountExists){
            throw new Error ("Account doesn't exists")
        }

        const result = await accountRepository.delete({
            account_number:account_number
        })

        return result
    }
}

export { DeleteAccountService }