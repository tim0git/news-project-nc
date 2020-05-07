const knex = require("../db/connection");

exports.insertComment = (body, article_id) => {
  return knex("comments")
    .join("articles", "comments.artcile_id", "=", "artciles.artcile_id")
    .returning("*") //["comment_id", "author", "body", "votes", "created_at"]
    .where("articles.artcile_id", article_id)
    .insert({
      article_id: article_id,
      author: body.username,
      body: body.body,
    })
    .then((result) => {
      if (result.article_id === null) {
        console.log("nully");
      }
      return result;
    });
}; // insert comment by article_id

exports.selectCommentById = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return knex
    .select("*")
    .from("articles")
    .join("comments", "comments.article_id", "=", "articles.article_id")
    .where("articles.article_id", article_id)
    .orderBy(`comments.${sort_by}`, order)
    .then((result) => {
      return result;
    });
}; //

exports.incrementCommentById = (comment_id, inc_votes = 0) => {
  return knex("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", inc_votes)
    .then(() => {
      return knex("comments")
        .select("*")
        .where("comments.comment_id", comment_id);
    })
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result[0];
    });
};

exports.delCommentById = (comment_id) => {
  return knex("comments")
    .where("comment_id", comment_id)
    .del()
    .returning("*")
    .then((results) => {
      return results.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : { status: 204, msg: "no content" };
    });
};
