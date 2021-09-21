import {Request, Response} from "express"
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController{
    async handle(request: Request, response: Response){


        const {email} = request.body;
        const deleteUserService = new DeleteUserService();
        const userToDelete = await deleteUserService.execute({email})
        return response.json(userToDelete);

    }
}

export {DeleteUserController}