const express = require("express");
const app = express(); // instance of express to use its methods
const mongoose = require("mongoose");
const TodoModel = require("./models/Todos");

app.use(express.json()); // Used to parse the JSON ( without this stmnt., any req that involves the body will give an error or we can manually convert )

// Used to connect with mongo cloud database
mongoose.connect(
  "mongodb+srv://Kalyan888:Akalyan3175@cluster0.ji5goxd.mongodb.net/todoApp?retryWrites=true&w=majority"
);

// Get method
app.get("/getTodos", async (req, res) => {
  try {
    const todoFound = await TodoModel.find({});
    res.json(todoFound);
  } catch (err) {
    res.json(err);
  }
});

// Post method
app.post("/createTodo", async (req, res) => {
  const todo = req.body;
  const newTodo = new TodoModel(todo);
  await newTodo.save();

  res.json(todo);
});

app.listen(3001, () => {
  console.log("Server runs successfully...........");
});
