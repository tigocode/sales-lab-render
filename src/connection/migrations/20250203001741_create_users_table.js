/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('company').notNullable();
    table.string('nome').notNullable();
    table.string('telefone').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('user').notNullable();
    table.string('password').notNullable();
    table.string('token').notNullable();
    table.boolean('user_active').defaultTo(true);
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
