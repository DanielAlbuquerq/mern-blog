import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"))
  }

  //Hash password before sending to Database;
  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username: username, //if variable names from destructerd are iqual to mongoose schema, it doesn't need to isert.
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.json("Signup successful")
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"))
  }
  try {
    const validUser = await User.findOne({ email })
    console.log("Data success(findOne)")

    if (!validUser) {
      console.log(`data not success(User)`)
      return next(errorHandler(404, "User not found"))
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      console.log(`data not success(Password)`)
      return next(errorHandler(400, "Invalid password"))
    }
  } catch (error) {
    console.log("catch Error")
    next(error)
  }
}
