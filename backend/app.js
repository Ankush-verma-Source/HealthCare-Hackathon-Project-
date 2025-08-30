import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);

// MongoDB Connection
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/healthcare");
}
main().then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log("MongoDB Connection Error",err);
})



// Routes
app.use("/api/v1/auth", authRoutes);



// Start Server
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
