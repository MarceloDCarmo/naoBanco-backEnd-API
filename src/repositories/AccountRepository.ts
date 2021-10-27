import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/Account";

@EntityRepository(Account)
class AccountRepository extends Repository<Account>{

    async findByUser(id:string){

        return await this.createQueryBuilder()
        .where("user = :id", { id })
        .getMany()

    }

}

export { AccountRepository }