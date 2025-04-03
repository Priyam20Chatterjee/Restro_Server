import createHttpError from "http-errors";
import { User } from "../models/user.model.js";

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

}
 
export {register, login}