import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreditCardBill1633188704127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "creditCard_bill",
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
                        name: "card_id",
                        type: "string",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        //default: "now()"
                    },
                    {
                        name: "establishment",
                        type: "string"
                    },
                    {
                        name: "total_value",
                        type: "integer"
                    },
                    {
                        name: "portion_value",
                        type: "integer"
                    },
                    {
                        name: "portion",
                        type: "integer",
                    },
                    {
                        name: "purchase_date",
                        type: "timestamp",
                    },
                    {
                        name: "purchase_paydate",
                        type: "timestamp",
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
                    {
                        name: "FK_CARD_ID",
                        referencedTableName: "credit_card",
                        referencedColumnNames: ["id"],
                        columnNames: ["card_ID"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("credit_card")
    }

}
