const tableName = "users";

exports.up = function (knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.string("first_name").nullable();
        table.string("last_name").nullable();
        table.string("email").unique();
        table.string("password");
        table.string("token");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};