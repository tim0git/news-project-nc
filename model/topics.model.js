const knex = require("../db/connection");

exports.selectAllTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result;
    });
};
