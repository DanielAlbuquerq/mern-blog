import { current } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex item-center gap-1 my-2 '>
          <p className='text-md'>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full mt-[0.1em]'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={"/dashboard?tab=profile"}
            className='text-xs text-cyan-600 hover:underline mt-[0.2em]'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='flex item-center gap-1'>
          You must be signed in to comment.
          <Link className='text-cyan-600 hover:underline' to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && <form></form>}
    </div>
  )
}
