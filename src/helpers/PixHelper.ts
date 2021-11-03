abstract class PixHelper {

    static generateCopyAndPaste(pixKey: string, value: number, receiverAccount: number) {

        let copyAndPasteCode = ""
        copyAndPasteCode = copyAndPasteCode.concat(pixKey)
        copyAndPasteCode = copyAndPasteCode.concat(Date.now().toString())
        copyAndPasteCode = copyAndPasteCode.concat(receiverAccount.toString().padStart(5, '0'))
        copyAndPasteCode = copyAndPasteCode.concat(value.toString().padStart(10, '0'))

        return copyAndPasteCode
    }

    static decodeCopyAndPaste(code: string) {

        const receiverAccount = parseInt(code.substring(51, 56))
        const value = parseInt(code.substring(56))

        return {
            receiverAccount,
            value
        }
    }
}

export { PixHelper }