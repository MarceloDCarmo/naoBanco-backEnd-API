import { getCustomRepository } from "typeorm"
import { AccountRepository } from "../repositories/AccountRepository"
import { TransactionRepository } from "../repositories/TransactionRepository"

interface ITransaction {
    sender:string,
    receiver:string,
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

    isValidId(id:string){
        if(!id){
            throw new Error("Invalid transaction id")
        }
    }
}

export { TransactionService }