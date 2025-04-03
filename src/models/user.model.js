import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
       name:{
              type: String,
              required: true
       },
       email:{
              type: String,
              required: true,
              validate:{
                     validator:function(v){
                            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                     },
                     message:"Email must be in valid formate!"
              }
       },
       phone:{
              type: Number,
              required: true,
              validate:{
                     validator:function(v){
                            return /\d{10}/.test(v);
                     },
                     message:"Phone number must be in ten digit!!"
              }
       },
       password:{
              type: String,
              required: true
       },
       role:{
              type: String,
              required: true
       }
},{timestamps: true}); 

userSchema.pre('save', async function(next){
       if(!this.isModified('password')){
              next();
       }

       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
})

export const User = mongoose.model("User", userSchema);