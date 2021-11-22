import { Request, Response } from  "express";
import { AuthenticationService } from "../services/AuthenticationService";



class AuthenticationController {

    async login(req: Request, res: Response){
        const { email, password } = req.body;

        const authenticationService = new AuthenticationService();

        const authenticatedUser = await authenticationService.authenticateUser({
            email,
            password,
        });

        return res.status(200).json(authenticatedUser);
    }

    async authenticateAccount(req: Request, res: Response){
        const { accountNumber, password } = req.body
        
        const authenticationService = new AuthenticationService()

        const authenticatedAccount = await authenticationService.authenticateAccount(parseInt(accountNumber), password)

        return res.status(200).json(authenticatedAccount)
    }
}

export {AuthenticationController};