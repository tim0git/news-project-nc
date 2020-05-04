exports.up = function (knex) {
  console.log("create users");
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.text("username").primary().unique("username");
    usersTable.text("avatar_url");
    usersTable.text("name");
  });
};

exports.down = function (knex) {
  console.log("drop users");
  return knex.schema.dropTable("users");
};
