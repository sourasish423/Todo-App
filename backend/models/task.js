const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: String,
  iscomplete: Boolean
});

module.exports = mongoose.model("Task", taskSchema);