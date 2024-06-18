import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connection.js"
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/auth', authRoutes);

//Connect to mongodb atlas
db.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
}).catch((error)=>{
    console.error("Failed to start server due to DB connection error", error)
})

app.get("/", (req, res)=>{
    res.send("Welcome to home page. Team 41.");
})

