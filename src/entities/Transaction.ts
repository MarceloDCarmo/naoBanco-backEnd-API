import {Column, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity()
export class Transaction {

    @PrimaryColumn()
    id: string

    @Column()
    sender_account: string

    @Column()
    receiver_account: string

    @Column()
    type: string

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }
}
