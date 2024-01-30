import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" })
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
    res.status(500).json({ message: error.message })
  }
}