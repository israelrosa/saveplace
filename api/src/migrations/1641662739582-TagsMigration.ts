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
      'Dentista',
      'Serviço Público',
      'Outros',
    ];

    tags.forEach(async tag => {
      try {
        await queryRunner.query(
          `INSERT INTO "tags" ("name") VALUES ('${tag}')`,
        );
      } catch (error) {
        await this.down();
      }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "tags"`);
  }
}
