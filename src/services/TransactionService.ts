import { getCustomRepository } from "typeorm"
import { AccountRepository } from "../repositories/AccountRepository"
import { PixRepository } from "../repositories/PixRepository"
import { TransactionRepository } from "../repositories/TransactionRepository"

interface ITransaction {
    sender:number,
    receiver:number,
    value:number,
    type:string
}

interface ITransactionPix {
    sender:number,
    pixKey:string,
    value:number,
    type:string
}

class TransactionService {

    async getTransaction(id:string){
        this.isValidId(id)

        const transactionRepository = getCustomRepository(TransactionRepository)
        const transaction = await transactionRepository.findOne(id)

        if(!transaction){
            throw new Error("Transaction not found")
        }

        return transaction
    }

    async executeTransfer({sender, receiver, value, type}:ITransaction) {
        const accountRepository = getCustomRepository(AccountRepository)
        const transactionRepository = getCustomRepository(TransactionRepository)

        const senderAcc = await accountRepository.findOne(sender)
        
        if(!senderAcc){
            throw new Error("Sender account doesn't exists")
        }

        if(senderAcc.balance < value){
            throw new Error("Sender has insufficient funds")
        }

        const receiverAcc = await accountRepository.findOne(receiver)
        
        if(!receiverAcc){
            throw new Error("Receiver account doesn't exists")
        }

        senderAcc.withdraw(value)
        receiverAcc.deposit(value)

        const transaction = transactionRepository.create({
            sender_account: sender,
            receiver_account: receiver,
            type,
            value
        })

        await accountRepository.save(senderAcc)
        await accountRepository.save(receiverAcc)

        return await transactionRepository.save(transaction)
    }

    async preparePixTransfer({sender, pixKey, value, type}:ITransactionPix) {
        if(type != "pix"){
            throw new Error("Unsupported transaction type")
        }

        const pixRepository = getCustomRepository(PixRepository)
        const pixKeyExists = await pixRepository.findOne(pixKey)

        if(!pixKeyExists){
            throw new Error("Pix key doesn't exists")
        }

        const pixTransaction = await this.executeTransfer({
            sender,
            receiver: pixKeyExists.account,
            value,
            type
        })

        return pixTransaction
    }

    async prepareTedTransfer({sender, receiver, value, type}:ITransaction) {
        if(type != "ted"){
            throw new Error("Unsupported transaction type")
        }

        return await this.executeTransfer({
            sender,
            receiver, 
            value, 
            type
        })
    }

    async boletoDeposit(boleto:string, payingAccount:number){

        const dueFactor = boleto.substring(30, 34)
        const baseDate = new Date(1997, 10, 7).getTime()
        const dueDate = new Date(baseDate + (parseInt(dueFactor) * 86400000)) //days to milliseconds

        if((dueDate.getTime() - Date.now()) < 0){
            throw new Error("Boleto is expired")
        }

        const issuerAccount = parseInt(boleto.substring(24, 29))
        console.log("Conta: ", issuerAccount)
        const value = parseInt(boleto.substring(34))
        console.log("Valor: ", value)

        const transactionService = new TransactionService()

        return await transactionService.executeTransfer({ sender: payingAccount, receiver: issuerAccount, value, type: "boleto" })
    
    }

    isValidId(id:string){
        if(!id){
            throw new Error("Invalid transaction id")
        }
    }
}

export { TransactionService }