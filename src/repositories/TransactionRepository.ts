import { EntityRepository, Repository } from "typeorm";
import { Transaction } from "../entities/Transaction";

@EntityRepository(Transaction)
class TransactionRepository extends Repository<Transaction>{

    async findByDate(accountNumber:number, start: number, end: number){

        return await this.createQueryBuilder()
        .where("created_at BETWEEN :start AND :end", { start, end })
        .where("sender_account = :accountNumber OR receiver_account = :accountNumber", { accountNumber })
        .getMany()
    }

}

export { TransactionRepository }