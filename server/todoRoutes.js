"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
// Get all todos
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM todos");
        res.json(result.rows);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message); // Safely access 'message' property
        }
        else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
}));
// Get a todo
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query("SELECT * FROM todos WHERE id = $1", [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message); // Safely access 'message' property
        }
        else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
}));
// Add a new todo
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    try {
        const newTodo = yield db_1.default.query("INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *", [task, false]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message); // Safely access 'message' property
        }
        else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
}));
// Update a todo
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        const updatedTodo = yield db_1.default.query("UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *", [task, completed, id]);
        res.json(updatedTodo.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message); // Safely access 'message' property
        }
        else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
}));
// Delete a todo
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTodo = yield db_1.default.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);
        res.json(deletedTodo.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message); // Safely access 'message' property
        }
        else {
            console.error('Unexpected error', err);
        }
        res.status(500).send("Server Error");
    }
}));
exports.default = router;
