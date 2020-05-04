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
  const topicsInsertions = knex("topics").insert(topicData);
  const usersInsertions = knex("users").insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
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
        "comment_id"
      );
      const formattedKey = renameKey(formattedComments, "created_by", "author");
      const formattedDate = formatDates(formattedKey);
      console.log(formattedDate);
      return knex("comments").insert(formattedDate);
    });
};
