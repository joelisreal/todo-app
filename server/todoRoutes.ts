import express from 'express';
import pool from './db';

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos");
        res.json(result.rows);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);  // Safely access 'message' property
        } else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
});

// Get a todo
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);  // Safely access 'message' property
        } else {
            console.error('Unexpected error', err);
        }
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
        if (err instanceof Error) {
            console.error(err.message);  // Safely access 'message' property
        } else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
});

// Update a todo
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        const updatedTodo = await pool.query(
            "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *",
            [task, completed, id]
        );
        res.json(updatedTodo.rows[0]);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);  // Safely access 'message' property
        } else {
            console.error('Unexpected error', err);
        }
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
        if (err instanceof Error) {
            console.error(err.message);  // Safely access 'message' property
        } else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
});

export default router;