import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("pix")
export class Pix {

    @PrimaryColumn()
    key: string

    @Column()
    type: string

    @Column()
    account: number
}
