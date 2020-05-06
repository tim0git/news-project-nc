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
        : result;
    });
};

exports.updateArticleById = (article_id, inc_votes = 0) => {
  return knex("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .then(() => {
      return knex("articles")
        .select("*")
        .where("articles.article_id", article_id);
    })
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result;
    });
};

exports.selectAllArticles = (sort_by = 'article_id', order = "desc", author, topic) => {
  if (
    sort_by === "article_id" ||
    sort_by === "created_at" ||
    sort_by === "author" ||
    sort_by === "topic" ||
    sort_by === "votes" ||
    sort_by === "body" ||
    sort_by === "title"
  ) {
    if (order === "desc" || order === "asc") {
      return knex
        .select("articles.*")
        .count({ comment_count: "comments.article_id" })
        .from("articles")
        .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
        .groupBy("articles.article_id")
        .modify((query) => {
          if (sort_by) query.orderBy(sort_by, order);
          if (author) query.where("articles.author", author);
          if (topic) query.where("articles.topic", topic);
        })
        .then((result) => {
          return result.length < 1
            ? Promise.reject({ status: 404, msg: "resource not found" })
            : result;
        });
    } else {
      return Promise.reject({ status: 404, msg: "bad request" });
    }
  } else {
    return Promise.reject({ status: 404, msg: "bad request" });
  }
};
// possible repitition with selectArticleById refcator to maintain DRY principle.
// cannot refactor due to article_id in selectArticleById.
