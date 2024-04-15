import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString);

export { mongoose };
