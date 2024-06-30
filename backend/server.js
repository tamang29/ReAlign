import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connection.js"
import userRoutes from './routes/user.js';
import projectRoutes from './routes/project.js';
import exportRoutes from './routes/export.js';


dotenv.config({path: './config.env'});

const PORT = process.env.PORT;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//custom routes
app.use('/api/user',userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/export', exportRoutes);

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

