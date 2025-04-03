import createHttpError from "http-errors";
import config  from "../config/config.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
       try {
       //     console.log("Headers:", req.headers);  
       //     console.log("Received Body:", req.body); 

           const { name, phone, email, password, role } = req.body;
   
           if(!name || !phone || !email || !password || !role){
              const error = createHttpError(400, "All fields are required!");
              return next(error);
           }
   
           const isUserPresent = await User.findOne({email});
           if(isUserPresent){
              const error = createHttpError(400, "User already exist!");
              return next(error);
           }
   
           const user = { name, phone, email, password, role };
           const newUser = User(user);
           await newUser.save();
   
           res.status(201).json({success: true, message: "New user created!", data: newUser});
   
       }catch (error) {
           next(error);
       }
   }
   

const login = async(req, res, next) => {
       try {
              const { email, password } = req.body;
              if(!email || !password){
                     const error = createHttpError(400, "All fields are required!");
                     next(error);
              }

              const isUserPresent = await User.findOne({email});
              if(!isUserPresent){
                     const error = createHttpError(400, "User not found!");
                     next(error);
              }

              const isMatched = await bcrypt.compare(password, isUserPresent.password);
              if(!isMatched){
                     const error = createHttpError(400, "Invalid credentials!");
                     next(error);
              }

              const accessToken = jwt.sign({_id: isUserPresent._id}, config.accessTokenSecret, {expiresIn: "1d"}); 

              res.cookie('accessToken', accessToken, {
                     maxAge:1000 * 60 * 60 * 24 * 30,
                     httpOnly: true,
                     sameSite: "none",
                     secure: true 
              })

              res.status(200).json({success: true, message: "User logged in!", data: isUserPresent});
       } catch (error) {
              next(error);
       }
}
 
export {register, login} 