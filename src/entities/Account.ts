import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";

@Entity("bank_account")
export class Account {

    @PrimaryGeneratedColumn("increment")
    readonly id: number

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
        if(!this.balance){
            this.balance = 0
        }
    }
}
