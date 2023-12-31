import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";    
import loginRouter from "./routes/authenticationRoutes";
import githubSearchRoutes from "./routes/githubSearchRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";


dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URL must be defined');
}
const mongoUri: string = process.env.MONGO_URI;

if (!process.env.PORT) {
    throw new Error('PORT must be defined');
}

const port: number = parseInt(process.env.PORT, 10);

const app: Application = express();

// CONNECT TO MONGODB DATABASE
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err}`);
} );

db.once('open', () => {
    console.log('DB connected successfully!');
} );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/github/', githubSearchRoutes);
app.use('/api', authenticationRoutes)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
} );

