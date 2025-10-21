/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('graduation', function(table) {
    table.increments('id').primary();
    table.string('olho').notNullable();
    table.string('esferico').notNullable();
    table.string('cilindrico').notNullable();
    table.string('eixo').notNullable();
    table.string('adicao').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now())

    table.integer('id_register').unsigned().notNullable();
    table.foreign('id_register').references('id').inTable('register').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('graduation');
};
