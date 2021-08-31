import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteAccountController } from "./controllers/DeleteAccountController";
import { DepositController } from "./controllers/DepositController";
import { GetBalanceController } from "./controllers/GetBalanceController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserService = new AuthenticateUserController();
const createAccountController = new CreateAccountController()
const deleteAcccountController = new DeleteAccountController()
const getBalanceControler = new GetBalanceController()
const depostiController = new DepositController()
//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (createUserController.handle));
router.post("/login", (authenticateUserService.handle));
router.post("/accounts", (createAccountController.handle))
router.delete("/accounts/:accountNumber", (deleteAcccountController.handle))
router.get("/accounts/:accountNumber/balance", getBalanceControler.handle)
router.put("/deposit", depostiController.handle)

export { router };