import { Request, Response } from "express";
import { ReportEmitErrorSummary } from "typescript";
import { PixService } from "../services/PixService";

const pixService = new PixService()

class PixKeyCotroller {
    async createRandomKey(req: Request, res: Response) {
        const { accountNumber } = req.body

        const pixKey = await pixService.createRandomKey(parseInt(accountNumber))

        return res.status(201).json(pixKey)
    }

    async createEmailKey(req: Request, res: Response) {
        const { accountNumber, email } = req.body

        const pixKey = await pixService.createEmailKey(accountNumber, email)

        return res.status(201).json(pixKey)
    }

    async deleteKey(req: Request, res: Response) {
        const { pixKey } = req.body

        await pixService.deleteKey(pixKey)

        return res.status(200).json({
            pixKey,
            status: "Deleted"
        })
    }

    async getKeysByAccount(req: Request, res: Response) {
        const { accountNumber } = req.params

        const keys = await pixService.getKeysByAccount(parseInt(accountNumber))

        return res.status(200).json(keys)
    }

    async getKeyAccountInfo(req: Request, res: Response) {
        const { pixKey } = req.params

        const account = await pixService.getKeyAccountInfo(pixKey)

        return res.status(200).json(account)
    }

    async generateCopyAndPaste(req: Request, res: Response) {
        const { receiverAccount, value } = req.body

        const copyAndPasteCode = await pixService.generateCopyAndPaste(parseInt(receiverAccount), parseInt(value))

        return res.status(200).json(
            {
                copyAndPasteCode
            }
        )
    }
}

export { PixKeyCotroller }
