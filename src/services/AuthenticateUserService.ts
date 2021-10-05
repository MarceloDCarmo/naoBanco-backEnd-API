import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";



interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password} : IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Check user
        const user = await usersRepositories.findOne({
            email
        });
        if(!user){
            throw new Error("Email or Password incorrect")
        }

        //Check Password
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new Error("Email or Password incorrect")
        }

        //Gen Token
        const token = sign(
            {email: user.email},
            "eaa474ac8948940e31539fcfba1cfa6f", 
            {subject: user.id, 
            expiresIn: "1d"}
        )

        return token;
    }

    
}

export {AuthenticateUserService}