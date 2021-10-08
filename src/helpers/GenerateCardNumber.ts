//import { getCustomRepository } from "typeorm"
//import { Account } from "../entities/Account"
//import { AccountRepository } from "../repositories/AccountRepository"


async function generateCardNumber(range) {

    var stringRandon = '';
    var char = '123456789';
    for (var i = 0; i < range; i++) {
        stringRandon += char.charAt(Math.floor(Math.random() * char.length));
    }
    return stringRandon;

}
export { generateCardNumber }

