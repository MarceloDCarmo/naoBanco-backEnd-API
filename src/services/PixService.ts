import { getCustomRepository } from "typeorm"
import { PixRepository } from "../repositories/PixRepository"
import { verifyAccount } from "../helpers/VerifyAccount"
import { validate as emailIsValid } from "email-validator" 

enum PixRandomNumbers {
    //RGF codes referent to the main color of some Banks
    "025C75", //Banco Central
    "FA6300", //BMG
    "9932CC", //Nubank
    "DC143C", //Bradesco
    "F5F20F", //BB
    "1E90FF", //Caixa
    "F60F0F", //Santander
    "EC7932", //Inter
    "17D348", //Next
    "D4AD68"  //Safra
}

class PixService{
    async createRandomKey(accountNumber: number){
        const pixRepository = getCustomRepository(PixRepository)
        
        await verifyAccount(accountNumber)
        
        let stringAccount = accountNumber.toString()

        while(stringAccount.length < 6) {
            stringAccount = "0" + stringAccount
        }

        let pixString = "PX"

        for (let i = 0; i < stringAccount.length; i++) {
            pixString += PixRandomNumbers[parseInt(stringAccount.charAt(i))]
        }

        const pixAlreadyExists = await pixRepository.findOne(pixString)

        if(pixAlreadyExists){
            throw new Error("Account already has random pix key")
        }

        const pixKey = pixRepository.create({
            key: pixString,
            type: "random",
            account: accountNumber
        })

        return await pixRepository.save(pixKey)
    }

    async createEmailKey(accountNumber: number, email: string){
        
        if(!emailIsValid(email)){
            throw new Error("Invalid email")
        }

        await verifyAccount(accountNumber)

        const pixRepository = getCustomRepository(PixRepository)

        const emailKeyAlreadyExists = await pixRepository.findOne(email)

        if(emailKeyAlreadyExists){
            throw new Error("Email already used")
        }

        const pixKey = pixRepository.create({
            key: email,
            type: "email",
            account: accountNumber
        })
        
        return await pixRepository.save(pixKey)
    }
}

export { PixService, PixRandomNumbers }