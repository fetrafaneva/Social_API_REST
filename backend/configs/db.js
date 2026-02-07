import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connectecd", () => {
      console.log("Database connected successfully");
    });

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "content-api-backend";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;
