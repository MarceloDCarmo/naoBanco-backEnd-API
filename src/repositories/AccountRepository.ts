import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/Account";

@EntityRepository(Account)
class AccountRepository extends Repository<Account>{}

export { AccountRepository }