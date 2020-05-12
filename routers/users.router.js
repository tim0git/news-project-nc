const usersRouter = require("express").Router();
const { getUserById, getAllUsers, postUser } = require("../controllers/users.controller");
const { handle405 } = require("../controllers/error.controllers");

usersRouter.route("/").get(getAllUsers).post(postUser);
usersRouter.route("/:username").get(getUserById).all(handle405); // POST, PATCH & DELETE 405 DONE

module.exports = usersRouter;
