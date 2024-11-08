const express = require("express");
const pool = require("./db");

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Add a new todo
router.post("/", async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = await pool.query(
            "INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *",
            [task, false]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a todo
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const updatedTodo = await pool.query(
            "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
            [completed, id]
        );
        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await pool.query(
            "DELETE FROM todos WHERE id = $1 RETURNING *",
            [id]
        );
        res.json(deletedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
