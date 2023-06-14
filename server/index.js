const express = require("express");
const app = express(); // Intanse of express, so we can use all the methods in it.
const mongoose = require("mongoose");
const TodoModel = require("./models/Todos");

app.use(express.json()); // Used to parse the JSON ( without this stmnt., any req that involves the body will give an error or we can manually convert )

const cors = require("cors"); // Allow us to connect the APIS to React(Frontend) without giving us any errors
app.use(cors());

// Used to connect with mongo cloud database
mongoose.connect(
  "mongodb+srv://Kalyan888:Akalyan3175@cluster0.ji5goxd.mongodb.net/todoApp?retryWrites=true&w=majority"
);

// Get method
app.get("/getTodos", async (req, res) => {
  try {
    const todoFound = await TodoModel.find({}); // find method with empty "{}" fetches all the records available in db.
    res.json(todoFound);
  } catch (err) {
    res.json(err);
  }
});

// Post method
app.post("/createTodo", async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body); // Create a new instance of your model using the request body.
    const savedTodo = await newTodo.save(); // Save the document to the database.
    res.json(savedTodo);
  } catch (err) {
    res.json(err);
  }
});

app.delete("/deleteTodo", async (req, res) => {
  try {
    const delTodo = new TodoModel(req.body); // Create a new instance of your model using the request body.
    const deletedTodo = await delTodo.delete(); // Save the document to the database.
    res.json(deletedTodo);
  } catch (err) {
    res.json(err);
  }
});

app.listen(3001, () => {
  console.log("Server runs successfully...........");
});
