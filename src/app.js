import  express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
app.use(cors({
    origin: process.eventNames.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.subscribe(cookieParser())


export { app }