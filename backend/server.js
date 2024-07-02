import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connection.js"
import userRoutes from './routes/user.js';
import subscriptionRoutes from './routes/subscription.js';
import organizationRoutes from './routes/organization.js';
import authRoutes from './routes/auth.js';
import elicitationRoutes from "./routes/elicitation.js";
import fileRoutes from "./routes/file.js";
import { fileURLToPath } from "url";
import path from "path";


dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Resolve directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db.then(() => {
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to start server due to DB connection error", error);
});


app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/auth', authRoutes); 
app.use("/api/elicitation", elicitationRoutes);
app.use("/api/file", fileRoutes);


// Default route
app.get("/", (req, res) => {
    res.send("Welcome to home page. Team 41.");
  });
  