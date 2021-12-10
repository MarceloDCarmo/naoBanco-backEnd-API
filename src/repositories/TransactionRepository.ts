import { EntityRepository, Repository } from "typeorm";
import { Transaction } from "../entities/Transaction";

@EntityRepository(Transaction)
class TransactionRepository extends Repository<Transaction>{

    async findByDate(accountNumber:number, start: string, end: string){

        return await this.createQueryBuilder('transactions')
        .where("transactions.created_at BETWEEN :start AND :end", { start, end })
        .andWhere("transactions.sender_account = :accountNumber OR receiver_account = :accountNumber", { accountNumber })
        .getMany()
    }

}

export { TransactionRepository }