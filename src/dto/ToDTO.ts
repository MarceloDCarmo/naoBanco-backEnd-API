import { Transaction } from "../entities/Transaction"

interface ITransactionDTO {
    id: string
    created_at: string,
    senderAccount: string,
    receiverAccount: string,
    type: string,
    value: number,
    message: string
}

class TransactionDTO {

    constructor(transaction: Transaction) {
        let transactionDTO:ITransactionDTO

        transactionDTO  = {
            id: transaction.id,
            created_at: transaction.created_at.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
            senderAccount: transaction.sender_account.toString(),
            receiverAccount: transaction.receiver_account.toString(),
            type: transaction.type,
            value: transaction.value,
            message: transaction.message
        }
    
        return transactionDTO
    }
}

export { TransactionDTO, ITransactionDTO }