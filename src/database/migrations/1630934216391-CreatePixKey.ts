import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePixKey1630934216391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "pix",
            columns: [
                {
                    name: "key",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "type",
                    type: "varchar"
                },
                {
                    name: "account",
                    type: "integer"
                }
            ],
            foreignKeys:[
                {
                    name: "FK_ACCOUNT",
                    referencedTableName: "bank_account",
                    referencedColumnNames: ["account_number"],
                    columnNames: ["account"],
                    onDelete: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pix")
    }
}
