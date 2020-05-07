const knex = require("../db/connection");

exports.selectAllTopics = (topic) => {
  return knex
    .select("*")
    .from("topics")
    .modify((query) => {
      if (topic) query.where("slug", topic);
    })
    .then((result) => {
      return result;
    });
};
