//Redux
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
/////////////////////////////////////
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Oauth from "../components/Oauth"

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error: errorMessage } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const loading = false
  // const errorMessage = false

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      console.log("handleSubmmitTrigger")
      return dispatch(signInFailure("Please fill all the fields"))
    }
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json() //response back from Fetch.
      console.log(data)

      if (data.success === false) {
        console.log(`data not success(fetch)`)
        dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        console.log("RES.OK")
        dispatch(signInSuccess(data))
        navigate("/")
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='min-h-screen mt-20 flex md:justify-center flex-col md:flex-row md:item-center'>
      <div className='flex max-w-3xl max-auto flex-col md:flex-row md:item-center gap-8'>
        {/* left side */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              {"Stacks"}
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and passord
            or with Google.
          </p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com '
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='*******'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disable={errorMessage}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Oauth />
          </form>
          <div className='flex gap-2 text-sm mt-1'>
            <span>Dont Have an account?</span>
            <Link className='text-blue-500' to='/sign-up'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-05' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
