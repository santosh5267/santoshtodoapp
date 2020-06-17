const express = require("express");
const router = express.Router();
const pool = require("../db");
 
//Post  todos

router.post("/todos", async (req, res) => {
    try {
      const { description,user_id } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description,user_id) VALUES($1,$2)",
        [description,user_id]
      );
      
      res.json(newTodo.rows[0]);
      
    } catch (err) {
      console.error(err.message);
    }
  });
  
  module.exports = router;

//get all todos

router.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  //get a todo

  router.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  //update a todo

  router.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  //delete a todo

  router.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });