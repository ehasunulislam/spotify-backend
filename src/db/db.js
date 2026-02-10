const mongoose = require("mongoose");


async function connectedDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
        
    }
    catch(err) {
        console.error("Database connection error");
    }
};


module.exports = connectedDB;