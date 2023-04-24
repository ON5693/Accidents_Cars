import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddUsersId1682212746531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users_incidents', new TableColumn({
            name: 'userId',
            type: 'int',
            isNullable: true
        }));

        await queryRunner.createForeignKey('users_incidents', new TableForeignKey({
            name: 'fk_users_incidents_user',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users'
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_incidents', 'fk_users_incidents_user');

        await queryRunner.dropColumn('users_incidents', 'userId');
    }

}
