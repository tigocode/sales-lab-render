/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('free_time', function(table) {
    table.increments('id').primary();
    table.integer('id_user').unsigned().notNullable();
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time').notNullable();
    table.string('remaining_time').notNullable();
    table.boolean('first_license').notNullable();
    table.boolean('updated_license').notNullable();

    table.foreign('id_user').references('id').inTable('users').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('free_time');
};
