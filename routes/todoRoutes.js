const express = require('express')
const Todo = require('../models/todo')

const router = express.Router()

// get all tasks
router.get("/", async (req,res)=>{
    try {
        const todoList = await Todo.find()
        res.status(200).json(todoList)
    } catch (err) {
        res.status(500).json({message:'Failed to retrieve list of todos'})
    }
})

// create a task
router.post("/", async (req, res)=>{
    try {
        const {title} = req.body
        let newTodo = new Todo({title})
        console.log("Saving todo: ",newTodo)
        newTodo = await newTodo.save() 
        console.log("Saved: ",newTodo)
        res.status(201).json(newTodo)       
    } catch (err) {
        console.log('Error occurred:\n',err)
        res.status(500).json({message:'Failed to create todo'})
    }
})

// update a task
router.put("/:id", async (req, res)=>{
    try {
        const {title, completed} = req.body
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {title, completed},
            { new: true} 
        )
        res.status(200).json(updatedTodo)       
    } catch (err) {
        res.status(500).json({message:'Failed to update todo'})
    }
})

// Delete a task
router.put("/:id", async (req, res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Todo deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
      }
})

module.exports = router;