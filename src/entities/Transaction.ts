import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("transactions")
export class Transaction {

    @PrimaryColumn()
    readonly id: string

    @Column()
    sender_account: number

    @Column()
    receiver_account: number

    @Column()
    type: string

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
        if(!this.created_at){
            this.created_at = new Date()
        }
    }
}
