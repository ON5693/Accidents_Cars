import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddIncidentsId1682212759879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users_incidents', new TableColumn({
            name: 'policeReport_id',
            type: 'int',
            isNullable: true
        }));

        await queryRunner.createForeignKey('users_incidents', new TableForeignKey({
            name: 'fk_users_incidents_incidents',
            columnNames: ['policeReport_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'police_report'
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_incidents', 'fk_users_incidents_incidents');

        await queryRunner.dropColumn('users_incidents', 'policeReport_id');
    }

}
