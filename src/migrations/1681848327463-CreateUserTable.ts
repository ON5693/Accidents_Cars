import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUserTable1681848327463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'document',
                    type: 'varchar',
                    length: '11',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'driverLicense',
                    type: 'varchar',
                    length: '30',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
