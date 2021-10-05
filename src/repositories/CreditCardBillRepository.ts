import { EntityRepository, Repository } from "typeorm";
import { CreditCardBill } from "../entities/CreditCardBill";

@EntityRepository(CreditCardBill)
class CreditCardtBillRepository extends Repository<CreditCardBill>{}

export { CreditCardtBillRepository }