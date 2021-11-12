import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Transaction1630418609747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transactions",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "sender_account",
                    type: "integer"
                },
                {
                    name: "receiver_account",
                    type: "integer"
                },
                {
                    name: "type",
                    type: "varchar"
                },
                {
                    name: "value",
                    type: "integer"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    //default: "now()"
                },
                {
                    name: "message",
                    type: "varchar"
                }
            ],
            foreignKeys:[
                {
                    name: "FK_SENDER_ACCOUNT",
                    referencedTableName: "bank_account",
                    referencedColumnNames: ["account_number"],
                    columnNames: ["sender_account"],
                    onDelete: "NO ACTION",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FK_RECEIVER_ACCOUNT",
                    referencedTableName: "bank_account",
                    referencedColumnNames: ["account_number"],
                    columnNames: ["receiver_account"],
                    onDelete: "NO ACTION",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions")
    }

}
