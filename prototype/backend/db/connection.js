import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: './config.env'});

const db = mongoose.connect(process.env.ATLAS_URI)
    .then(()=>{
        console.log("Connection to DB successful")
    })
    .catch((err)=>{
        console.error(err);
    })

export default db;