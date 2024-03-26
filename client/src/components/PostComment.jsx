import { useEffect, useState } from "react"
import moment from 'moment';
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Textarea, Button, Alert } from "flowbite-react"

export default function PostComment({ postcomment, onLike, onEdit }) {
  const [editedComment, setEditedComment] = useState(postcomment.content)
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)

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

  // const handleEdited = async () => {
  //   setIsEditing(true)
  //   setEditedComment(postcomment.content)
  // }
  
  const handleSave = async () => {
    try {
      
      const res = await fetch(`/api/comment/editComment/${postcomment._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: editedComment
        })
      })
      if(res.ok){
        setIsEditing(false);
        onEdit(postcomment, editedComment)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

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
      {isEditing ? 
        ( 
          <div className="mb-3">
          <Textarea
            className="mb-2"
            placeholder='Add a comment...'
            onChange={(e) => setEditedComment(e.target.value)}
            value={editedComment}
            maxLength='200'
            // onChange={(e) => setEditedComment(e.target.value)}
            // value={comment}      
          />
          <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="outline text-xs font-bold text-gray-200 hover:bg-teal-400 bg-teal-500 px-3 py-1 rounded-full rounded-bl-none rounded-tr-none"
          >
                Save
            </button>
            <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-xs font-bold text-gray-200 hover:bg-red-400 bg-red-500  px-3 py-1 rounded-full rounded-bl-none rounded-tr-none"
          >
                Cancel
            </button>
          </div>
          </div>
          ) : (
              <>
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
                      {
                        currentUser && (currentUser._id === postcomment.userId || currentUser.isAdmin) && (
                          <button
                            onClick={() => setIsEditing(true)}
                            type="button"
                            className="text-gray-400 hover:text-blue-500"
                            >
                              Edit
                          </button>
                        )
                      }
                    </div>
              </>
          )}
    </div>
  </div>
}
