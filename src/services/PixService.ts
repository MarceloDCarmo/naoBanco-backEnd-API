import { getCustomRepository } from "typeorm"
import { PixRepository } from "../repositories/PixRepository"
import { verifyAccount } from "../helpers/VerifyAccount"

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
        
        verifyAccount(accountNumber)
        
        let stringAccount = accountNumber.toString()

        while(stringAccount.length < 6) {
            stringAccount = "0" + stringAccount
        }

        let pixString = "PX"

        for (let i = 0; i < stringAccount.length; i++) {
            pixString += PixRandomNumbers[parseInt(stringAccount.charAt(i))]
        }

        const pixKey = pixRepository.create({
            key: pixString,
            type: "random",
            account: accountNumber
        })

        return await pixRepository.save(pixKey)
    }
}

export { PixService, PixRandomNumbers }