import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('teams', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable().unique();
    table.string('shortName').notNullable().unique();
    table.string('logo').notNullable();
    table.specificType('tags', 'text[]');
    table.boolean('archived').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('teams');
}