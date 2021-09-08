import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";

class TransactionController {

    async getTransaction(req: Request, res: Response) {
        const { transactionId } = req.params
        const transactionService = new TransactionService()

        const transaction = await transactionService.getTransaction(transactionId)

        const transactionDTO = {
            id: transaction.id,
            created_at: transaction.created_at.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
            sender_account: transaction.sender_account,
            receiver_account: transaction.receiver_account,
            type: transaction.type,
            value: transaction.value
        }

        return res.status(200).json(transactionDTO)
    }

    async executeTedTranfer(req: Request, res: Response) {
        const { sender, receiver, value, type } = req.body
        const transactionService = new TransactionService()
        
        const transaction = await transactionService.prepareTedTransfer({
            sender,
            receiver,
            value,
            type
        })

        const transactionDTO = {
            id: transaction.id,
            created_at: transaction.created_at.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
            sender_account: transaction.sender_account,
            receiver_account: transaction.receiver_account,
            type: transaction.type,
            value: transaction.value
        }

        return res.status(200).json(transactionDTO)
    }

    async executePixTransfer(req: Request, res: Response) {
        const { sender, pixKey, value, type } = req.body
        const transactionService = new TransactionService()
        
        const transaction = await transactionService.preparePixTransfer({
            sender,
            pixKey,
            value,
            type
        })
        
        const transactionDTO = {
            id: transaction.id,
            created_at: transaction.created_at.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
            sender_account: transaction.sender_account,
            receiver_account: transaction.receiver_account,
            type: transaction.type,
            value: transaction.value
        }

        return res.status(200).json(transactionDTO)
    }

    // async executeTransfer(req: Request, res: Response) {
    
    //     const { type } = req.body
    
    //     if (type === "ted") {
    //         const { sender, receiver, value } = req.body
    //         const transactionService = new TransactionService()
    
    //         const transaction = await transactionService.executeTransfer({
    //             sender,
    //             receiver,
    //             value,
    //             type
    //         })
    
    //         const transactionDTO = {
    //             id: transaction.id,
    //             created_at: transaction.created_at.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    //             sender_account: transaction.sender_account,
    //             receiver_account: transaction.receiver_account,
    //             type: transaction.type,
    //             value: transaction.value
    //         }
    
    //         return res.status(200).json(transactionDTO)
    //     } else if (type === "pix") {
    //         const { sender, pixKey, value } = req.body
    //         const transactionService = new TransactionService()
    
    //         const transaction = await transactionService.preparePixTransfer({
    //             sender,
    //             pixKey,
    //             value,
    //             type
    //         })
    
    //         const transactionDTO = {
    //             id: transaction.id,
    //             created_at: transaction.created_at.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    //             sender_account: transaction.sender_account,
    //             receiver_account: transaction.receiver_account,
    //             type: transaction.type,
    //             value: transaction.value
    //         }
    
    //         return res.status(200).json(transactionDTO)
    //     } else {
    //         throw new Error("Unsupported transaction type")
    //     }
    
    // }
}

export { TransactionController }