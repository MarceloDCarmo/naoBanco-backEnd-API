class BoletoHelper {

    generate(issuerAccount:number, value:number, dueDate:Date):string{
        let boletoNumber:string
        
        boletoNumber = 'BOL923571113171923293137'
        boletoNumber = boletoNumber.concat(issuerAccount.toString().padStart(5, '0'))
        boletoNumber = boletoNumber.concat('7')

        const baseDate = new Date(1997, 10, 7)
        let dueFactor = dueDate.getTime() - baseDate.getTime()
        dueFactor = Math.floor(dueFactor / 86400000) //milliseconds to days

        boletoNumber = boletoNumber.concat(dueFactor.toString())

        let valueString = value.toString().padStart(10 ,'0')

        boletoNumber = boletoNumber.concat(valueString)
        
        return boletoNumber
    }
}

export { BoletoHelper }