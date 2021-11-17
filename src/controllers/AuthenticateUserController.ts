import {Request, Response} from  "express";
import {AuthenticateUserService} from "../services/AuthenticateUserService";



class AuthenticateUserController {

    async login(request: Request, response:Response){
        const{email, password} = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const authenticatedUser = await authenticateUserService.execute({
            email,
            password,
        });

        return response.status(200).json(authenticatedUser);
    }
}

export {AuthenticateUserController};