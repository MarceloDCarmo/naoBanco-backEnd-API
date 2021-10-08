import { getCustomRepository } from "typeorm";
import { CreditCardRepository } from "../repositories/CreditCardRepository";
import { generateCardNumber } from "./GenerateCardNumber";

async function generateAndValidateCreditCard(range: number){

    let isValid = false;
    const creditCardRepository = getCustomRepository(CreditCardRepository);
    do{
        let cardNumber = parseInt(await generateCardNumber(range));
        const cardNumberIsValid = await creditCardRepository.findOne({ where:
            { card_number: cardNumber }
        })
        if(cardNumberIsValid){
            console.log("CreditCard Number exist. Generate a new number.")
        }else{
            return cardNumber
        }

    }while(isValid)

    
}

export {generateAndValidateCreditCard}