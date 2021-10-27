import { EntityRepository, Repository } from "typeorm";
import { Pix } from "../entities/Pix";

@EntityRepository(Pix)
class PixRepository extends Repository<Pix>{

    async findKeysByAccount(accountNumber){
        return await this.createQueryBuilder()
        .where("account = :accountNumber", { accountNumber })
        .getMany()
    }
}

export{ PixRepository }