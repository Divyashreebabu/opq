const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  provider: String,
  providerId: String,
  email: String,
  name: String,
  picture: String,
});

module.exports = mongoose.model("User", userSchema);
