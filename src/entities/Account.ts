import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { User } from "./User";
// import { v4 as uuid } from "uuid";

@Entity("bank_account")
export class Account {

    @PrimaryGeneratedColumn()
    readonly account_number: number

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

    deposit(value:number){
        this.balance += value
    }

    withdraw(value:number){
        if(this.balance >= value){
            this.balance -= value
        }
    }

    setPassword(password:string){
        this.password = password
    }

    setNick(nick:string){
        this.nick = nick
    }

    constructor(){
        // if(!this.account_number){
        //     this.account_number = uuid()
        // }
        if(!this.balance){
            this.balance = 0
        }
    }
}
