import { EntityRepository, Repository } from "typeorm";
import { CreditCard } from "../entities/CreditCard";

@EntityRepository(CreditCard)
class CreditCardRepository extends Repository<CreditCard>{}

export { CreditCardRepository }