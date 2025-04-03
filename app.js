import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
import express from "express";
import config from './src/config/config.js';
import globalErrorHandler from './src/middlewares/globalErrorHandler.middleware.js';
// import { User } from './src/models/user.model.js';
import router from './src/routes/user.routes.js';
// import createHttpError from 'http-errors';

const app = express();

dotenv.config({
        path: './.env'
});

const PORT = config.port || 5000;
connectDB(); 

app.get('/', (req, res)=>{
        res.json({
        message: 'Hello World'})
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);

//global error handler 
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 