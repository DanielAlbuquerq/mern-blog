import { get } from "mongoose"
import { useEffect, useState } from "react"

export default function Comment({ comment }) {
  console.log(comment)
  const [user, setUser] = useState({})
  console.log(user)

  useEffect(() => {
    console.log("UseEffect on Comment")
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)
        const data = await res.json()
        if (res.ok) {
          setUser(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getUser()
  }, [])

  return <div>Comment</div>
}
