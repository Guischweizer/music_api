const tableName = "musics"

exports.up = knex =>
    knex.schema.createTable(tableName, tbl => {
        tbl.increments('id').primary();
        tbl.string('name').notNullable();
        tbl.string('rating').notNullable();
        tbl.string('description')
    });

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};