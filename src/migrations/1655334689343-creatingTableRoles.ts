import { MigrationInterface, QueryRunner } from "typeorm";

export class creatingTableRoles1655334689343 implements MigrationInterface {
    name = 'creatingTableRoles1655334689343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleid" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fda64da5f551e18c5e7d7bbde7c" FOREIGN KEY ("roleid") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fda64da5f551e18c5e7d7bbde7c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleid"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
