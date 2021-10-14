import { getCustomRepository } from "typeorm";
import { CreditCardRepository } from "../repositories/CreditCardRepository";

interface ICardData{
    cardNumber: number;
    cardName: string;
    cardCvc?: number;
    //cardPassword?: number;
}
//class ValidateCreditCard {

    async function ValidateCreditCard({cardNumber, cardName, cardCvc}:ICardData){

        const creditCardRepository = getCustomRepository(CreditCardRepository);
        const creditCard = await creditCardRepository.findOne(
            { where:
                { card_number: cardNumber }
            }
        )
        if(creditCard.card_number == cardNumber &&
            creditCard.card_name == cardName &&
            creditCard.card_cvc == cardCvc)
            {
                return true;
            }
        return false;
    }
//}

export {ValidateCreditCard}