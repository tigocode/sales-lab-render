/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('register', function(table) {
    table.increments('id').primary();
    table.string('produto').notNullable();
    table.string('categoria').notNullable();
    table.integer('quantidade').notNullable();
    table.timestamp('data_compra').defaultTo(knex.fn.now())
    table.timestamp('data_recompra').notNullable();
    table.boolean('is_repurchase').defaultTo(false);
    table.boolean('is_alert_sent').defaultTo(false);
    table.string('alert_count').notNullable();
    table.timestamp('data_send_alert').notNullable();

    table.integer('id_client').unsigned().notNullable();
    table.foreign('id_client').references('id').inTable('clients').onDelete('CASCADE');
    table.integer('id_user').unsigned().notNullable();
    table.foreign('id_user').references('id').inTable('users').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('register');
};
