import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { AccountRepository } from "../repositories/AccountRepository";
import { UsersRepositories } from "../repositories/UsersRepositories";



interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticationService {

    async authenticateUser({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Check user
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email or Password incorrect")
        }

        //Check Password
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Email or Password incorrect")
        }

        //Gen Token
        const token = sign(
            { email, timestamp: Date.now() },
            process.env.SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        const authenticatedUser = {
            user,
            token
        }

        return authenticatedUser;
    }

    async authenticateAccount(accountNumber: number, password: string) {
        const accountRepository = getCustomRepository(AccountRepository)

        const account = await accountRepository.findOne(accountNumber)

        if (!account) {
            throw new Error("Account doesn't exists")
        }

        const passwordMatch = await compare(password, account.password)

        if(!passwordMatch) {
            throw new Error("Account Number or Password incorect")
        }

        const token = sign(
            { accountNumber, timestamp: Date.now() },
            process.env.SECRET,
            {
                subject: account.user,
                expiresIn: "1d"
            }
        )

        const authenticatedAccount = {
            mesage: "Account athenticated",
            user: account.user,
            accountNumber: account.account_number,
            token
        }

        return authenticatedAccount
    }
}

export { AuthenticationService };
