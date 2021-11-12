import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("credit_card")
export class CreditCard {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    account: number;

    // @Column()
    // account_id: string;

    // @JoinColumn({ name: "account_number" })
    // @OneToOne(() => Account)
    // _account: Account

    @Column()
    card_blocked: boolean;

    @Column()
    card_number: number;

    @Column()
    card_name: string;

    @Column()
    card_cvc: number;

    @CreateDateColumn()
    password_cr: number;

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
        if(!this.card_blocked){
            this.card_blocked = false;
        }
        if(!this.max_limit){
            this.max_limit = 15000;
        }
        if(!this.actual_limit){
            this.actual_limit = this.max_limit;
        }
        if(!this.actual_bill){
            this.actual_bill = 0;
        }
        if(!this.created_at){
            this.created_at = new Date();
        }
        if(!this.card_validate){
            this.card_validate = new Date(new Date().setFullYear(new Date().getFullYear() + 5));
        }
    }
}