import { Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetBalanceController } from "./controllers/GetBalanceController";

const router = Router();
const createUserController = new CreateUserController()
const createAccountController = new CreateAccountController()
const getBalanceControler = new GetBalanceController()

//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (createUserController.handle))
router.post("/accounts", createAccountController.handle)
router.get("/accounts/:accountNumber/balance", getBalanceControler.handle)

export { router };