# Todo Application (PERN Stack)

This is a simple **Todo application** built using the **PERN** stack, which includes:

- **P**: PostgreSQL (Database)
- **E**: Express.js (Backend)
- **R**: React (Frontend)
- **N**: Node.js (Backend Runtime)

### Features
- Users can add, edit, and delete tasks.
- The app uses PostgreSQL to store todo data.
- Built with Express.js for the backend API.
- Frontend is built with React and connects to the backend via API calls.

---

## Getting Started

### Prerequisites
Before running the application, make sure you have the following installed:

- **Node.js** (>=v22.11.0)
- **npm** (>=v10.9.0)
- **PostgreSQL** (>=v17.0)

If you don't have PostgreSQL installed, follow the installation guide [here](https://www.postgresql.org/download/).

---

### Backend Setup

The backend is built using **Express.js** and **Node.js** and communicates with a **PostgreSQL** database.

#### 1. Clone the repository

```bash
git clone https://github.com/joelisreal/todo-app.git
```

#### 2. Install Backend Dependencies

Navigate to the **server** directory and install the required dependencies:

```bash
cd server
npm install

```

#### 3. Set Up the PostgreSQL Database

- Create a new PostgreSQL database for the app:

```bash
psql -U postgres
CREATE DATABASE todo_app;
```

- Create the necessary tables (You can modify this based on your schema):

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
```

Replace `postgres` and `password` in the db.ts file with your PostgreSQL credentials.

#### 4. Run the Backend

Run the following command to start the backend server:

```bash
npm run build    # Build the production-ready files
npm start        # Start the backend server
```

This will start the backend on port **5000** by default.

---

### Frontend Setup

The frontend is built using **React** and interacts with the backend via API calls.

#### 1. Install Frontend Dependencies

Navigate to the **client** directory and install the dependencies:

```bash
cd client
npm install
```

#### 2. Run the Frontend

To run the frontend in development mode, use the following command:

```bash
npm run dev
```

This will start the frontend development server.

---

## File Structure

The project has the following structure:

```
todo-app/
│
├── client/             # Frontend (React)
│   ├── node_modules/
│   ├── public/           # Public files (index.html)
│   ├── src/              # React source code
│   └── package.json      # Frontend dependencies
├── server/             # Backend API (Express.js)
│   ├── node_modules/
│   ├── index.ts        # Entry point of the backend
│   ├── database.sql      # SQL commands to create the database schema (
│   ├── todoRoutes.ts     # API routes (for todos)
│   └── package.json      # Backend dependencies
│
│
└── README.md            # This file
```

---

## Available Commands

### Backend

- **`npm run build`**  
  Builds the production-ready version of the backend (optional if deploying).

- **`npm start`**  
  Starts the backend server on port **5000** (or the port defined in `.env`).

### Frontend

- **`npm run dev`**  
  Starts the frontend development server on port **3000** (or the port defined in `.env`).

---

## API Endpoints

Here are the basic API endpoints available in the backend:

- **GET** `http://localhost:${PORT}/todos`  
  Fetch all todos.

- **POST** `http://localhost:${PORT}/todos`  
  Create a new todo.

- **PUT** `http://localhost:${PORT}/todos/:id`  
  Update a specific todo.

- **DELETE** `http://localhost:${PORT}/todos/:id`  
  Delete a specific todo.

---

## Troubleshooting

- **CORS Issue**: If you encounter CORS issues when connecting the frontend to the backend, make sure to enable CORS in the backend by installing the `cors` package:

  ```bash
  npm install cors
  ```

---

## License

This project is open source and available under the [MIT License](LICENSE).
