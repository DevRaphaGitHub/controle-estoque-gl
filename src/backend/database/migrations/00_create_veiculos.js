const knex = require('knex');

exports.up = function (knex) {
 return knex.schema.createTable('veiculos', table => {
    table.increments('id').primary();
    table.string('modelo').notNullable();
    table.string('chassi', 17).notNullable();
    table.string('placa', 7).notNullable();
    table.string('cor').notNullable();
    table.decimal('km', 6).notNullable();
    table.decimal('ano_fab', 4).notNullable();
    table.decimal('ano_mod', 4).notNullable();
    table.decimal('valor_venda', 4).notNullable();
    table.string('revenda').notNullable();
    table.string('situacao').notNullable();
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable('veiculos')
}