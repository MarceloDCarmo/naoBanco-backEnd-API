import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Transaction1630418609747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Transaction",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "sender_account",
                    type: "varchar"
                },
                {
                    name: "receiver_account",
                    type: "varchar"
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
                    default: "now()"
                }
            ],
            foreignKeys:[
                {
                    name: "FK_SENDER_ACCOUNT",
                    referencedTableName: "bank_account",
                    referencedColumnNames: ["account_number"],
                    columnNames: ["sender_account"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                },
                {
                    name: "FK_RECEIVEr_ACCOUNT",
                    referencedTableName: "bank_account",
                    referencedColumnNames: ["account_number"],
                    columnNames: ["receiver_account"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
