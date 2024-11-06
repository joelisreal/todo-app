const express = require("express");
const cors = require("cors");
const pool = require("./db");

// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/todos", async (req, res) => {
    const { task } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO todo (task) VALUES($1) RETURNING *",
            [task]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });