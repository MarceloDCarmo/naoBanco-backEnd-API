import { Request, Response } from "express";
import { TransactionDTO } from "../dto/ToDTO";
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
        const { sender, receiver, value, type, message } = req.body
        const transactionService = new TransactionService()

        const transaction = await transactionService.prepareTedTransfer({
            sender,
            receiver,
            value,
            type,
            message
        })

        return res.status(200).json(new TransactionDTO(transaction))
    }

    async executePixTransfer(req: Request, res: Response) {
        const { sender, pixKey, value, message } = req.body
        const transactionService = new TransactionService()

        const transaction = await transactionService.preparePixTransfer({
            sender,
            pixKey,
            value,
            message
        })

        return res.status(200).json(new TransactionDTO(transaction))
    }


    async executeBoletoDeposit(req: Request, res: Response) {
        const { boletoNumber, payingAccount } = req.body
        const transactionService = new TransactionService()

        const boleto = await transactionService.boletoDeposit(boletoNumber, payingAccount)

        return res.status(200).json(boleto)
    }

    async getTransactionsByDate(req: Request, res: Response) {
        const { accountNumber, date } = req.params
        const transactionService = new TransactionService()

        const transactions = await transactionService.getTransactionsByDate(parseInt(accountNumber), new Date(date).getTime())
        const transactionsDTO = []

        transactions.forEach(transaction => {
            transactionsDTO.push(new TransactionDTO(transaction))
        })

        return res.status(200).json(transactionsDTO)
    }

    async getTransactionsByRangeDate(req: Request, res: Response) {
        const { accountNumber, startDate, endDate } = req.params
        const transactionService = new TransactionService()

        const transactions = await transactionService.getTransactionsByRangeDate(parseInt(accountNumber), new Date(startDate).getTime(), new Date(endDate).getTime())
        const transactionsDTO = []

        transactions.forEach(transaction => {
            transactionsDTO.push(new TransactionDTO(transaction))
        })

        return res.status(200).json(transactionsDTO)
    }
}

export { TransactionController }