/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('discard_type', function(table) {
    table.increments('id').primary();
    table.string('categoria').notNullable();
    table.integer('quantidade_lente_caixa').notNullable();
    table.integer('tempo_descarte').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });

  await knex('discard_type').insert([
    { categoria: 'Uso unico', quantidade_lente_caixa: 30, tempo_descarte: 1 },
    { categoria: 'Reusaveis', quantidade_lente_caixa: 6, tempo_descarte: 14 },
    { categoria: 'Mensal', quantidade_lente_caixa: 6, tempo_descarte: 30 },
    { categoria: 'Trimestral', quantidade_lente_caixa: 2, tempo_descarte: 90 },
    { categoria: 'Anual', quantidade_lente_caixa: 2, tempo_descarte: 365 },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('discard_type');
};
