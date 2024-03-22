import { get } from "mongoose"
import { useEffect, useState } from "react"
import moment from 'moment';

export default function PostComment({ postcomment }) {
  console.log(postcomment)
  const [user, setUser] = useState({})
  console.log(user)

  useEffect(() => {
    console.log("UseEffect on Comment")
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${postcomment.userId}`)
        const data = await res.json()
        if (res.ok) {
          setUser(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getUser()
  }, [postcomment])

  return <div className="flex p-4 border-b dark:border-gray-600 text-sm">
    <div className="flex-shrink-0 mr-3">
      <img className="rounded-full w-10 h-10 bg-gray-200" src={user.profilePicture} alt={user.username}/>
    </div>
    <div className="flex-1">
      <div className="flex items-center mb-1">
        <span className="font-bold mr-1 text-xs truncate hover:underline text-cyan-600 cursor-pointer">{user ? `@${user.username}`: 'anonymous user'}</span>
        <span className="text-gray-500 text-sm">
          {moment(postcomment.createdAt).fromNow()}
        </span>
      </div>
        <p className="text-gray-500 pb-2">{postcomment.content}</p>
    </div>  
  </div>
}
