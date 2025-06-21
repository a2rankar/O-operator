import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import ticketsRoutes from './routes/ticketsRoutes.js';
import { connectDb } from './config/database.js';


const app = express();
const PORT = process.env.PORT || 4002;
app.use(express.json());
app.use(cors())
app.use('/api', authRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'});
});

connectDb().then(() => {
    app.listen(PORT, () => console.log(`Server runnin in ${PORT}`));
});