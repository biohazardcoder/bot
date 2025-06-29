import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import codeRoute from './api/routes/code-route.js';
import userRoute from './api/routes/user-route.js';
import "./bot/telegram-bot.js"
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.get(['/api', '/api/'], (_, res) => {
    res.send('Welcome to the server!');
});
app.use('/api/code', codeRoute);
app.use('/api/user', userRoute);

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MongoDB URI is not defined in .env file');
}

mongoose.connect(MONGO_URI, console.log('✅ MongoDB connected'));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

