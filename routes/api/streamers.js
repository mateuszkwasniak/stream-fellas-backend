const express = require("express");
const {
  getStreamers,
  addStreamer,
  markStreamer,
} = require("../../controllers/streamersController");
const streamersRouter = express.Router();

streamersRouter
  .get("/", getStreamers)
  .post("/", addStreamer)
  .put("/:streamerId/vote", markStreamer);

module.exports = streamersRouter;
