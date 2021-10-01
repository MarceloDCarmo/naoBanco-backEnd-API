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

//User
router.post("/users", (userController.CreateNewUser));
router.delete("/users", (userController.DeleteAlltoUser));
//roter.path("/users/settings
router.post("/login", (authenticateUserService.handle));

//Account
router.post("/accounts", (createAccountController.handle))
router.delete("/accounts/:accountNumber", (deleteAcccountController.handle))
router.get("/accounts/:accountNumber/balance", getBalanceControler.handle)
//roter.get("/accounts -> Show account list to user.
//roter.path("/accounts/settings -> Change nick or password.

//Transactions
router.put("/deposit", depostiController.handle) //Isso seria um "Doc"?
router.get("/transactions/:transactionId", transactionController.getTransaction)
//router.get("/transactions/type"
//router.get("/transactions/date"
//router.get("/transactions/rangedate ("with limit, Max 90 days")
router.post("/transfers/ted", transactionController.executeTedTranfer)
router.post("/transfers/pix", transactionController.executePixTransfer)

//Pix
router.post("/pixKeys/random", pixKeyController.createRandomKey)
router.post("/pixKeys/email", pixKeyController.createEmailKey)
router.delete("/pixKeys", pixKeyController.deleteKey)

//VirtualCR
//router.post -> VirtualCreditCard
//router.delete -> VirtualCreditCard ->new(billing)
//router.path -> VirtualCreditCard -> Bloqued and unbloqued, change the limit.

//CR System
//router.post -> PurchaseCR
//router.post -> PayCR -> new(Transaction), new(proof payment)
//router.post -> PartPayCR (Calcular adicional de 15% de juros compostos, e dividir a fatura para os próximos meses.)
//router.get -> CreditCardInvoice (List all purchases)
//router.get -> CreditCardBill (Total value to sum all purchases to period)

//Payments
//router.post -> Payment -> new(Transaction), new(proof payment)
//router.Get -> ProofPayment

//Contacts
//router.post -> FavoredContacts
//router.get -> FavoredContacts
//router.get -> FavoredPixContacts
//router.delete -> FavoredContacts
//router.path -> FavoredContacts

//Saving
//router.post -> SavingMoney
//router.path -> SavingMoney -> adjust seetings.
//router.path -> GetMoneyBack

//Billings
//router.post -> Billing
//router.get -> Billing -> By date (lançamentos futuros)
//router.path -> Billing
//router.delete -> Billing

export { router };