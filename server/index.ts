import express from 'express';
import cors from 'cors';
import todoRoutes from './todoRoutes';

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });