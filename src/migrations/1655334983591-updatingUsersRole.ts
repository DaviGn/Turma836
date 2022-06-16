import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatingUsersRole1655334983591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update "users" set roleid = '5be3f402-0c14-4ece-90a1-121bebae2a00' where roleid is null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update "users" set roleid = null where roleid = '5be3f402-0c14-4ece-90a1-121bebae2a00'`,
    );
  }
}
