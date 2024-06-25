import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('matches', (table) => {
        table.increments('id').primary();
        table.integer('matchNo').notNullable();
        table.uuid('homeTeamId').notNullable();
        table.uuid('awayTeamId').notNullable();
        table.uuid('winnerTeamId').nullable();
        table.timestamp('matchDateTime').notNullable();
        table.string('city').notNullable();
        table.string('stadium').notNullable();
        table.integer('pointsAtStake').notNullable();
        table.boolean('windowOpened').defaultTo(false);
      });
    
      await knex.schema.createTable('predictions', (table) => {
        table.increments('id').primary();
        table.uuid('userId').notNullable();
        table.integer('matchId').notNullable();
        table.uuid('predictedTeamId').nullable();
        table.integer('penalty').nullable();
        table.decimal('points').nullable();
        table.decimal('bonus').nullable();

        table.unique(['userId', 'matchId']);
        table.foreign('matchId').references('id').inTable('matches').onDelete('CASCADE');
      });

      await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.timestamps(true, true); // Optional: adds created_at and updated_at columns
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('predictions');
    await knex.schema.dropTable('matches');
    await knex.schema.dropTable('users');
}

