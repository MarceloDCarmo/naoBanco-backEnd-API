import { getCustomRepository } from "typeorm";
import { CreditCardRepository } from "../repositories/CreditCardRepository";

import { CreditCardtBillRepository } from "../repositories/CreditCardBillRepository";
import { CreditCard } from "../entities/CreditCard";

import { ValidateCreditCard } from "../helpers/CheckCreditCard";

import { AccountRepository } from "../repositories/AccountRepository";
import { UsersRepositories } from "../repositories/UsersRepositories"

import { paydayDateGen } from "../helpers/PaydayDataGenerator";
import { parse, v4 as uuid } from "uuid"

interface ICardData{
    cardNumber: number;
    cardName: string;
    cardCvc?: number;
    //cardPassword?: number;
}

class CreditCardBillService {

    async AddPurchaseToCR({cardNumber, cardName, cardCvc, sellerStore, purchaseValue, purchasePortion, purchasePortionValue}: ICardData) {
        
        const cardChecked = ValidateCreditCard({cardNumber, cardName, cardCvc});
        if(!cardChecked){
            return "Unable validade credit card data";
        }
        

        const creditCardRepository = getCustomRepository(CreditCardRepository);
        const creditCard = await creditCardRepository.findOne(
            { where:
                { card_number: cardNumber }
            }
        )


        const dateNow = new Date()
        const creditCardBillRepository = getCustomRepository(CreditCardtBillRepository);
        const newPurchaseTo = creditCardBillRepository.create({
            account_Number: creditCard.account,
            cardId: creditCard.id,
            establishment: sellerStore,
            total_value: purchaseValue,
            portion: purchasePortion,
            portion_value: purchasePortionValue,
            purchase_date: dateNow,
            //purchase_paydate: Date,
            //last_digits: number
        })
        return newPurchaseTo;


}

export { CreditCardBillService }