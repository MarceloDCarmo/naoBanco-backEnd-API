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

    async ChangeCreditCardUserLimit(req: Request, res: Response){

        const {card_number, newUserLimit} = req.body;
        const creditCardService = new CreditCardService()
        const creditCardToChangeUserLimit = await creditCardService.ChangeCreditCardUserLimit(card_number, newUserLimit)
        return res.json(creditCardToChangeUserLimit);
    }

    
    async ChangeCreditCardMaxLimit(req: Request, res: Response){

        const {card_number, newMaxLimit} = req.body;
        const creditCardService = new CreditCardService()
        const creditCardToChangeMaxLimit = await creditCardService.ChangeCreditCardMaxLimit(card_number, newMaxLimit)
        return res.json(creditCardToChangeMaxLimit);
    }

    async BlockCreditCard(req: Request, res: Response){

        const {card_number, card_status} = req.body;
        const creditCardService = new CreditCardService()
        const creditCardToBlock = await creditCardService.BlockCreditCard(card_number, card_status)
        return res.json(creditCardToBlock);
    }

    async GetCreditCard(req: Request, res: Response){

        const {accountNumber} = req.params;
        const creditCardService = new CreditCardService()
        const getCreditCard = await creditCardService.GetCreditCard(parseInt(accountNumber))
        return res.json(getCreditCard);
    }
}

export { CreditCardController }