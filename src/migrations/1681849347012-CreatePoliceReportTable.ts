import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePoliceReportTable1681849347012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'police_report',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'customerVehiclePlate',
                    type: 'varchar',
                },
                {
                    name: 'customerDocument',
                    type: 'varchar',
                    length: '30',
                },
                {
                    name: 'policeReport',
                    type: 'varchar',
                },
                {
                    name: 'offender_vehicle_number',
                    type: 'varchar',
                    length: '20',
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_user_report',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('police_report');
    }

}
