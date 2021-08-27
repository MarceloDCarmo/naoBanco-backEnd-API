import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBankAccount1630019750063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bank_account",
                columns: [
                    {
                        name: "account_number",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "nick",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "user",
                        type: "uuid"
                    },
                    {
                        name: "balance",
                        type: "integer"
                    }
                ],
                foreignKeys:[
                    {
                        name: "FK_USER_ACCOUNT",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            }))
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bank_account");
    }
}
