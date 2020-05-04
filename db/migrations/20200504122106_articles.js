exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.text("title").notNullable(); //notNull()?
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.text("topic").notNullable();
    articlesTable.foreign("topic").references("topics.slug");
    articlesTable.text("author").notNullable();
    articlesTable.foreign("author").references("users.username");
    articlesTable.datetime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
