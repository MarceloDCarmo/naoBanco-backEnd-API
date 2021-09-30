import {Request, Response} from "express"
import { UserService } from "../services/UserService";

class UserController{

    async CreateNewUser(request: Request, response: Response){

        const {name, email, admin, password } = request.body;
        const createUserService = new UserService();
        const user = await createUserService.createUser({name, email, admin, password})
        return response.json(user);

    }

    async DeleteAlltoUser(request: Request, response: Response){

        const {email} = request.body;
        const userService = new UserService();
        const userAndAllToDelete = await userService.DeleteUserAndALL({email})
        return response.json(userAndAllToDelete);

    }
}

export {UserController};