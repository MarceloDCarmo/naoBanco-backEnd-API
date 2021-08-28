import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity("bank_account")
export class Account {

    @PrimaryColumn()
    readonly account_number: string

    @Column()
    nick: string

    @Column()
    password: string

    @Column()
    user: string

    @JoinColumn({ name: "user" })
    @OneToOne(() => User)
    _user: User

    @Column()
    balance: number

    constructor(){
        if(!this.account_number){
            this.account_number = uuid()
        }
        if(!this.balance){
            this.balance = 0
        }
    }
}
