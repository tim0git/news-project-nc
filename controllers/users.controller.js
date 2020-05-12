const { selectUserById, selectAllUsers, insertUser } = require("../model/users.model");

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then((result) => {
      res.status(200).send({ user: result });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  selectAllUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const { body } = req;
  insertUser(body)
    .then((user) => {
      res.status(201).send({ user: user });
    })
    .catch(next);
};
