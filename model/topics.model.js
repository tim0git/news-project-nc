const knex = require("../db/connection");

exports.selectAllTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .then((result) => {
      return result
    });
};
