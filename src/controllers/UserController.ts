import {Request, Response} from "express"
import { UserService } from "../services/UserService";

class UserController{

    async CreateNewUser(request: Request, response: Response){

        const {name, email, admin, password } = request.body;
        if(!email){
            return response.status(400).json("Atributes body undefined (name, email, admin, password)");
        }
        const createUserService = new UserService();
        const user = await createUserService.createUser({name, email, admin, password})
        return response.json(user);

    }

    async DeleteAlltoUser(request: Request, response: Response){

        const {email} = request.body;
        if(!email){
            return response.status(400).json("Email undefined");
        }
        const userService = new UserService();
        const userAndAllToDelete = await userService.DeleteUserAndALL(email)
        return response.json(userAndAllToDelete);

    }

    async updateUser(request: Request, response: Response){

        const {email, attribute, value} = request.body;
        if(!email){
            return response.status(400).json("Email undefined");
        }
        const userService = new UserService();
        const userToUpdate = await userService.updateUser(email, attribute, value)
        return response.json(userToUpdate);
    }

    async getUser(request: Request, response: Response){

        const {email} = request.params
        console.log(email)
        if(!email){
            return response.status(400).json("Email undefined");
        }
        const userService = new UserService();
        const userToGet = await userService.getUser(email)
        return response.json(userToGet);
    }

    async getUserById(request: Request, response: Response){

        const {id} = request.params
        console.log(id)
        if(!id){
            return response.status(400).json("Id undefined");
        }
        const userService = new UserService();
        const userToGet = await userService.getUserById(id)
        return response.json(userToGet);
    }
}

export {UserController};