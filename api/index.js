import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

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

app.listen(3000, () => {
  console.log("serving is running on port 3000")
})
//</>

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
