import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUsersIncidents1682212645591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_incidents',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_incidents');
    }

}
