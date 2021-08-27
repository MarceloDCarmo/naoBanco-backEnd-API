import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserService = new AuthenticateUserController();


//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (createUserController.handle));
router.post("/login", (authenticateUserService.handle));

export{router};