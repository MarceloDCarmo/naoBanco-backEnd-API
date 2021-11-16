import { getCustomRepository } from "typeorm"
import { PixRepository } from "../repositories/PixRepository"
import { verifyAccount } from "../helpers/VerifyAccount"
import { validate as emailIsValid } from "email-validator"
import { AccountRepository } from "../repositories/AccountRepository"
import { PixHelper } from "../helpers/PixHelper"

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

class PixService {
    async createRandomKey(accountNumber: number) {
        const pixRepository = getCustomRepository(PixRepository)

        await verifyAccount(accountNumber)

        const timestamp = Date.now().toString()
        let stringAccount = ""

        stringAccount = stringAccount.concat(timestamp)
        stringAccount = stringAccount.concat(accountNumber.toString().padStart(6, '0'))

        let pixString = "PX"

        for (let i = 0; i < stringAccount.length; i++) {
            pixString += PixRandomNumbers[parseInt(stringAccount.charAt(i))]
        }

        const pixAlreadyExists = await pixRepository.findOne(pixString)

        if (pixAlreadyExists) {
            throw new Error("Account already has random pix key")
        }

        const pixKey = pixRepository.create({
            key: pixString,
            type: "random",
            account: accountNumber
        })

        return await pixRepository.save(pixKey)
    }

    async createEmailKey(accountNumber: number, email: string) {

        if (!emailIsValid(email)) {
            throw new Error("Invalid email")
        }

        await verifyAccount(accountNumber)

        const pixRepository = getCustomRepository(PixRepository)

        const emailKeyAlreadyExists = await pixRepository.findOne(email)

        if (emailKeyAlreadyExists) {
            throw new Error("Email already used")
        }

        const pixKey = pixRepository.create({
            key: email,
            type: "email",
            account: accountNumber
        })

        return await pixRepository.save(pixKey)
    }

    async deleteKey(pixKey: string) {
        const pixRepository = getCustomRepository(PixRepository)

        const pixExists = await pixRepository.findOne(pixKey)

        if (!pixExists) {
            throw new Error("Pix key doesn't exists")
        }

        return await pixRepository.delete(pixKey)
    }

    async getKeysByAccount(accoutnNumber: number) {

        verifyAccount(accoutnNumber)

        const pixRepository = getCustomRepository(PixRepository)

        const keys = pixRepository.findKeysByAccount(accoutnNumber)

        return keys
    }

    async getKeyAccountInfo(pixKey: string) {

        const pixRepository = getCustomRepository(PixRepository)
        const key = await pixRepository.findOne(pixKey)

        if (!key) {
            throw new Error("Pix Key doesn't exist")
        }

        const accountNumber = key.account
        const accountRepository = getCustomRepository(AccountRepository)

        const account = accountRepository.findOne(accountNumber)

        return account
    }

    async generateCopyAndPaste(receiverAccount: number, value: number) {

        verifyAccount(receiverAccount)

        const pixRepository = getCustomRepository(PixRepository)

        const keys = await pixRepository.findKeysByAccount(receiverAccount)

        if (!keys) {
            throw new Error("Account doesn't have registered any pix key")
        }

        const randomKeys = keys.filter(key => {
            return key.type == "random"
        })

        let stringAccount = ""
        let pixString = ""

        if (!randomKeys.length) {
            const timestamp = Date.now().toString()

            stringAccount = stringAccount.concat(timestamp)
            stringAccount = stringAccount.concat(receiverAccount.toString().padStart(6, '0'))

            pixString = "PX"

            for (let i = 0; i < stringAccount.length; i++) {
                pixString += PixRandomNumbers[parseInt(stringAccount.charAt(i))]
            }
        } else {
            pixString = randomKeys[0].key
        }

        return PixHelper.generateCopyAndPaste(pixString, value, receiverAccount)
    }
}

export { PixService, PixRandomNumbers }