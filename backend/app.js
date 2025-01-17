import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/users.js';
import { msgRouter } from './routes/msg.js';
import cors from 'cors';
// import morgan from 'morgan';
import { app, io, server } from './config/socket.js';
import swaggerUi  from 'swagger-ui-express';
import swaggerDocument  from './swagger-output.json' assert { type: 'json' };

dotenv.config();
const __dirname = path.resolve()

// const app = express(); // remove when import socket implement
app.use(express.json());
// app.use(morgan())
// view engine setup
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger docs

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
})
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`)
  connectDB()
});