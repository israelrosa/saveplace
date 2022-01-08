import { MigrationInterface, QueryRunner } from 'typeorm';

export default class TagsMigration1641662739582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = [
      'Mercado',
      'Banco',
      'Lotérica',
      'Supermercado',
      'Farmácia',
      'Padaria',
      'Loja',
      'Serviço Público',
      'Outros',
    ];

    tags.forEach(async tag => {
      await queryRunner.query(`INSERT INTO "tags" ("name") VALUES ('${tag}')`);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "tags"`);
  }
}
