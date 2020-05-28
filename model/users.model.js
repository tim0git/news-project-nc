const knex = require("../db/connection");

exports.selectUserById = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result[0];
    });
};

exports.selectAllUsers = () => {
  return knex
    .select("*")
    .from("users")
    .then((result) => {
      return result.length < 1
        ? Promise.reject({ status: 404, msg: "resource not found" })
        : result;
    });
};

exports.insertUser = (body) => {
  return knex("users")
    .returning("*") //["comment_id", "author", "body", "votes", "created_at"]
    .insert({
      username: body.username,
      name: body.name,
      avatar_url: body.avatar_url,
    })
    .then((result) => {
      if (result.article_id === null) {
      }
      return result[0];
    });
}; // insert comment by article_id
