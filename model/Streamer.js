const mongoose = require("mongoose");
const { Schema } = mongoose;
const platforms = require("../utils/availablePlatforms");

const streamerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  platform: { type: String, required: true, enum: platforms },
  upvotes: Number,
  downvotes: Number,
});

module.exports = mongoose.model("Streamer", streamerSchema);
