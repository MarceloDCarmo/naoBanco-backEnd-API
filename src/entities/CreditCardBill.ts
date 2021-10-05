import {Column, CreateDateColumn, Entity, PrimaryColumn, JoinColumn, OneToOne,} from "typeorm";
import { Account } from "./Account";
import { CreditCard} from "./CreditCard";
import { v4 as uuid } from "uuid"

@Entity("CreditCardBill")
export class CreditCardBill {

    @PrimaryColumn()
    readonly id: string

    @JoinColumn({ name: "account_number" })
    @OneToOne(() => Account)
    _account: Account

    @JoinColumn({ name: "id" })
    @OneToOne(() => CreditCard)
    _cardid: CreditCard

    @CreateDateColumn()
    created_at: Date

    @Column()
    establishment: string

    @Column()
    total_value: number

    @Column()
    portion_value: number

    @Column()
    portion: number

    @Column()
    purchase_date: Date

    @Column()
    purchase_paydatee: Date

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
        if(!this.created_at){
            this.created_at = new Date()
        }
    }
}