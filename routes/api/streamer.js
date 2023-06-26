const express = require("express");
const { getStreamer } = require("../../controllers/streamersController");
const streamerRouter = express.Router();

streamerRouter.get("/:streamerId", getStreamer);

module.exports = streamerRouter;
