import { Request, Response } from "express"
import { CreditCardBillService } from "../services/CreditCardBillService"

class CreditCardController {

    
    async PurchaseCR(req: Request, res: Response){

        const { cardNumber, cardPassword, cardCvc} = req.body
        const creditCardBillService = new CreditCardBillService()
        const purchaseToAdd = await creditCardBillService.AddPurchaseToCR({cardNumber, cardPassword, cardCvc})
        return res.json(purchaseToAdd)
    }

}

export { CreditCardController }