import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import connectDB from './src/config/database.js';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({extended:false}));
app.use(cors());
connectDB();
app.use('/api/auth',authRoutes);
app.use('/api/blog',blogRoutes);
app.use('/api/user',userRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});