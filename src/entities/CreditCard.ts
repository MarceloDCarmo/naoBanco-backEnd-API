import {Column, CreateDateColumn, Entity, PrimaryColumn, JoinColumn, OneToOne,} from "typeorm";
import { Account } from "./Account";
import { v4 as uuid } from "uuid"

@Entity("credit_card")
export class CreditCard {

    @PrimaryColumn()
    readonly id: string;

    @JoinColumn({ name: "account_number" })
    @OneToOne(() => Account)
    _account: Account

    @Column()
    card_blocked: boolean;

    @Column()
    card_number: number;

    @Column()
    card_name: string;

    @Column()
    card_cvc: string;

    @Column()
    card_validate: Date;

    @Column()
    max_limit: number;

    @Column()
    actual_limit: number;

    @Column()
    actual_bill: number;

    @Column()
    next_payday: Date;

    @Column()
    payday: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
        if(!this.created_at){
            this.created_at = new Date();
        }
        if(!this.card_validate){
            this.card_validate = new Date(new Date().setFullYear(new Date().getFullYear() + 5));
        }
        // if(!this.payday_bill){
        //     this.payday_bill = new Date(new Date().setMonth(new Date().getMonth() + 1));
        // }
    }
}