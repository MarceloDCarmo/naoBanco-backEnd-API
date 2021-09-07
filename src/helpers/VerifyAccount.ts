import { getCustomRepository } from "typeorm"
import { Account } from "../entities/Account"
import { AccountRepository } from "../repositories/AccountRepository"

async function verifyAccount(accountNumber: number): Promise<Account>{
    const accountRepository = getCustomRepository(AccountRepository)
    const account = await accountRepository.findOne(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    return account
}

export { verifyAccount }