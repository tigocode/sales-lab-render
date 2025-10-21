/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('clients', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('sexo').notNullable();
    table.timestamp('data_nascimento').notNullable();
    table.string('email').unique().notNullable();
    table.string('telefone').unique().notNullable();
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
  return knex.schema.dropTable('clients');
};
