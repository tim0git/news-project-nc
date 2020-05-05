const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const {
  formatDates,
  formatComments,
  makeRefObj,
  renameKey,
} = require("../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const dateFormatted = formatDates(articleData);
      return knex
        .insert(dateFormatted)
        .into("articles")
        .returning("*")
        .then((articleRows) => {
          return articleRows;
        });
    })
    .then((articleRows) => {
      const articleRef = makeRefObj(articleRows, "title", "article_id");
      const formattedComments = formatComments(
        commentData,
        articleRef,
        "belongs_to",
        "article_id"
      );
      const formattedKey = renameKey(formattedComments, "created_by", "author");
      const formattedDate = formatDates(formattedKey);
      return knex("comments").insert(formattedDate);
    });
}; // seeds both test & dev data
