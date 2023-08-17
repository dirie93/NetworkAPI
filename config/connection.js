const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/week-18-social-network-api";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
