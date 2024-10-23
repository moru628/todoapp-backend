const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.MONGO_URI;

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(CONNECTION_STRING);
        console.log("MongoDB connected successfully");
        return connection.connection.db;
    } catch (error) {
        console.error("Failed to connect to the database", error);
        throw error;
    }
};

module.exports = connectToDatabase;
