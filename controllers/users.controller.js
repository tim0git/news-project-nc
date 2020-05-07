const { selectAllUsers } = require("../model/users.model");
const { selectUserById } = require("../model/users.model");

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then((result) => {
      res.status(200).send({ user: result });
    })
    .catch(next);
};
