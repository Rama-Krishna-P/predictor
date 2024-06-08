import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('teams', function(table) {
        table.increments('id')
        table.string('name').notNullable()
        table.string('shortName').notNullable()
        table.string('logo').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

