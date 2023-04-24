import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableVehicles1682210351652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vehicles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'year',
                    type: 'varchar',
                    length: '5',
                },
                {
                    name: 'plate',
                    type: 'varchar',
                },
                {
                    name: 'brand',
                    type: 'varchar',
                },
                {
                    name: 'chassis',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_user_report',
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vehicles');
    }

}
