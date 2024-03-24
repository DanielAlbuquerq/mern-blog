import { useEffect, useState } from "react"
import moment from 'moment';
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function PostComment({ postcomment, onLike }) {
  const [user, setUser] = useState({})
  const {currentUser} = useSelector((state) => state.user);
  useEffect(() => {
    console.log("UseEffect on Comment")
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${postcomment.userId}`)
        const data = await res.json()
        if (res.ok) {
          console.log('User Okay')
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
    <div className="flex-1 w-full">
      <div className="flex items-center mb-1  justify-between">
        <span className="w-full truncate font-bold mr-1 text-xs hover:underline text-cyan-600 cursor-pointer">{user ? `@${user.username}`: 'anonymous user'}</span>
        <span className="w-28 truncate text-gray-500 text-sm">
          {moment(postcomment.createdAt).fromNow()}
        </span>
      </div>
        <p className=" w-full truncate text-gray-500 pb-2">{postcomment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
        <button type="button" onClick={()=>onLike(postcomment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && postcomment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
          <FaThumbsUp className="text-sm" />
        </button> 
        <p className="text-gray-400">
          {
            postcomment.numberOfLikes > 0 && postcomment.numberOfLikes + " " + (postcomment.numberOfLikes === 1 ? "like" : "likes")
          }
        </p> 
      </div>
    </div>
  </div>
}
