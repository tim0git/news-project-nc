const knex = require("../db/connection");

exports.selectUserById = (username) => {
  return knex
    .select("*")
    .from("users")
    .modify((query) => {
      if (username) query.where("username", username);
    })
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result;
    });
};
