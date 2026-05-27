import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todo");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Erorr in connecting to database", error);
    }
};

export default connectDB;
