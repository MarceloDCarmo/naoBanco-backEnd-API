import { Request, Response } from "express"
import { CreditCardService } from "../services/CreditCardService"

class CreditCardController {

    async NewCreditCard(req: Request, res: Response){

        const { account_number, cardPassword, max_limit, payday } = req.body
        const creditCardService = new CreditCardService()
        const creditCard = await creditCardService.CreateCreditCard({account_number, cardPassword, max_limit, payday})
        return res.status(200).json(creditCard)
    }

    async DeleteCreditCard(req: Request, res: Response){

        const {card_number} = req.body;
        const creditCardService = new CreditCardService()
        const creditCardToDelete = await creditCardService.DeleteCreditCard(card_number)
        return res.status(200).json(creditCardToDelete);

    }

    async ChangeCreditCardLimit(req: Request, res: Response){

        const {card_number, newLimit} = req.body;
        const creditCardService = new CreditCardService()
        const creditCardToChange = await creditCardService.ChangeCreditCardLimit(card_number, newLimit)
        return res.status(200).json(creditCardToChange);
    }

    async BlockCreditCard(req: Request, res: Response){

        const {card_number, card_status} = req.body;
        const creditCardService = new CreditCardService()
        const creditCardToBlock = await creditCardService.BlockCreditCard(card_number, card_status)
        return res.status(200).json(creditCardToBlock);
    }

    async GetCreditCard(req: Request, res: Response){

        const {accountNumber} = req.params;
        const creditCardService = new CreditCardService()
        const getCreditCard = await creditCardService.GetCreditCard(parseInt(accountNumber))
        return res.json(getCreditCard);
    }
}

export { CreditCardController }