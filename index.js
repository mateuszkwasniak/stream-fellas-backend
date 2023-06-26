require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectMongoDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const streamersRouter = require("./routes/api/streamers");
const streamerRouter = require("./routes/api/streamer");
const PORT = process.env.PORT || 3500;

connectMongoDB();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/streamers", streamersRouter);
app.use("/streamer", streamerRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
