import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { UserController } from "./controllers/UserController";
import { DeleteAccountController } from "./controllers/DeleteAccountController";
import { DepositController } from "./controllers/DepositController";
import { GetBalanceController } from "./controllers/GetBalanceController";
import { PixKeyCotroller } from "./controllers/PixKeyController";
import { TransactionController } from "./controllers/TransactionController";

const router = Router();

const userController = new UserController();
const authenticateUserService = new AuthenticateUserController();
const createAccountController = new CreateAccountController()
const deleteAcccountController = new DeleteAccountController()
const getBalanceControler = new GetBalanceController()
const depostiController = new DepositController()
const transactionController = new TransactionController()
const pixKeyController = new PixKeyCotroller()
//router.post("/users", (request, response) => {} ) //Optional Method

router.post("/users", (userController.CreateNewUser));
router.delete("/users", (userController.DeleteAlltoUser));
router.post("/login", (authenticateUserService.handle));
router.post("/accounts", (createAccountController.handle))
router.delete("/accounts/:accountNumber", (deleteAcccountController.handle))
router.get("/accounts/:accountNumber/balance", getBalanceControler.handle)
router.put("/deposit", depostiController.handle)
router.get("/transactions/:transactionId", transactionController.getTransaction)
router.post("/pixKeys/random", pixKeyController.createRandomKey)
router.post("/pixKeys/email", pixKeyController.createEmailKey)
router.delete("/pixKeys", pixKeyController.deleteKey)
router.post("/transfers/pix", transactionController.executePixTransfer)
router.post("/transfers/ted", transactionController.executeTedTranfer)

export { router };