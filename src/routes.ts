import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserService = new AuthenticateUserController();
const createAccountController = new CreateAccountController()

//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (createUserController.handle));
router.post("/login", (authenticateUserService.handle));
router.post("/accounts", (createAccountController.handle))

export{router};