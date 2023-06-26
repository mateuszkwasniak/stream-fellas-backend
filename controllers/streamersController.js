const Streamer = require("../model/Streamer");

const getStreamers = async (req, res) => {
  try {
    const streamers = await Streamer.find();
    res.status(200).json(streamers);
  } catch (error) {
    next(error);
  }
};

const getStreamer = async (req, res) => {
  const streamerId = req?.params?.streamerId;
  if (!streamerId) {
    return res.status(400).json({ message: "Streamer id is required" });
  }
  try {
    const streamer = await Streamer.findOne({ _id: streamerId }).exec();
    if (!streamer) {
      return res.status(204).json({ message: "No streamer for that id" });
    }
    res.status(200).json(streamer);
  } catch (error) {
    next(error);
  }
};

const addStreamer = async (req, res, next) => {
  const streamer = req?.body;
  if (!streamer.name || !streamer.description || !streamer.platform) {
    return res.status(400).json({
      message:
        "Incomplete streamer's data - name, description and streaming platform are required",
    });
  }
  try {
    const existingStreamer = await Streamer.findOne({
      name: streamer.name.toUpperCase(),
    });
    if (existingStreamer) {
      return res
        .status(403)
        .json({ message: "Streamer with such name already exists" });
    }
    const newStreamer = new Streamer({ ...streamer, upvotes: 0, downvotes: 0 });
    await newStreamer.save();
    const allStreamers = await Streamer.find();
    res.status(201).json(allStreamers);
  } catch (error) {
    next(error);
  }
};

const markStreamer = async (req, res) => {
  const streamerId = req?.params?.streamerId;
  const vote = req?.body;
  if (!streamerId || !vote?.type) {
    return res
      .status(400)
      .json({ message: "Streamer id and vote are required" });
  }

  try {
    const streamer = await Streamer.findOne({ _id: streamerId }).exec();
    if (!streamer) {
      return res.status(204).json({ message: "No streamer for that id" });
    }
    switch (vote.type) {
      case "upvote":
        streamer.upvotes++;
        await streamer.save();
        break;
      case "downvote":
        streamer.downvotes++;
        await streamer.save();
        break;
      default:
        return res.status(400).json({ message: "Unknown vote type" });
    }

    res.status(200).json(streamer);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStreamer, getStreamers, addStreamer, markStreamer };
