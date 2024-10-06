import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DBconnect from "./config/DBconnect.js";
import authRoute from "./routers/authRoute.js";
import productRoute from "./routers/productRoute.js";
import buyingRouter from "./routers/buyingRoute.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL ,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1", buyingRouter);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "the app is working 😆",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred!",
  });
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  DBconnect();
  console.log(`App is running on port ${PORT} 😁`);
});
