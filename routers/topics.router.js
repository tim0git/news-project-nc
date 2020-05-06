const topicsRouter = require("express").Router();
const {getAllTopics} = require('../controllers/topics.controller')
const { handle405 } = require("../controllers/error.controllers");

topicsRouter.route('/').get(getAllTopics).all(handle405); // POST, PATCH & DELETE 405 DONE

module.exports = topicsRouter;