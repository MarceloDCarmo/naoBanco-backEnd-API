import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreditCardController } from "./controllers/CreditCardController";
import { AccountController } from "./controllers/AccountController";
import { UserController } from "./controllers/UserController";
import { DepositController } from "./controllers/DepositController";
import { PixKeyCotroller } from "./controllers/PixKeyController";
import { TransactionController } from "./controllers/TransactionController";

const router = Router();

const userController = new UserController();
const authenticateUserService = new AuthenticateUserController();
const CreditCardService = new CreditCardController()
const accountController = new AccountController()
const depostiController = new DepositController()
const transactionController = new TransactionController()
const pixKeyController = new PixKeyCotroller()

//User
router.post("/users", (userController.CreateNewUser));
router.delete("/users", (userController.DeleteAlltoUser));
//roter.path("/users/settings
router.post("/login", (authenticateUserService.handle));

//Account
router.post("/accounts", accountController.create)
router.delete("/accounts/:accountNumber", accountController.delete)
router.get("/accounts/:accountNumber/balance", accountController.getBalance)
//roter.get("/accounts -> Show account list to user.
//roter.path("/accounts/settings -> Change nick or password.

//Boleto
router.post("/generateBoleto", depostiController.generateDepositBoleto)

//Transactions
router.put("/depositTest", depostiController.deposit) //Endpoint to desposit values in accounts for tests
router.post("/deposit", transactionController.executeBoletoDeposit)  //deposit with boleto
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
router.get("/cc/:accountNumber", CreditCardService.GetCreditCard)
router.post("/cc", CreditCardService.NewCreditCard)
router.delete("/cc", CreditCardService.DeleteCreditCard) //-> CreditCard ->new(billing)
router.patch("/cc/userlimit", CreditCardService.ChangeCreditCardUserLimit)//
router.patch("/cc/maxlimit", CreditCardService.ChangeCreditCardMaxLimit)//
router.patch("/cc/block", CreditCardService.BlockCreditCard)

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