import { Router } from "express"; 
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreditCardController } from "./controllers/CreditCardController";
import { AccountController } from "./controllers/AccountController";
import { UserController } from "./controllers/UserController";
import { DepositController } from "./controllers/DepositController";
import { PixKeyCotroller } from "./controllers/PixKeyController";
import { TransactionController } from "./controllers/TransactionController";
import { TestController } from "./controllers/TestController";

const router = Router();

const userController = new UserController();
const authenticateUserService = new AuthenticateUserController();
const CreditCardService = new CreditCardController()
const accountController = new AccountController()
const depostitController = new DepositController()
const transactionController = new TransactionController()
const pixKeyController = new PixKeyCotroller()
const testeController = new TestController()

//Start
router.get("/", (req, res) => {
    return res.status(200).send("<h1>Wellcome to NãoBanco!</h1>")
})

//Test
router.get("/test", testeController.getInfo)

//User
router.post("/user", (userController.CreateNewUser));
router.delete("/user", (userController.DeleteAlltoUser));
router.patch("/user/settings", (userController.updateUser));
router.get("/user/:email", (userController.getUser));
router.post("/login", (authenticateUserService.login));

//Account
router.get("/accounts/:accountNumber", accountController.getAccount)
router.get("/accounts/user/:id", accountController.getAccountsByUser)
router.post("/accounts", accountController.create)
router.delete("/accounts/:accountNumber", accountController.delete)
router.get("/accounts/:accountNumber/balance", accountController.getBalance)
router.patch("/accounts/changePass", accountController.changePassword)
router.patch("/accounts/changeNick", accountController.changeNick)

//Boleto
router.post("/generateBoleto", depostitController.generateDepositBoleto)

//Transactions
router.put("/depositTest", depostitController.deposit) //Endpoint to desposit values in accounts for tests
router.post("/deposit", transactionController.executeBoletoDeposit)  //deposit with boleto
router.get("/transactions/:transactionId", transactionController.getTransaction)
router.get("/transactions/:accountNumber/:date", transactionController.getTransactionsByDate)
router.get("/transactions/:accountNumber/:startDate/:endDate", transactionController.getTransactionsByRangeDate)
router.post("/transfers/ted", transactionController.executeTedTranfer)
router.post("/transfers/pix", transactionController.executePixTransfer)
router.post("/pix/copy-paste/pay", transactionController.executeCopyAndPastePixTransfer)

//Pix
router.get("/pixKeys/account/:accountNumber", pixKeyController.getKeysByAccount)
router.get("/pixKeys/:pixKey/info", pixKeyController.getKeyAccountInfo)
router.post("/pixKeys/random", pixKeyController.createRandomKey)
router.post("/pixKeys/email", pixKeyController.createEmailKey)
router.delete("/pixKeys", pixKeyController.deleteKey)
router.post("/pix/copy-paste/generate", pixKeyController.generateCopyAndPaste)

//VirtualCR
router.get("/cc/:accountNumber", CreditCardService.GetCreditCard)
router.get("/cc/bill/:accountNumber", CreditCardService.GetCreditCardTotalBill)
router.post("/cc", CreditCardService.NewCreditCard)
router.delete("/cc", CreditCardService.DeleteCreditCard) //-> CreditCard ->new(billing)
router.patch("/cc/userlimit", CreditCardService.ChangeCreditCardUserLimit)//
router.patch("/cc/maxlimit", CreditCardService.ChangeCreditCardMaxLimit)//
router.patch("/cc/block", CreditCardService.BlockCreditCard)
router.patch("/cc/payday", CreditCardService.ChangeCreditCardPayday)

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