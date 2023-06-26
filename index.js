require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectMongoDB = require("./config/dbConnection");
const PORT = process.env.PORT || 3500;

connectMongoDB();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Welcome test." });
});

app.all("*", (req, res) => {
  res.status(404).type("text/plain").send("404 Not Found");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
