import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import noteRoute from "./routes/noteRoute.js";
import cookieParser from "cookie-parser";
import {env} from "envgaurd";

const app = express();

const port = env("PORT",5000);
const frontEndUrl = env("FRONTEND_URL");


app.use(
  cors({
    origin: [frontEndUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);

app.get("/api/health", (req,res)=>{
res.json({success:true});
} )
connectDB();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
