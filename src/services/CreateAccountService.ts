import { getCustomRepository } from "typeorm";
import { AccountRepository } from "../repositories/AccountRepository";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcrypt"

interface IAccount {
    nick:string,
    password:string,
    user:string
}

class CreateAccountService {

    async execute({nick, password, user}:IAccount){
        const usersRepository = getCustomRepository(UsersRepositories)
        const accountRepository = getCustomRepository(AccountRepository)

        const userExists = await usersRepository.findOne(user)

        if(!userExists){
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

}

export { CreateAccountService }