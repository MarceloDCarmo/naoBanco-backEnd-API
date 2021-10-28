import { getCustomRepository } from "typeorm";
import { AccountRepository } from "../repositories/AccountRepository";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash, compare } from "bcrypt"
import { verifyAccount } from "../helpers/VerifyAccount";
import { Account } from "../entities/Account";

interface IAccount {
    nick: string,
    password: string,
    user: string
}

interface AccountDTO {
    accountNumber: number
    nick: string,
    user: string,
    balance: number
}

class AccountService {

    async getAccount(accountNumber: number) {
        const accountRepository = getCustomRepository(AccountRepository)

        const account = await accountRepository.findOne(accountNumber)

        return account
    }

    async create({ nick, password, user }: IAccount) {
        const usersRepository = getCustomRepository(UsersRepositories)
        const accountRepository = getCustomRepository(AccountRepository)

        const userExists = await usersRepository.findOne(user)

        if (!userExists) {
            throw new Error("User doesn't exists")
        }

        const hashedPassword = await hash(password, 8)

        const account = accountRepository.create({
            nick,
            password: hashedPassword,
            user
        })

        return await accountRepository.save(account)
    }

    async delete(accountNumber: number) {

        const accountRepository = getCustomRepository(AccountRepository)
        const accountExists = await accountRepository.findOne(accountNumber)

        if (!accountExists) {
            throw new Error("Account doesn't exists")
        }

        const result = await accountRepository.delete({
            account_number: accountNumber
        })

        return result
    }

    async getBalance(accountNumber: number) {

        const accountRepository = getCustomRepository(AccountRepository)

        if (!accountNumber) {
            throw new Error("Invalid account number")
        }

        const account = await accountRepository.findOne(accountNumber)

        if (!account) {
            throw new Error("Account doesn't exists")
        }

        return account.balance

    }

    async changePassword(accountNumber: number, actualPassword: string, newPassword: string) {

        const accountRepository = getCustomRepository(AccountRepository)
        const account = await accountRepository.findOne(accountNumber)

        if (!account) {
            throw new Error("Account doesn't exists")
        }

        const passwordMatch = await compare(actualPassword, account.password)

        if (!passwordMatch) {
            throw new Error("Iserted password doesn't match")
        }

        const hashedPassword = await hash(newPassword, 8)

        account.setPassword(hashedPassword)

        return this.toAccountDTO(await accountRepository.save(account))
    }

    async changeNick(accountNumber: number, newNick: string) {

        const accountRepository = getCustomRepository(AccountRepository)
        const account = await accountRepository.findOne(accountNumber)

        if (!account) {
            throw new Error("Account doesn't exists")
        }

        account.setNick(newNick)

        return this.toAccountDTO(await accountRepository.save(account))
    }

    async getAccountsByUser(id: string){

        const usersRepository = getCustomRepository(UsersRepositories)
        const userExists = await usersRepository.findOne(id)

        if(!userExists){
            throw new Error ("User doesn't exists")
        }

        const accountRepository = getCustomRepository(AccountRepository)
        const accounts = await accountRepository.findByUser(id)

        let accountsDTO: AccountDTO[] = []

        accounts.forEach((account) => {
            accountsDTO.push(this.toAccountDTO(account))
        })

        return accountsDTO
    }

    toAccountDTO(account: Account) {
        let accDTO: AccountDTO = {
            accountNumber: account.account_number,
            nick: account.nick,
            user: account.user,
            balance: account.balance
        }

        return accDTO
    }
}

export { AccountService }