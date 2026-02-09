import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import router from "./user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
await connectDB();

app.use(express.json());
app.use(cookieParser());

// routes declaration
app.use("/api/v1/auth", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
