import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

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
app.listen(3000, () => {
  console.log("serving is running on port 3000")
})
//</>
