import { Textarea, Button, Alert } from "flowbite-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

// const loremIpsum =
//   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user)
  const [comment, setComment] = useState("")
  const [commentError, setCommentError] = useState(null)

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault()

    if (comment.length > 200) {
      return
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.log("error fetch" + data)
        setCommentError(data.message)
      }
      if (res.ok) {
        console.log(data)
        setCommentError(null)
        setComment("")
      }
    } catch (error) {
      console.log(error)
      setCommentError(error.message)
    }
  }

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
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button
              type='submit'
              className='mt-1'
              gradientDuoTone='redToYellow'
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-2'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  )
}
