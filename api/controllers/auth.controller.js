import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

//Data validation for signup;
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

//Data validation for Signin;
export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"))
  }
  try {
    const validUser = await User.findOne({ email })
    console.log("Data success(findOne)")

    if (!validUser) {
      console.log(`data not success(User)`)
      return next(errorHandler(404, "User not found"))
    }

    console.log("onBcrypt...")
    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      console.log(`data not success(Password)`)
      return next(errorHandler(400, "Invalid password"))
    }

    //Creates jsonWebToken
    const token = jwt.sign(
      {
        id: validPassword._id,
      },
      process.env.JWT_SECRET
    )
    const { password: pass, ...rest } = validUser._doc

    res
      .status(200)
      .cookie("acceess_token", token, {
        httpOnly: true,
      })
      .json(rest)
  } catch (error) {
    console.log("catch Error")
    next(error)
  }
}

//Data validation for google auth
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      // Separete the password from the rest data'
      const { password, ...rest } = user._doc
      res
        .status(200)
        .cookie("access_toke", token, {
          httpOnly: true,
        })
        .json(rest)
      console.log("ok")
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username:
          name.toLowerCase().split("  ").join(" ") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      })
      console.log("passwordGenerated")
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password, ...rest } = newUser._doc
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest)
    }
  } catch (error) {
    console.log(error)
  }
}
