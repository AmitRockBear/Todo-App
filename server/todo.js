const express = require("express");
const pool = require("./db");
const router = express.Router();

// Getting all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Getting todo by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a todo
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("entered post req", id);
    const { description } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
      [description, id]
    );
    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Adding a todo
router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Deleting a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todo where todo_id=$1 RETURNING *",
      [id]
    );
    res.json(deletedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
