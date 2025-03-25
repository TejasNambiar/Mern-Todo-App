const express = require("express");
const Todo = require("../models/todo");
const logUtil = require("../utils/logger");

const router = express.Router();

// get all tasks
router.get("/", async (req, res) => {
  try {
    logUtil.startLog("todoRoutes", "GET /");
    const todoList = await Todo.find();
    logUtil.logInfoMessage("retrieved todo list");
    res.status(200).json(todoList);
  } catch (err) {
    logUtil.errorMessage("error message: ", err.message);
    res.status(500).json({ message: "Failed to retrieve list of todos" });
  }
  logUtil.endLog("todoRoutes", "GET /");
});

// create a task
router.post("/", async (req, res) => {
  logUtil.startLog("todoRoutes", "POST /");
  try {
    const { title } = req.body;
    let newTodo = new Todo({ title });
    logUtil.logInfoMessage("Saving todo: ", newTodo);
    newTodo = await newTodo.save();
    logUtil.logInfoMessage("Saved: ", newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    logUtil.errorMessage("error message: ", err.message);
    logUtil.logInfoMessage("Error occurred:\n", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
  logUtil.endLog("todoRoutes", "POST /");
});

// update a task
router.put("/", async (req, res) => {
  logUtil.startLog("todoRoutes", "PUT /:id");
  try {
    let { id, title, completed } = req.body;
    logUtil.logInfoMessage(`updating: id:${id}\n
        title: ${title}\n completed: ${completed}  
    `);

    let updatedTodo = await Todo.findById(id);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    completed = completed ? completed : false;
    updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    logUtil.logInfoMessage("updated task to db:\n", updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (err) {
    logUtil.errorMessage("error message: ", err.message);
    res.status(500).json({ message: "Failed to update todo" });
  }
  logUtil.endLog("todoRoutes", "PUT /:id");
});

// Delete a task
router.delete("/:id", async (req, res) => {
  logUtil.startLog("todoRoutes", "DELETE /:id");
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    logUtil.errorMessage("error message: ", err.message);
    res.status(500).json({ error: "Failed to delete todo" });
  }
  logUtil.endLog("todoRoutes", "DELETE /:id");
});

module.exports = router;
