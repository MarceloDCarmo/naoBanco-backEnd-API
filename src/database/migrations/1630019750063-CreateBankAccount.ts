import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBankAccount1630019750063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bank_account",
                columns: [
                    {
                        name: "account_number",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
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
                        type: "varchar"
                    },
                    {
                        name: "balance",
                        type: "integer"
                    }
                ],
                foreignKeys:[
                    {
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user"]
                    }
                ]
            }))
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bank_account");
    }
}
