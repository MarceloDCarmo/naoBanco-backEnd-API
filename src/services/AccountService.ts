import { getCustomRepository } from "typeorm";
import { AccountRepository } from "../repositories/AccountRepository";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash, compare } from "bcrypt"

interface IAccount {
    nick: string,
    password: string,
    user: string
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

        return await accountRepository.save(account)
    }

    async changeNick(accountNumber: number, newNick: string) {

        const accountRepository = getCustomRepository(AccountRepository)
        const account = await accountRepository.findOne(accountNumber)

        if (!account) {
            throw new Error("Account doesn't exists")
        }

        account.setNick(newNick)

        return await accountRepository.save(account)
    }
}

export { AccountService }