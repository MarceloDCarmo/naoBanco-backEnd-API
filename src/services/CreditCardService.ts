import { getCustomRepository } from "typeorm";
import { CreditCardRepository } from "../repositories/CreditCardRepository";
import { AccountRepository } from "../repositories/AccountRepository";
import { UsersRepositories } from "../repositories/UsersRepositories"

import { paydayDateGen } from "../helpers/PaydayDataGenerator";
import { generateCardNumber } from "../helpers/GenerateCardNumber";
import { generateAndValidateCreditCard } from "../helpers/GenerateAndValidateCreditCard";
import { hash } from "bcrypt"
import { parse, v4 as uuid } from "uuid"

interface ICreditCard{
    account_number: number;
    cardPassword: number;
    max_limit?: number;
    payday: number;
}

class CreditCardService {

    async CreateCreditCard({account_number, cardPassword, max_limit, payday}: ICreditCard) {
        
        const accountRepository = getCustomRepository(AccountRepository)
        const accountIsValid = await accountRepository.findOne(account_number)
        if(!accountIsValid){
            throw new Error("Account doesn't exists")
        }

        const creditCardRepository = getCustomRepository(CreditCardRepository);
        const cardExist = await creditCardRepository.findOne({ where:
            { account: account_number}
        })
        if(cardExist)
        {
            throw new Error("This account contains a credit card, delete it first") 
        }


        const usersRepository = getCustomRepository(UsersRepositories);
        const userName = await usersRepository.findOne({ where:
            { id: accountIsValid.user }
        })
        console.log(userName.name.toString())

        //Create and generate values to credit Card.
        const crNumber = await generateAndValidateCreditCard(16);
        const cvcNumber = parseInt(await generateCardNumber(3));
        //const hashedPassword = await hash(cardPassword.toString(), 4)
        const paydayDate = await paydayDateGen(payday);
    
        const newCreditCard = creditCardRepository.create({
            account: account_number,
            card_blocked: false,
            card_number: crNumber,
            card_name: userName.name,
            card_cvc: cvcNumber,
            password_cr: cardPassword,
            max_limit,
            next_payday: paydayDate,
            payday,
            
        })

        console.log(JSON.stringify(newCreditCard))
        await creditCardRepository.save(newCreditCard);
        return newCreditCard;

    }

    async DeleteCreditCard(card_number:number){
        try{
            const creditCardRepository = getCustomRepository(CreditCardRepository);
            const cardNumberIsValid = await creditCardRepository.findOne({ where:
                { card_number: card_number }
            })
    
            if(!cardNumberIsValid){
                throw new Error ("Credit Card doesn't exists")
            }
    
            const result = await creditCardRepository.delete({
                card_number: card_number
            })
    
            return "Credit Card Deleted"
        }catch(e)
        {
            return "error: " + e.message;
        }
    }

    async ChangeCreditCardLimit(cardnumber:number, newLimit: number){
        try{
            const creditCardRepository = getCustomRepository(CreditCardRepository);
            const cardNumberIsValid = await creditCardRepository.findOne({ where:
                { card_number: cardnumber }
            })
            if(!cardNumberIsValid){
                throw new Error ("Credit Card doesn't exists")
            }
    
            const result = await creditCardRepository.save({
                card_number: cardnumber,
                actual_limit: newLimit
            })
            return result
        }catch(e)
        {
            return "error: " + e.message;
        }
    }

    async BlockCreditCard(card_number:number, card_status: boolean){
        try{
            const creditCardRepository = getCustomRepository(CreditCardRepository);
            const cardNumberIsValid = await creditCardRepository.findOne({ where:
                { card_number: card_number }
            })
            if(!cardNumberIsValid){
                throw new Error ("Credit Card doesn't exists")
            }

            const result = await creditCardRepository.save({
                card_number: card_number,
                card_blocked: card_status
            })
            return result
        }catch(e)
        {
            return "error: " + e.message;
        }
    }

    async GetCreditCard(account_number:number){
        try{
            const creditCardRepository = getCustomRepository(CreditCardRepository);
            console.log(account_number)

            const creditCard = await creditCardRepository.findOne(
                { where:
                    { account: account_number }
                }
            )
            if(!creditCard){
                return "Account don't have a Credit Card"
            }else
            {
                console.log(creditCard.card_number)
                return creditCard
            }
        }catch(e)
        {
            return "error: " + e.message;
        }
    }

}

export { CreditCardService }