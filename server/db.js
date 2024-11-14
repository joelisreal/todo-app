"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Set up PostgreSQL client
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "todo_app",
});
exports.default = pool;
