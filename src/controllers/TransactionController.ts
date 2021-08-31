import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";

class TransactionController {
    async getTransaction(req:Request, res:Response) {
        const { transactionId } = req.params
        const transactionService = new TransactionService()

        const transaction = await transactionService.getTransaction(transactionId)

        return res.status(200).json(transaction)
    }

    async executeTranfer(req:Request, res:Response){
        const { sender, receiver, value, type } = req.body
        const transactionService = new TransactionService()

        const transaction = await transactionService.executeTransfer({
            sender, 
            receiver, 
            value, 
            type
        })

        return res.status(200).json(transaction)
    }
}

export { TransactionController }