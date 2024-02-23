import { Button } from "flowbite-react"
import { AiFillGooglePlusCircle } from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../Redux/user/userSlice"
import { useNavigate } from "react-router-dom"

export default function Oauth() {
  const auth = getAuth(app)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      //Request going with data from googleAccount
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      })

      console.log(resultsFromGoogle)

      //Data that came from back-end after request above.
      const data = await res.json()

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/")
      }
      console.log(resultsFromGoogle.user)
    } catch (error) {
      console.log("Got an Error: " + error)
    }
  }

  return (
    <Button gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
      <AiFillGooglePlusCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  )
}
