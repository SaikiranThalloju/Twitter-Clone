import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js"
import TweetRoute from "./routes/TweetRoute.js"
import cors from "cors"



dotenv.config({
    path:".env"
})
databaseConnection();
const app = express();
const PORT = process.env.PORT||8080



app.use(express.urlencoded({
    extended : true
}));

app.use(express.json());
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));


// api
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/tweet",TweetRoute);


app.listen(PORT, ()=>{
    console.log(`server listen at port ${PORT}`)
})

