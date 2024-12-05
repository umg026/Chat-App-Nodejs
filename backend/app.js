import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/users.js';
import { msgRouter } from './routes/msg.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());

// view engine setup
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/auth', authRouter)
app.use('/api/msg', msgRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`)
  connectDB()
});