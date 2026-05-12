const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId:String,
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
//for storing new user data in the database