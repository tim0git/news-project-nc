const knex = require("../db/connection");

exports.insertComment = (body) => {
  return knex("comments")
    .returning("*")
    .insert({
      author: body.username,
      body: body.body,
    })
    .then((result) => {
      return result;
    });
};

exports.selectCommentById = (
  article_id,
  sort_by = "article_id",
  order = "desc"
) => {
  return knex
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .then((result) => {
      return result;
    });
};

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
      return result;
    });
};

exports.delCommentById = (comment_id) => {
  return knex("comments")
    .where("comment_id", comment_id)
    .returning("*")
    .del()
    .then((results) => {
      return results.length === 0
        ? { status: 404, msg: "invalid syntax" }
        : { status: 204, msg: "no content" };
    });
};
