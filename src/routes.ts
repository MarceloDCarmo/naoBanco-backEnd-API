import { Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();
const createUserController = new CreateUserController()
const createAccountController = new CreateAccountController()

//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (createUserController.handle))
router.post("/accounts", createAccountController.handle)

export{router};