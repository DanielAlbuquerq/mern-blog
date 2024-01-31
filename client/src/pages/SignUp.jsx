import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20 flex md:justify-center flex-col md:flex-row md:item-center">
      <div className="flex max-w-3xl max-auto flex-col md:flex-row md:item-center gap-8">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Daniel's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and passord
            or with Google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput
                className=""
                type="text"
                placeholder="Username"
                id="username"
              />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com "
                id="email"
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-1">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
