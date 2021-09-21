import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import "express-async-errors";

interface IDeleteUserRequest{
    email: string;
}

class DeleteUserService{

    async execute({email} : IDeleteUserRequest) {
        const userRepository = getCustomRepository(UsersRepositories);
        try
        {
            if(!email){
                throw new Error("Email Incorrect");
            }

            const userAlreadyExists = await userRepository.findOne({
                email,
            });

            if(!userAlreadyExists){
                throw new Error("User no exists");
            }

            const result = await userRepository.delete({
                email:email
            })
            return "User Deleted";
            
        }
        catch(e) {
            return "Unable to delete user: " + e.message;
        }
    }
}

export {DeleteUserService}
