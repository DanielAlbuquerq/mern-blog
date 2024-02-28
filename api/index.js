import express, { application } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import postRoutes from "./routes/post.route.js"

dotenv.config()

//connection to Database <>
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected!!")
  })
  .catch((err) => {
    console.log(err)
  })
//</>

//Express connection <>
const app = express()

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
  console.log("serving is running on port 3000")
})
//</>

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
