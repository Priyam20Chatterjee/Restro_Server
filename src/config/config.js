import dotenv from "dotenv";

dotenv.config({
       path: "./.env"
});

const config=Object.freeze({
       port: process.env.PORT || 8000,
       databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/pos-db",
       nodeEnv: process.env.NODE_ENV || "development",
       accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
})

export default config;