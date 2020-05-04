exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author");
    commentsTable.foreign("author").references("users.username");
    commentsTable.integer("comment_votes").defaultTo(0);
    commentsTable.datetime("created_at");
    commentsTable.text("body");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
