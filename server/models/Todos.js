const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todoItem: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;
