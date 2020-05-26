const express = require("express");
const dbConfig = require("./knexfile");
const knexConstructor = require("knex");
const knex = knexConstructor(dbConfig);
const app = express();
const cors = require("cors");
const apiRouter = require("./routers/api.router");

const {
  handleInternalError,
  handleCustomError,
  send404,
  handlePSQLError,
} = require("./controllers/error.controllers");

app.use(cors()); //'This is CORS-enabled for all origins!'

// parse JSON
app.use(express.json());
// /api router
app.use("/api", apiRouter);
// / no rorute specified error handler
app.use(send404);

// error handle
app.use(handlePSQLError);
app.use(handleCustomError);
app.use(handleInternalError);

module.exports = knex;
module.exports = app;
