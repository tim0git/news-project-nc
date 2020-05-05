const knex = require("../db/connection");

exports.selectUserById = (username) => {
  return knex
    .select("*")
    .from("users")
    .modify((query) => {
      if (username) query.where("username", username);
    })
    .then((result) => {
      return result;
    });
};
