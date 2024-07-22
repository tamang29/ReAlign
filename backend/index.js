import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Assume you have a db connection file


dotenv.config();

connectDB();  // Connect to your database

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
