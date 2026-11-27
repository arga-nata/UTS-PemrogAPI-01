const express = require("express");
const route = require("./routes/index.");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(route);
app.use(errorMiddleware);

module.exports = app;
