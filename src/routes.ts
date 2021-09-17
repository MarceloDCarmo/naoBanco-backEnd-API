import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { AccountController } from "./controllers/AccountController";
import { CreateUserController } from "./controllers/CreateUserController";
import { DepositController } from "./controllers/DepositController";
import { PixKeyCotroller } from "./controllers/PixKeyController";
import { TransactionController } from "./controllers/TransactionController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserService = new AuthenticateUserController();
const accountController = new AccountController()
const depostiController = new DepositController()
const transactionController = new TransactionController()
const pixKeyController = new PixKeyCotroller()
//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (createUserController.handle));
router.post("/login", (authenticateUserService.handle));
router.post("/accounts", (accountController.create))
router.delete("/accounts/:accountNumber", (accountController.delete))
router.get("/accounts/:accountNumber/balance", accountController.getBalance)
router.put("/deposit", depostiController.handle)
router.get("/transactions/:transactionId", transactionController.getTransaction)
router.post("/pixKeys/random", pixKeyController.createRandomKey)
router.post("/pixKeys/email", pixKeyController.createEmailKey)
router.delete("/pixKeys", pixKeyController.deleteKey)
router.post("/transfers/pix", transactionController.executePixTransfer)
router.post("/transfers/ted", transactionController.executeTedTranfer)

export { router };