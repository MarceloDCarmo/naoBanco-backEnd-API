import { EntityRepository, Repository } from "typeorm";
import { CreditCard } from "../entities/CreditCard";

@EntityRepository(CreditCard)
class CreditCardtRepository extends Repository<CreditCard>{}

export { CreditCardtRepository }