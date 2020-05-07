const knex = require("../db/connection");

exports.selectArticleById = (article_id) => {
  return knex
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .modify((query) => {
      if (article_id) query.where("articles.article_id", article_id);
    })
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result[0];
    });
};

exports.updateArticleById = (article_id, inc_votes = 0) => {
  if (inc_votes === 0)
    return Promise.reject({ status: 400, msg: "bad request" });

  return knex("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result;
    });
};

exports.selectAllArticles = (
  sort_by = "article_id",
  order = "desc",
  author,
  topic
) => {
  if (order === "desc" || order === "asc") {
    return knex
      .select("articles.*")
      .count({ comment_count: "comments.article_id" })
      .from("articles")
      .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .modify((query) => {
        if (author) query.where("articles.author", author);
        if (topic) query.where("articles.topic", topic);
      })
      .then((result) => {
        return result.length < 1
          ? Promise.reject({ status: 404, msg: "resource not found" })
          : result;
      });
  } else {
    return Promise.reject({ status: 404, msg: "bad request" }); // bad request for orderBy
  }
};
