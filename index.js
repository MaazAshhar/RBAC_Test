import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import connectDB from './src/config/database.js';
import bodyParser from 'body-parser';
import createAdmin from './src/utils/createAdmin.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({extended:false}));
app.use(cors());
connectDB();
createAdmin().then(resp=>console.log("admin set up done")).catch(err=>console.log("error in admin account set up",err));
app.use('/api/auth',authRoutes);
app.use('/api/blog',blogRoutes);
app.use('/api/user',userRoutes);
app.use('/api/admin', adminRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});