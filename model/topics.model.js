const knex = require("../db/connection");

exports.selectAllTopics = (topic) => {
  return knex
    .select("*")
    .from("topics")
    .modify((query) => {
      if (topic) query.where("slug", topic);
    })
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result;
    });
};
