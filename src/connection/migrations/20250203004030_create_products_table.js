/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('modelo').notNullable();
    table.string('fabricante').notNullable();
    table.string('categoria').notNullable();
    table.decimal('valor_unitario').notNullable();
    table.decimal('valor_revenda').notNullable();
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
  return knex.schema.dropTable('products');
};
