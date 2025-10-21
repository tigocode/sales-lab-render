/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messageMkt', function(table) {
    table.increments('id').primary();
    table.string('message_default', 500).notNullable();
    table.string('message_promotion').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable();

    table.integer('id_user').unsigned().notNullable();
    table.foreign('id_user').references('id').inTable('users').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('messageMkt');
};
