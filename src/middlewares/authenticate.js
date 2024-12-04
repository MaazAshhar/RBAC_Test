import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import JwtService from '../services/JwtService.js';
dotenv.config();


const jwtService = new JwtService();
// this will authnticate the user whether user have token or not
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwtService.parseToken(token);
    if(decoded){
        req.user = decoded; // Attach user info
        next();
    }else{
        throw error('invalid or expired token');
    }
  } catch (error) {
    console.error('error in verifying token',error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
