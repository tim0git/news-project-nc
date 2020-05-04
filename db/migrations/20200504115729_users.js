exports.up = function (knex) {
  console.log("create users");
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.text("username").primary().notNullable();
    usersTable.text("avatar_url").notNullable();
    usersTable.text("name").notNullable();
  });
};

exports.down = function (knex) {
  console.log("drop users");
  return knex.schema.dropTable("users");
};
