import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
import express from "express";
import config from './src/config/config.cjs';
import globalErrorHandler from './src/middlewares/globalErrorHandler.middleware.js';
import createHttpError from 'http-errors';

const app = express();

dotenv.config({
        path: './.env'
});

const PORT = config.port || 3000;
connectDB(); 

app.get('/', (req, res)=>{
        res.json({
        message: 'Hello World'})
})

//global error handler

app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));