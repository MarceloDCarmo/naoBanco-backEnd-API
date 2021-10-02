import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreditCard1633183711197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "credit_card",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "account",
                        type: "integer"
                    },
                    {
                        name: "card_blocked",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "card_number",
                        type: "integer"
                    },
                    {
                        name: "card_name",
                        type: "string"
                    },
                    {
                        name: "card_cvc",
                        type: "integer"
                    },
                    {
                        name: "card_validate",
                        type: "timestamp"
                        //default: "now() + 5 Years"
                    },
                    {
                        name: "max_limit",
                        type: "integer",
                        //default: 10000
                    },
                    {
                        name: "actual_limit",
                        type: "integer"
                    },
                    {
                        name: "actual_bill",
                        type: "integer"
                    },
                    {
                        name: "next_payday",
                        type: "timestamp"
                    },
                    {
                        name: "payday",
                        type: "integer"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys:[
                    {
                        name: "FK_ACCOUNT",
                        referencedTableName: "bank_account",
                        referencedColumnNames: ["account_number"],
                        columnNames: ["account"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("credit_card")
    }

}
