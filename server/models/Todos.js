const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    activity: String,
    completed: Boolean,
  },
});

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;
