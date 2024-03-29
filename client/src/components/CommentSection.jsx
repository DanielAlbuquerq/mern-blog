import { Textarea, Button, Alert } from "flowbite-react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PostComment from "./PostComment"
import { Modal } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

// const loremIpsum =
//   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user)
  const [comment, setComment] = useState("")
  const [commentError, setCommentError] = useState(null)
  const [postComments, setPostComments] = useState([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  console.log(postId)
  
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`)
        if (res.ok) {
          const data = await res.json()
          setPostComments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
  }, [postId])

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
        setPostComments([data, ...postComments])
      }
    } catch (error) {
      console.log(error)
      setCommentError(error.message)
    }
  }

  const handleLike = async(commentId) => {

    try {

      if(!currentUser){
        navigate("/sign-in")
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`,
      {
        method: 'PUT',
      })

      if(res.ok){
        console.log('res ok from handleLike')
        const data = await res.json();
        setPostComments(postComments.map((comment) =>
          comment._id === commentId ? {
            ...comment,
            likes: data.likes,
            numberOfLikes: data.likes.length
          } : comment
        ))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEdit = async (comment, editedContent) => {

    setPostComments(
      postComments.map((c)=>
        c._id === comment._id ? {...c, content: editedContent} : c
      )
    );
    // setEditedContent(postcomment.content)
    // try {
    //     isEditing
    // } catch (error) {
      
    // }
  }

  const handleDelete = async (commentId) => {
    setShowModal(false)
    try {

      if(!currentUser){
        navigate('/sign-in')
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });

      if(res.ok){
        const data = await res.json();
        setPostComments(postComments.filter((comment) => comment._id !== commentId))
      }

    } catch (error) {
      console.log(error)
      console.log(error.message)
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
      {postComments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{postComments.length}</p>
            </div>
          </div>
          {postComments.map((postcomment, index) => (
            <PostComment key={index} postcomment={postcomment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId) => {
              setShowModal(true)
              setCommentToDelete(commentId)
            }}/>
      ))}
        </>
      )}
      {showModal && 
        <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
                {"Yes I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      }
    </div>
  )
}
