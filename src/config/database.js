import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
       try {
              const connectionInstance = await mongoose.connect(config.databaseURI);
              console.log(`MongoDb Connected: ${connectionInstance.connection.host}`)
       } catch (err) {
              console.error(`Database Connection failed: ${err.message}`);
              process.exit(1);
       }
};

export default connectDB;